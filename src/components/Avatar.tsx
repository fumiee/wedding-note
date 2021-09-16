import { useEffect, useState } from "react";
import { supabase } from "src/libs/supabase";

type Props = {
  url: string;
  size: number;
  onUpload: (filePath: string) => void;
};

export const Avatar = (props: Props) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (props.url) downloadImage(props.url);
  }, [props.url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      props.onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="border-2 rounded-full"
          style={{ height: props.size, width: props.size }}
        />
      ) : (
        <div
          className="bg-gray-300 rounded-full"
          style={{ height: props.size, width: props.size }}
        />
      )}
      <div style={{ width: props.size }}>
        <label className="bg-gray-200 rounded" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

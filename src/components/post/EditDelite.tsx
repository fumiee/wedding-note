import Link from "next/link";
import type { VFC } from "react";
import { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { supabase } from "src/libs/supabase";
import { Dialog, Transition } from "@headlessui/react";
import type { EditPageButtonProps } from "./EditPageLinkButton";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export const EditDelete: VFC<EditPageButtonProps> = (props) => {
  const [postText, setPostText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const fetchPosts = async () => {
    if (!props.id) return;
    try {
      const res = await supabase.from("posts").select("text").eq("id", props.id).single();
      setPostText(res.data.text);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id]);

  const inputText = useRef<HTMLTextAreaElement>(null);
  const updatePost = useCallback(async () => {
    try {
      const updates = {
        updated_at: new Date(),
        text: inputText.current?.value,
      };
      const { error } = await supabase
        .from("posts")
        .update(updates, {
          returning: "minimal",
        })
        .eq("id", props.id);
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
  }, [props.id]);

  const handleUpdatePost = () => {
    toast.promise(updatePost(), {
      loading: "更新中",
      success: "更新しました",
      error: "更新に失敗しました",
    });
  };

  const handleDelete = useCallback(async () => {
    try {
      const { error } = await supabase.from("posts").delete().match({ id: props.id });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("error", error);
    }
    closeModal();
    router.push("/");
  }, [props.id, router]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between px-5 mx-4">
        <Link href="/">
          <a>
            <IoMdArrowBack size={35} color={"#5A5A5A"} className="my-3" />
          </a>
        </Link>
        <div className="flex items-center space-x-3">
          <button onClick={handleUpdatePost} className="py-2 w-32 tracking-widest text-white bg-gray-400 rounded-xl">
            上書き
          </button>
          <button
            type="button"
            onClick={openModal}
            className="py-2 w-32 tracking-widest text-white bg-gray-400 rounded-xl"
          >
            削除
          </button>
        </div>
      </div>
      <div>
        <Transition appear show={isOpen}>
          <Dialog as="div" className="overflow-y-auto fixed inset-0 z-10" onClose={closeModal}>
            <div className="px-4 min-h-screen text-center">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block overflow-hidden p-6 mb-96 w-full max-w-md text-left align-middle bg-gray-300 rounded-2xl shadow-xl transition-all transform">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    キロクを削除しますか？
                  </Dialog.Title>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 text-sm font-medium text-red-900 bg-red-100 hover:bg-red-200 rounded-md border border-transparent focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus:outline-none"
                      onClick={handleDelete}
                    >
                      削除する
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      <div className="whitespace-pre-wrap">
        <textarea
          className="p-5 m-auto w-11/12 min-h-screen rounded-lg"
          defaultValue={postText}
          ref={inputText}
        ></textarea>
      </div>
    </div>
  );
};

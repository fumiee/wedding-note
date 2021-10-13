import Image from "next/image";
import type { VFC } from "react";
import type { definitions } from "src/types/supabase";

type Props = {
  profile: definitions["profiles"];
};

export const ProfileLayout: VFC<Props> = (props) => {
  return (
    <div className="m-auto space-y-8">
      <div className="flex justify-around">
        <div>
          {props.profile?.avatar ? (
            <Image src={props.profile.avatar} alt="avatar" height={120} width={120} className="rounded-full" />
          ) : (
            <div className="bg-gray-200 rounded-full sm:w-28 sm:h-28 md:w-40 md:h-40" />
          )}
        </div>
        <div className="mt-5">
          <label htmlFor="name" className="flex justify-start mb-5 ml-3 w-36 text-gray-400">
            name
          </label>
          <p className=" w-full text-center border-b-2">{props.profile?.name}</p>
        </div>
      </div>
      <div>
        <label htmlFor="wedding_hall" className="flex justify-start mb-5 ml-3 text-gray-400">
          wedding hall
        </label>
        <p className="text-center border-b-2">{props.profile?.wedding_hall}</p>
      </div>
      <div>
        <label htmlFor="description" className="flex justify-start mb-5 ml-3 text-gray-400">
          comment
        </label>
        <p className="text-center whitespace-pre-wrap break-words border-b-2">{props.profile?.description}</p>
      </div>
    </div>
  );
};

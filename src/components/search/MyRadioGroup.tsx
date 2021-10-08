import { RadioGroup } from "@headlessui/react";
import type { Dispatch, SetStateAction, VFC } from "react";

type MyRadioGroupProps = {
  selection: string;
  setSelection: Dispatch<SetStateAction<string>>;
};
export const MyRadioGroup: VFC<MyRadioGroupProps> = (props) => {
  return (
    <RadioGroup value={props.selection} onChange={props.setSelection} className="space-y-3">
      <RadioGroup.Label>なにで探す？</RadioGroup.Label>
      <RadioGroup.Option value="posts">
        {({ checked }) => {
          return (
            <span
              className={
                checked
                  ? "bg-gray-500 px-10 py-1 rounded-lg text-white"
                  : "bg-gray-100 px-10 py-1 rounded-lg text-gray-400"
              }
            >
              キロク
            </span>
          );
        }}
      </RadioGroup.Option>
      <RadioGroup.Option value="name">
        {({ checked }) => {
          return (
            <span
              className={
                checked
                  ? "bg-gray-500 px-10 py-1 rounded-lg text-white"
                  : "bg-gray-100 px-10 py-1 rounded-lg text-gray-400"
              }
            >
              ナマエ
            </span>
          );
        }}
      </RadioGroup.Option>
      <RadioGroup.Option value="wedding_hall">
        {({ checked }) => {
          return (
            <span
              className={
                checked
                  ? "bg-gray-500 px-8 py-1 rounded-lg text-white"
                  : "bg-gray-100 px-8 py-1 rounded-lg text-gray-400"
              }
            >
              結婚式場
            </span>
          );
        }}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

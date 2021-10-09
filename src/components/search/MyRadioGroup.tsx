import { RadioGroup } from "@headlessui/react";
import type { Dispatch, SetStateAction, VFC } from "react";

type MyRadioGroupProps = {
  selection: string;
  setSelection: Dispatch<SetStateAction<string>>;
};
export const MyRadioGroup: VFC<MyRadioGroupProps> = (props) => {
  return (
    <RadioGroup value={props.selection} onChange={props.setSelection} className="space-y-3">
      <RadioGroup.Label className="text-sm tracking-widest text-gray-300">なにでさがす？</RadioGroup.Label>
      <RadioGroup.Option value="posts">
        {({ checked }) => {
          return (
            <span
              className={
                checked
                  ? "bg-gray-400 px-10 py-1 rounded-lg text-white"
                  : "bg-gray-100 px-10 py-1 rounded-lg text-gray-400"
              }
            >
              キロク
            </span>
          );
        }}
      </RadioGroup.Option>
      <RadioGroup.Option value="profiles">
        {({ checked }) => {
          return (
            <span
              className={
                checked
                  ? "bg-gray-400 px-10 py-1 rounded-lg text-white"
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
                  ? "bg-gray-400 px-8 py-1 rounded-lg text-white"
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

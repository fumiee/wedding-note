import { Tab } from "@headlessui/react";
import { MyPage } from "./MyPage";
import { Todo } from "./Todo";

export const Account: React.VFC = () => {
  return (
    <Tab.Group>
      <Tab.List>
        <div className="flex justify-around">
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
          <Tab>4</Tab>
        </div>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>

          <Tab.Panel>Content 2</Tab.Panel>

          <Tab.Panel>
            <Todo />
          </Tab.Panel>

          <Tab.Panel>
            <MyPage />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.List>
    </Tab.Group>
  );
};

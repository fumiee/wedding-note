import { Tab } from "@headlessui/react";
import { Todo } from "./Todo";
import { Footer } from "./Footer";
import { LoginedHeader } from "./LoginedHeader";

export const Account: React.VFC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginedHeader />
      <div className="flex-1">
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-around">
              <Tab>1</Tab>
              <Tab>2</Tab>
              <Tab>3</Tab>
            </div>
            <Tab.Panels>
              <Tab.Panel>最新記事</Tab.Panel>

              <Tab.Panel>お気に入り</Tab.Panel>

              <Tab.Panel>
                <Todo />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.List>
        </Tab.Group>
      </div>
      <Footer />
    </div>
  );
};

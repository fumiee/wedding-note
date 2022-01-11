import type { VFC } from "react";
import { Footer } from "src/components/layout/Footer";
import { LoginedHeader } from "src/components/layout/LoginedHeader";

type Props = {
  children: React.ReactNode;
};

export const LoginedLayout: VFC<Props> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <LoginedHeader />
      </div>
      <div className="flex-1">{props.children}</div>
      <Footer />
    </div>
  );
};

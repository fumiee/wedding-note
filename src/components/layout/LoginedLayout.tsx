import { Footer } from "../Footer";
import { LoginedHeader } from "../LoginedHeader";

type Props = {
  children: React.ReactNode;
};

export const LoginedLayout = (props: Props) => {
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

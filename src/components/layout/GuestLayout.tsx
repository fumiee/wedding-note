import { Footer } from "../Footer";
import { Header } from "../Header";

type Props = {
  children: React.ReactNode;
};

export const GuestLayout = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 min-h-screen">{props.children}</div>
      <Footer />
    </div>
  );
};

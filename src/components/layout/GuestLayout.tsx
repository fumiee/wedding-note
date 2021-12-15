import { Footer } from "src/components/layout/Footer";
import { Header } from "src/components/layout/Header";

type Props = {
  children: React.ReactNode;
};

export const GuestLayout = (props: Props) => {
  return (
    <div className="flex z-50 flex-col min-h-screen">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex-1 min-h-screen">{props.children}</div>
      <Footer />
    </div>
  );
};

import type { VFC } from "react";

type Props = {
  children: JSX.Element;
};

export const Layout: VFC<Props> = (props) => {
  return <div className="m-auto max-w-3xl font-sans text-center text-gray-600">{props.children}</div>;
};

type Props = {
  children: object;
};

export const Layout: React.VFC<Props> = (props) => {
  return <div className="font-sans">{props.children}</div>;
};

type Props = {
  children: object;
};

export const Layout: React.VFC<Props> = (props) => {
  return (
    <div className="font-sans text-gray-600 text-center m-auto">
      {props.children}
    </div>
  );
};

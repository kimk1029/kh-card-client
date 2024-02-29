import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <header>Header Content</header>
      <main>{children}</main>
      <footer>Footer Content</footer>
    </>
  );
};

export default Layout;

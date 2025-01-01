import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box w={"100%"} h={"100%"} pb={"100px"}>
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default Layout;

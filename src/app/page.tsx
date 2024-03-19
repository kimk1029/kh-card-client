import React from "react";
import Layout from "../components/Layout";
import { Link, LinkBox } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      welcome
      <LinkBox>
        <Link href="/auth">login</Link>
      </LinkBox>
    </div>
  );
};

export default Home;

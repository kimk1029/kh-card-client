import React from "react";
import Layout from "../components/Layout";
import { Link, LinkBox } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
const Home = () => {
  const { data: session } = useSession();
  return (
    <div>
      welcome
      <LinkBox>{!session && <Link href="/auth">login</Link>}</LinkBox>
    </div>
  );
};

export default Home;

"use client";
import React from "react";
import Layout from "../components/Layout";
import { Link, LinkBox } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Router } from "next/router";
const Home = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      welcome
      <LinkBox>
        {!session && <Link href="/auth">login</Link>}
        <Link href="/board">Board</Link>
      </LinkBox>
    </Layout>
  );
};

export default Home;

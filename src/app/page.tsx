"use client";
import React from "react";
import Layout from "../components/Layout";
import { Link, LinkBox } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import YouTubeBackground from "./YouTubeBackground";

const Home = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      <YouTubeBackground videoId="KJwYBJMSbPI" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          textAlign: "center",
        }}
      >
        Welcome
        <LinkBox>
          {!session && <Link href="/auth">Login</Link>}
          <Link href="/board">Board</Link>
        </LinkBox>
      </div>
    </Layout>
  );
};

export default Home;

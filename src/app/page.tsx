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
      <div>dd</div>
      {/* <YouTubeBackground videoId="KJwYBJMSbPI" />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          textAlign: "center",
        }}
      ></div> */}
    </Layout>
  );
};

export default Home;

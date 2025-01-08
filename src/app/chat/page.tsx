"use client";

import Layout from "@/components/Layout";
import { Container, useColorMode } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ChatPage: React.FC = () => {
  const [socket, setSocket] = useState<any>(null);
  const { colorMode } = useColorMode();
  const [messages, setMessages] = useState<{ username: string; msg: string }[]>(
    []
  );
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const bgColor = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "black" : "white";
  const { data: session } = useSession();

  useEffect(() => {
    // Token 가져오기
    const token = session?.accessToken;
    if (!token) return;
    // Socket 연결
    const socket = io("http://kimk1029.synology.me:50000", {
      auth: { token },
    });

    // 메시지 수신 처리
    socket.on("chat message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // 접속자 목록 업데이트 처리
    socket.on("update users", (userList) => {
      setUsers(userList);
    });

    socket.on("connect_error", (err) => {
      alert(err.message);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [session]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      socket.emit("chat message", input);
      setInput("");
    }
  };

  return (
    <Layout>
      <Container
        maxW="container.md"
        mt={10}
        boxShadow="xl"
        p="5"
        rounded="md"
        bg={bgColor}
        color={textColor}
      >
        <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
          {/* 채팅 UI */}
          <div style={{ flex: 2, marginRight: "20px" }}>
            <h1>채팅방</h1>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                height: "300px",
                overflowY: "scroll",
              }}
            >
              {messages.map((msg, idx) => (
                <div key={idx}>
                  <strong>{msg.username}</strong>: {msg.msg}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요"
                style={{ width: "80%", padding: "10px" }}
              />
              <button onClick={sendMessage} style={{ padding: "10px" }}>
                전송
              </button>
            </div>
          </div>

          {/* 접속자 목록 */}
          <div style={{ flex: 1 }}>
            <h2>접속 중인 사용자</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {users.map((user, idx) => (
                <li
                  key={idx}
                  style={{ padding: "5px 0", borderBottom: "1px solid #ddd" }}
                >
                  {user}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ChatPage;

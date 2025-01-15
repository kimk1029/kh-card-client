// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // 세션 만료 시 처리 로직
      signOut({ redirect: false }); // 서버에 세션 정리 요청
      router.push("/login"); // 로그인 페이지로 리다이렉트
    }
  }, [status, router]);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

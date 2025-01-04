// src/components/AuthWrapper.tsx

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Spinner, Center } from "@chakra-ui/react";
import SignUp from "@/app/auth/sign-up";
import Login from "@/app/auth/login";

const AuthWrapper: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // State to toggle between Login and SignUp
  const [showSignUp, setShowSignUp] = React.useState(false);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.needsSignUp) {
      setShowSignUp(true);
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return showSignUp ? (
    <SignUp
      onToggle={setShowSignUp}
      email={session?.googleData?.email}
      // You can pass other Google data as props if needed
    />
  ) : (
    <Login onToggle={setShowSignUp} />
  );
};

export default AuthWrapper;

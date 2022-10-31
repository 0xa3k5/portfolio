import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Logout from "../src/components/Form/Logout";
import Header from "../src/components/Header/Header";
import MobileMenu from "../src/components/Header/MobileMenu";
import Login from "../src/components/Form/Login";

const LoginPage = (props): JSX.Element => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>To log in or not to log in</title>
        <meta
          name="description"
          title="description"
          content="this is a page to log in or log out"
        />
      </Head>
      <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} />
      <MobileMenu
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      />
      {status === "unauthenticated" ? (
        <Login redirectPath="/" />
      ) : (
        <Logout onClick={() => signOut()} />
      )}
    </>
  );
};

export default LoginPage;

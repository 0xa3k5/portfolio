import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Logout from "../src/components/Form/Logout";
import Login from "../src/components/Form/Login";

const LoginPage = (): JSX.Element => {
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
      {status === "unauthenticated" ? (
        <Login redirectPath="/" />
      ) : (
        <Logout onClick={() => signOut()} />
      )}
  </>
  );
};

export default LoginPage;

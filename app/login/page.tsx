import { signOut, useSession } from "next-auth/react";
import Logout from "@/components/Form/Logout";
import Login from "@/components/Form/Login";
import Layout from "@/components/Layout";

export const metadata = {
  title: "To log in or not to log in",
  description: "this is a page to log in or log out",
};

const LoginPage = (): JSX.Element => {
  const { status } = useSession();

  return (
    <Layout>
      {status === "unauthenticated" ? (
        <Login redirectPath="/" />
      ) : (
        <Logout onClick={() => signOut()} />
      )}
    </Layout>
  );
};

export default LoginPage;

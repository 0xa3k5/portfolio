import Head from "next/head";
import { useState } from "react";
import Cookies from "universal-cookie";
import consts from "../consts";
import Login from "../src/components/Form/Login";
import Logout from "../src/components/Form/Logout";
import Header from "../src/components/Header/Header";
import MobileMenu from "../src/components/Header/MobileMenu";

export default function LoginPage({ hasReadPermission }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
      {!hasReadPermission ? (
        <Login redirectPath="/" />
      ) : (
        <Logout
          onClick={(e) => {
            e.preventDefault();
            const cookies = new Cookies();
            cookies.remove(consts.SiteReadCookie, { path: "/" });
            window.location.href = "/login";
          }}
        />
      )}
    </>
  );
}

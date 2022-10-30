import { useState } from "react";
import Cookies from "universal-cookie";
import consts from "../../../consts";
import PasswordInput from "./PasswordInput";

interface LoginProps {
  redirectPath: string;
}

export default function Login({ redirectPath }: LoginProps) {
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="mx-auto flex h-screen max-w-md items-center justify-center">
        <form className="flex flex-col items-center space-y-6">
          <h4 className="text-center text-4xl font-semibold md:text-5xl">
            I signed some papers
          </h4>
          <p className="px-12 text-center text-xl opacity-80">
            I can not make this case study public. Please enter the password or{" "}
            <a
              className="cursor-pointer text-daisy duration-200 hover:underline"
              href="mailto:hey@akml.io"
              target="_blank"
              rel="noreferrer"
            >
              <span>reach out for access ↗</span>
            </a>
          </p>
          <PasswordInput
            className="max-w-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded w-full max-w-sm rounded-full bg-white bg-opacity-10 p-4 text-sm uppercase tracking-widest duration-200 hover:bg-daisy hover:text-black"
            onClick={(e) => {
              e.preventDefault();
              const cookies = new Cookies();
              cookies.set(consts.SiteReadCookie, password, {
                path: "/",
              });
              window.location.href = redirectPath ?? "/";
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </>
  );
}

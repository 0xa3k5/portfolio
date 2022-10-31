import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import PasswordInput from "./PasswordInput";

interface LoginProps {
  redirectPath: string;
}

export default function Login({ redirectPath }: LoginProps) {
  const [password, setPassword] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      password: password,
      redirect: false,
    });

    window.location.href = redirectPath ?? "/";
  };

  return (
    <>
      <div className="mx-auto flex h-screen max-w-md items-center justify-center px-4">
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={handleSubmit}
        >
          <h4 className="text-center text-4xl font-semibold md:text-5xl">
            I signed some papers
          </h4>
          <p className="md:px-8 text-center text-xl opacity-80">
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
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            type="submit"
            className="rounded w-full max-w-sm rounded-full bg-white bg-opacity-10 p-4 text-sm uppercase tracking-widest duration-200 hover:bg-daisy hover:text-black"
          >
            Enter
          </button>
        </form>
      </div>
    </>
  );
}

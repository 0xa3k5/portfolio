import { MouseEventHandler } from "react";

interface LogoutProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Logout({ onClick }: LogoutProps) {
  return (
    <>
      <div className="mx-auto flex h-screen max-w-md items-center justify-center">
        <form className="flex flex-col items-center gap-6">
          <h4 className="text-center text-4xl font-semibold md:text-5xl">
            I see that you are logged in
          </h4>
          <p className="px-12 text-center text-xl opacity-80">
            Would you like to log out?
          </p>
          <button
            type="submit"
            className="rounded w-full max-w-sm rounded-full bg-white bg-opacity-10 p-4 text-sm uppercase tracking-widest duration-200 hover:bg-daisy hover:text-black"
            onClick={onClick}
          >
            Logout
          </button>
        </form>
      </div>
    </>
  );
}

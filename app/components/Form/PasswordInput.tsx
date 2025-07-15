"use client";

import cx from "classnames";
import { ChangeEventHandler } from "react";

interface PasswordInputProps {
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string | number;
}

export default function PasswordInput({
  className,
  onChange,
  value,
}: PasswordInputProps): JSX.Element {
  return (
    <input
      type="password"
      className={cx(
        className,
        "w-full rounded-full bg-white px-6 py-4 tracking-widest text-black duration-150 placeholder:tracking-normal focus:outline-none"
      )}
      placeholder="Password"
      value={value}
      onChange={onChange}
    />
  );
}

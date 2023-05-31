import cx from "classnames";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps): JSX.Element {
  return (
    <div className={cx("container flex justify-center py-12", className)}>
      <span className="font-mono text-lg text-white/40">
        built by{" "}
        <Link href="/" className="duration-150 hover:text-white">
          ak
        </Link>{" "}
        with ❤️
      </span>
    </div>
  );
}

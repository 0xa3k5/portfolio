import { motion } from "framer-motion";
import { motionVariants } from "../../utils/motionVariants";
import Button from "../Button";
import { useAppContext } from "../../../hooks/useAppContext";
import cx from "classnames";
import { useRouter } from "next/router";

const navList = [
  {
    text: "Twitter",
    href: "https://twitter.com/akemalakcay",
    targetBlank: true,
  },
  {
    text: "Linkedin",
    href: "https://linkedin.com/in/alikemalakcay/",
    targetBlank: true,
  },
  {
    text: "Resume",
    href: "/akresume.pdf",
    targetBlank: true,
  },
  {
    text: "hey@akml.io",
    href: "mailto:hey@akml.io",
    targetBlank: true,
  },
];

function NavLi({ navList, className }): JSX.Element {
  const { setIsNavbarOpen } = useAppContext();

  return navList.map((l, i) => (
    <motion.li
      className={cx(className, "uppercase tracking-widest")}
      key={i}
      variants={motionVariants.navLi}
    >
      <Button.Text
        text={l.text}
        href={l.href}
        targetBlank={l.targetBlank}
        onClick={(e) => {
          e.preventDefault();
          setIsNavbarOpen(false);
        }}
      />
    </motion.li>
  ));
}

function Desktop(): JSX.Element {
  const { isNavbarOpen } = useAppContext();
  return (
    <motion.ul
      variants={motionVariants.navUl}
      animate="open"
      initial="closed"
      key={isNavbarOpen.toString()}
      className="hidden h-full w-fit flex-row items-center justify-end gap-16 text-sm lg:flex"
    >
      <NavLi className="" navList={navList} />
    </motion.ul>
  );
}

function Mobile(): JSX.Element {
  const { isNavbarOpen } = useAppContext();

  return (
    <motion.ul
      variants={motionVariants.navUl}
      animate="open"
      initial="closed"
      key={isNavbarOpen.toString()}
      className={`
      flex w-full flex-col items-center justify-center gap-8 lg:hidden
      ${isNavbarOpen ? "pr-4" : ""}
      `}
    >
      {isNavbarOpen && <NavLi navList={navList} className="py-4" />}
    </motion.ul>
  );
}

const Navigation = { Desktop, Mobile };

export default Navigation;

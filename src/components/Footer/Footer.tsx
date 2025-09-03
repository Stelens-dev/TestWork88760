import React from "react";
import useStore from "@/stores/useStore";
import style from "./Footer.module.scss";

const Footer: React.FC = () => {
  const { user, currentYear } = useStore();
  console.log(user);

  return (
    <footer className={style.footer}>
      <div className={style.footer__content}>
        <p
          className={style.footer__text}
        >{`Logged as ${user ? user.email : "Guest"}`}</p>
        <p className={style.footer__text}>{`Current Year: ${currentYear}`}</p>
      </div>
    </footer>
  );
};

export default Footer;

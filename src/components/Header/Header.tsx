"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./Header.module.scss";
import Image from "next/image";
import { Items, NavItem, ItemsI, NavItemI } from "./Items";
import Link from "next/link";
import useStore from "@/stores/useStore";

const Header: React.FC = () => {
  const router = useRouter();
  const { user, clearUser } = useStore();
  const [isActive, setActive] = useState<boolean>(false);

  const name = user?.name;
  const surname = user?.surname;

  const userExit = (): void => {
    clearUser();
    alert("You have been logged out...");
    router.push("/login");
  };

  const toggleButton = (): void => {
    setActive((prev) => !prev);
  };

  const renderUserSection = (): React.ReactNode => {
    return Items.slice(3).map((e: ItemsI) => (
      <div className={style.header__user} key={e.id}>
        {name && surname ? (
          <>
            <a className={style.header__link} href={e.href!} onClick={userExit}>
              Logout
            </a>
            <Image
              className={style.header__icon}
              src={e.src}
              alt={e.imgAlt}
              width={24}
              height={24}
            />
            <div className={style.header__link}>
              <span className={style.header__name}>{name}</span>
              <span className={style.header__surname}>{surname}</span>
            </div>
          </>
        ) : (
          <>
            <Image
              className={style.header__icon}
              src={e.src}
              alt={e.imgAlt}
              width={24}
              height={24}
            />
            <a className={style.header__link} href={e.href!}>
              {e.text}
            </a>
          </>
        )}
      </div>
    ));
  };

  return (
    <header className={style.header}>
      <section
        className={style.header__section}
        data-nav-open={isActive ? "true" : "false"}
      >
        <div className={style.header__container}>
          <button
            className={style.header__button}
            aria-pressed={isActive ? "true" : "false"}
            type="button"
            onClick={toggleButton}
          >
            <span className={style.header__containerBurgerIcon}>
              <span className={style.header__burgerIcon} />
              <span className={style.header__burgerIcon} />
              <span className={style.header__burgerIcon} />
            </span>
          </button>
          <ul className={style.header__list}>
            {Items.slice(0, 3).map((e: ItemsI) => (
              <li className={style.header__item} key={e.id}>
                <Image
                  className={style.header__icon}
                  src={e.src}
                  alt={e.imgAlt}
                  width={24}
                  height={24}
                />
                <span className={style.header__text}>{e.text}</span>
              </li>
            ))}
          </ul>
          <ul className={style.header__navList_menu}>
            {NavItem.map((e: NavItemI) => (
              <li className={style.header__navItem_menu} key={e.id}>
                {e.text}
              </li>
            ))}
          </ul>
          {renderUserSection()}
        </div>
      </section>
      <section className={style.header__title}>
        <h1 className={style.header__heading}>
          <Link href={"/"}>
            <span className={style.header__text}>Abelohost Shop</span>
            <span className={style.header__dot}>.</span>
          </Link>
        </h1>
      </section>
      <nav className={style.header__navigation}>
        <ul className={style.header__navList}>
          {NavItem.map((e: NavItemI) => (
            <li className={style.header__navItem} key={e.id}>
              {e.text}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

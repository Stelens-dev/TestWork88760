import React from "react";
import style from "./Header.module.scss";
import Image from "next/image";
import Items from "./Items";

const Header = () => {
  return (
    <header className={style.header}>
      <section className={style.header__section}>
        <div className={style.header__container}>
          <ul className={style.header__list}>
            {Items.slice(0, 3).map((e) => (
              <li className={style.header__item} key={e.id}>
                <Image className={style.header__icon} src={e.src} alt={e.imgAlt} />
                <span className={style.header__text}>{e.text}</span>
              </li>
            ))}
          </ul>
          {Items.slice(3).map((e) => (
            <div className={style.header__user} key={e.id}>
              <Image className={style.header__icon} src={e.src} alt={e.imgAlt} />
              <a className={style.header__link} href={e.href!}>{e.text}</a>
            </div>
          ))}
        </div>
      </section>
      <section className={style.header__title}>
        <h1 className={style.header__heading}>
          <span className={style.header__text}>Abelohost Shop</span>
          <span className={style.header__dot}>.</span>
        </h1>
      </section>
      <nav className={style.header__navigation}>
        <ul className={style.header__navList}>
          <li className={style.header__navItem}>Home</li>
          <li className={style.header__navItem}>Hot Deals</li>
          <li className={style.header__navItem}>Categories</li>
          <li className={style.header__navItem}>Laptops</li>
          <li className={style.header__navItem}>Smartphones</li>
          <li className={style.header__navItem}>Cameras</li>
          <li className={style.header__navItem}>Accessories</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

"use client"

import { NextPage } from "next";
import Image from "next/image";
import style from "./Home.module.scss";
import Header from "@/components/Header/Header"
import { fetchExternalData } from "@/app/external/externalRequest"
import { useEffect, useState } from "react";
import { ApiResponse, ProductI } from "./external/interface";

const Home: NextPage = () => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data: ApiResponse = await fetchExternalData();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch external data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <main className={style.main}>
      <Header />
      <section className={style.products}>
        <div className={style.products__header}>
          <h2 className={style.products__title}>Latest Products</h2>
        </div>
        {(loading)
          ? <div className={style.products__loading}>Loading ...</div>
          : <div className={style.products__list}>
            {products.map((product) => (
              <div key={product.id} className={style.products__card}>
                <Image
                  className={style.products__image}
                  width={250}
                  height={250}
                  src={product.images[0]}
                  alt={product.title}
                  priority
                />
                <div className={style.products__info}>
                  <h4 className={style.products__name}>{product.title}</h4>
                  <p className={style.products__category}>{product.category}</p>
                  <p className={style.products__price}>${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>}
      </section>
    </main>

  );
};

export default Home;

"use client";

import { NextPage } from "next";
import Image from "next/image";
import style from "./Home.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { fetchExternalData } from "@/app/external/externalRequest";
import { useEffect } from "react";
import { ApiResponse } from "./external/interface";
import useStore from "@/stores/useStore";

const Home: NextPage = () => {
  const { setProducts, setLoading, loading, products, user } = useStore();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data: ApiResponse = await fetchExternalData();
        setProducts(data.products);
      } catch {
        console.error("Failed to fetch external data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [setProducts, setLoading]);

  return (
    <main className={style.main}>
      <Header />
      <section className={style.products}>
        <div className={style.products__header}>
          <h2 className={style.products__title}>Latest Products</h2>
        </div>
        {loading ? (
          <div className={style.products__loading}>
            <p className={style.products__loading_text}>Loading ...</p>
          </div>
        ) : (
          <div className={style.products__list}>
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
                  <p className={style.products__price}>
                    ${product.price.toFixed(2)}
                  </p>
                  {user ? (
                    <button className={style.products__addProduct}>
                      Add to cart
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Home;

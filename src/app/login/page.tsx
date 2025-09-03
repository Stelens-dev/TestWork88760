"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./Login.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import useStore from "@/stores/useStore";

const Login = () => {
  const router = useRouter();
  const { setUser, setError, error } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateData = () => {
    if (!username || !password) {
      return "Username and password are required.";
    }
    if (username.length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const { token, name, surname, email } = response.data;

      // Saving the token
      setUser({ token, name, surname, email });

      router.push("/");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <main className={style.main}>
      <Header />
      <section className={style.login}>
        <div className={style.login__container}>
          <h3 className={style.login__title}>Login</h3>
          <form className={style.login__form} onSubmit={handleSubmit}>
            <input
              id="username"
              className={style.login__input}
              type="text"
              placeholder="Username"
              aria-label="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="password"
              className={style.login__input}
              type="password"
              placeholder="Password"
              aria-label="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={style.login__button} type="submit">
              Login
            </button>
          </form>
          {error && <p className={style.login__error}>{error}</p>}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;

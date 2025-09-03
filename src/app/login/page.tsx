"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./Login.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import useStore from "@/stores/useStore";

const ERROR_MESSAGES = {
  REQUIRED: "Username and password are required.",
  USERNAME_LENGTH: "Username must be at least 3 characters long.",
  PASSWORD_LENGTH: "Password must be at least 6 characters long.",
  INVALID_CREDENTIALS: "Invalid username or password",
};

const Login = () => {
  const router = useRouter();
  const { setUser, setError, error } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateData = () => {
    if (!username || !password) {
      return ERROR_MESSAGES.REQUIRED;
    }
    if (username.length < 3) {
      return ERROR_MESSAGES.USERNAME_LENGTH;
    }
    if (password.length < 6) {
      return ERROR_MESSAGES.PASSWORD_LENGTH;
    }
    return null;
  };

  const handleLoginError = (message: string) => {
    setError(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationError = validateData();
    if (validationError) {
      handleLoginError(validationError);
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
      handleLoginError(ERROR_MESSAGES.INVALID_CREDENTIALS);
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

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/UserContext";
import Input from "../../UIUnits/Input/Input";
import Button from "../../UIUnits/Buttons/Button";
import styles from "./Login.module.scss";
import { validateEmail } from "@/utils/functions";

const Login = () => {
  const router = useRouter();
  const { loginHandler } = useUserContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logingIn, setLogingIn] = useState(false);

  const onSubmitLogin = async () => {
    if (validateEmail(email) && password) {
      setLogingIn(true);
      const success = await loginHandler(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setLogingIn(false);
      }
    } else {
      console.log("HEYY, Invalid input, handle better");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Input
        title="Email"
        value={email}
        onChange={(val) => typeof val === "string" && setEmail(val)}
        placeholder="Please enter your email"
      />
      <Input
        title="Password"
        value={password}
        onChange={(val) => typeof val === "string" && setPassword(val)}
        placeholder="Please choose your password"
      />

      <div className={styles.btn}>
        <Button onClick={onSubmitLogin} loading={logingIn} disabled={logingIn}>
          Login
        </Button>
      </div>
      <p className={styles.footer}>
        Are you a new user?{" "}
        <Link className={styles.link} href="/signup">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;

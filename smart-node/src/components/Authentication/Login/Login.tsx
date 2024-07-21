"use client";

import React, { useState } from "react";
import styles from "./Login.module.scss";
import Input from "../../UIUnits/Input/Input";
import Button from "../../UIUnits/Buttons/Button";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <Input
        title="Email"
        value={email}
        onChange={(val) => setEmail(val)}
        placeholder="Please enter your email"
      />
      <Input
        title="Password"
        value={password}
        onChange={(val) => setPassword(val)}
        placeholder="Please choose your password"
      />

      <div className={styles.btn}>
        <Button onClick={() => {}}>Login</Button>
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

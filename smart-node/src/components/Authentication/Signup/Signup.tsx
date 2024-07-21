"use client";

import React, { useState } from "react";
import styles from "./Signup.module.scss";
import Input from "../../UIUnits/Input/Input";
import Button from "../../UIUnits/Buttons/Button";
import Link from "next/link";

const Login = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  return (
    <div className={styles.wrapper}>
      <Input
        title="First Name"
        value={firstName}
        onChange={(val) => setFirstName(val)}
        placeholder="Please enter your first name"
      />
      <Input
        title="Last Name"
        value={lastName}
        onChange={(val) => setLastName(val)}
        placeholder="Please enter your last name"
      />
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
      <Input
        title="Confirm Password"
        value={confirmPassword}
        onChange={(val) => setConfirmPassword(val)}
        placeholder="Please confirm entered password"
      />

      <div className={styles.btn}>
        <Button onClick={() => {}}>Create Account</Button>
      </div>
      <p className={styles.footer}>
        Already have an account?{" "}
        <Link className={styles.link} href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Login;

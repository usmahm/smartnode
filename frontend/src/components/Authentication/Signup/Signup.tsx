"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.scss";
import Input from "../../UIUnits/Input/Input";
import Button from "../../UIUnits/Buttons/Button";
import Link from "next/link";
import { validateEmail } from "@/utils/functions";
import { useUserContext } from "@/contexts/UserContext";

const Login = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signinUp, setSigninUp] = useState(false);

  const { signupHandler } = useUserContext();

  const isValidInput = () => {
    return (
      validateEmail(email) &&
      password &&
      firstName &&
      lastName &&
      password === confirmPassword
    );
  };

  const onSubmitLogin = async () => {
    if (isValidInput()) {
      setSigninUp(true);
      const success = await signupHandler({
        email,
        password,
        last_name: lastName,
        first_name: firstName,
      });
      if (success) {
        router.push("/dashboard");
      } else {
        setSigninUp(false);
      }
    } else {
      // console.log("HEYY, Invalid input, handle better");
    }
  };

  return (
    <div className={styles.wrapper}>
      <Input
        title="First Name"
        value={firstName}
        onChange={(val) => typeof val === "string" && setFirstName(val)}
        placeholder="Please enter your first name"
      />
      <Input
        title="Last Name"
        value={lastName}
        onChange={(val) => typeof val === "string" && setLastName(val)}
        placeholder="Please enter your last name"
      />
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
      <Input
        title="Confirm Password"
        value={confirmPassword}
        onChange={(val) => typeof val === "string" && setConfirmPassword(val)}
        placeholder="Please confirm entered password"
      />

      <div className={styles.btn}>
        <Button onClick={onSubmitLogin} disabled={signinUp} loading={signinUp}>
          Create Account
        </Button>
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

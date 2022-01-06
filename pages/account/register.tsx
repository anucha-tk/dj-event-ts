// noinspection JSUnusedGlobalSymbols

import React, { FormEvent, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";

import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Password miss match");
    } else {
      register({ username, email, password });
    }
  };

  return (
    <Layout title={"User Register"} isPrivateRoute={false}>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id={"username"}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Password Confirm</label>
            <input
              type="password"
              id={"passwordConfirm"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <input type="submit" value={"Register"} className={"btn"} />
          <p>
            Already have an account? <Link href={"/account/login"}>Login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;

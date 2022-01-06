// noinspection JSUnusedGlobalSymbols

import React, { FormEvent, useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

import styles from "@/styles/AuthForm.module.css";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title={"User Login"} isPrivateRoute={false}>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <form onSubmit={(e) => handleSubmit(e)}>
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
          <input type="submit" value={"Login"} className={"btn"} />
          <p>
            Don&#39;t have account? <Link href={"/account/register"}>Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;

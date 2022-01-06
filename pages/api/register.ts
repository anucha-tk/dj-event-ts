// noinspection JSUnusedGlobalSymbols

import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { API_URL } from "@/config/index";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/local/register`, {
        username,
        email,
        password,
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        }),
      );

      res.status(200).json({ user: data.user });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let error = "Something went wrong";
        if (e.response) {
          if (e.response.data.error.details.errors) {
            error = e.response.data.error.details.errors
              .map(
                (e: { path: string; message: string; name: string }) => `${e.path}: ${e.message}`,
              )
              .join(", ");
          } else {
            error = e.response.data.error.message;
          }
          res.status(e.response.data.error.status).json({ message: `${error}` });
        }
        res.status(500).json({ message: error });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default register;

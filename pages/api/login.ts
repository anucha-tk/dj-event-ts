// noinspection JSUnusedGlobalSymbols

import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { StrapiLoginResponse } from "../events/event.types";

import { API_URL } from "@/config/index";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    try {
      const { data } = await axios.post<StrapiLoginResponse>(`${API_URL}/api/auth/local`, {
        identifier,
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
      // todo modify handle error
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
    res.status(405).json({ message: `Method ${req.method} is not allow` });
  }
};

export default login;

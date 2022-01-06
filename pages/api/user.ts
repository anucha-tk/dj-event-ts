// noinspection JSUnusedGlobalSymbols

import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { API_URL } from "@/config/index";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });

      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    try {
      const { data: user } = await axios.get(`${API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.status(200).json({ user });
    } catch (e) {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default user;

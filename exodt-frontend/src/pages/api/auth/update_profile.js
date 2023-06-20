import { API_URL } from "../../../config/index";
import cookie from "cookie";
import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;

    const body = req.body

    try {
      const apiRes = await axios.put(`${API_URL}/user_profiles/update_profile/`, body, {
        headers: {
          "Accept": "application/json",
          // "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${access}`,
        },
      });
      const data = await apiRes.data;

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
};
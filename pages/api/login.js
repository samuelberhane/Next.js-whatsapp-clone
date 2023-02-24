import cookie from "cookie";

export default (req, res) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("user", process.env.NEXT_PUBLIC_COOKIE_TOKEN, {
        maxAge: 60 * 60,
        httpOnly: true,
        path: "/",
      })
    );
    res.status(200).json({ success: true });
  }
};

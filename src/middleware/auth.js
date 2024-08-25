import pkg from "jsonwebtoken";
const { verify } = pkg;

export default function (req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

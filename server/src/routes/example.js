import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.json({ msg: "hello" });
});

export default router;

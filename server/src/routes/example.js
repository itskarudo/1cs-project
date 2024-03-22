import { Router } from "express";

const exampleRouter = Router();

router.get("/", (req, res) => {
  return res.json({ msg: "hello" });
});

export default exampleRouter;

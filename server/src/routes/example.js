import { Router } from "express";

const exampleRouter = Router();

exampleRouter.get("/", (req, res) => {
  return res.json({ msg: "hello" });
});

export default exampleRouter;

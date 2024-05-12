import { Handler, Router } from "express";
import { winners } from "../../fakeData";

const router = Router();
const getHandler: Handler = (req, res) => {
  res.json(winners);
};
router.get("/", getHandler);

export default router;

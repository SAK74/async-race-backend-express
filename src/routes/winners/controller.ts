import { Router } from "express";
import {
  createWinner,
  deleteWinner,
  getAllWinners,
  getWinnerById,
  updateWinner,
} from "./service";
import { Order, type Sort, type Winner } from "../../types";
import { StatusCode } from "../../statusCodes";

const router = Router();
router
  .route("/")
  .get<
    {},
    Winner[],
    null,
    { _page?: string; _limit?: string; _sort?: Sort; _order?: Order }
  >((req, resp) => {
    const { _page, _limit, _sort, _order } = req.query;
    const { winners, count } = getAllWinners(
      Number(_page) || 1,
      Number(_limit) || undefined,
      _sort,
      _order
    );
    if (req.query._limit) {
      resp.set("X-Total-Count", count.toString());
    }
    resp.json(winners);
  })
  .post<{ id: string }, Winner, Winner>((req, resp) => {
    const winner = req.body;
    const createdWinner = createWinner(winner);
    if (createdWinner) {
      resp.json(createdWinner);
    } else {
      resp.status(StatusCode["INTERNAL SERVER ERROR"]).end();
    }
  });

router
  .route("/:id")
  .get((req, resp) => {
    const winner = getWinnerById(+req.params.id);
    if (winner) {
      resp.json(winner);
    } else {
      resp.status(StatusCode["NOT FOUND"]).end();
    }
  })
  .put<{ id: string }, Winner, Omit<Winner, "id">>((req, resp) => {
    const id = req.params.id;
    const winner = req.body;
    const updatedCar = updateWinner({ ...winner, id: +id });
    if (updatedCar) {
      resp.json(updatedCar);
    } else {
      resp.status(StatusCode["NOT FOUND"]).end();
    }
    resp.json();
  })
  .delete((req, resp) => {
    if (deleteWinner(+req.params.id)) {
      resp.status(StatusCode.OK).end();
    }
    resp.status(StatusCode["NOT FOUND"]).end();
  });

export default router;

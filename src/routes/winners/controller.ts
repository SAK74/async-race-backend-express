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
import { handleServerError } from "../../utils/handleServerError";
import { Prisma } from "@prisma/client";

const router = Router();
router
  .route("/")
  .get<
    {},
    Winner[],
    null,
    { _page?: string; _limit?: string; _sort?: Sort; _order?: Order }
  >(async (req, resp) => {
    try {
      const { _page, _limit, _sort, _order } = req.query;
      const { winners, count } = await getAllWinners(
        Number(_page) || 1,
        Number(_limit) || undefined,
        _sort,
        _order
      );
      if (req.query._limit) {
        resp.set("X-Total-Count", count.toString());
      }
      resp.json(winners);
    } catch (err) {
      handleServerError(err, resp);
    }
  })

  .post<{ id: string }, Winner, Winner>(async (req, resp) => {
    try {
      const winner = req.body;
      const createdWinner = await createWinner(winner);
      resp.json(createdWinner);
    } catch (err) {
      handleServerError(err, resp);
    }
  });

router
  .route("/:id")
  .get(async (req, resp) => {
    try {
      const winner = await getWinnerById(+req.params.id);
      resp.json(winner);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        resp.status(StatusCode["NOT FOUND"]).end();
      } else {
        handleServerError(err, resp);
      }
    }
  })

  .put<{ id: string }, Winner, Omit<Winner, "id">>(async (req, resp) => {
    try {
      const id = req.params.id;
      const winner = req.body;

      const updatedWinner = await updateWinner({ ...winner, id: +id });
      resp.json(updatedWinner);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        resp.status(StatusCode["NOT FOUND"]).end();
      } else {
        handleServerError(err, resp);
      }
    }
  })

  .delete(async (req, resp) => {
    try {
      await deleteWinner(+req.params.id);
      resp.status(StatusCode.OK).end();
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        resp.status(StatusCode["NOT FOUND"]).end();
      } else {
        handleServerError(err, resp);
      }
    }
  });

export default router;

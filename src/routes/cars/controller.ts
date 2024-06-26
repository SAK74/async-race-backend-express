import { Router } from "express";
import {
  createCar,
  deleteCar,
  getAllCars,
  getCarById,
  updateCar,
} from "./service";
import { type Car } from "types";
import { StatusCode } from "../../statusCodes";
import { Prisma } from "@prisma/client";
import { handleServerError } from "../../utils/handleServerError";

const router = Router();

router
  .route("/")
  .get<{}, Car[], null, { _page?: string; _limit?: string }>(
    async (req, resp) => {
      try {
        const { cars, count } = await getAllCars(
          Number(req.query._page) || 1,
          Number(req.query._limit) || undefined
        );
        if (req.query._limit) {
          resp.set("X-Total-Count", count.toString());
        }
        resp.json(cars);
      } catch (err) {
        handleServerError(err, resp);
      }
    }
  )

  .post<{ id: string }, Car, Omit<Car, "id">>(async (req, resp) => {
    try {
      const car = req.body;
      const createdCar = await createCar(car);
      resp.json(createdCar);
    } catch (err) {
      handleServerError(err, resp);
    }
  });

router
  .route("/:id")
  .get(async (req, resp) => {
    try {
      const car = await getCarById(+req.params.id);
      resp.json(car);
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

  .put<{ id: string }, Car, Omit<Car, "id">>(async (req, resp) => {
    const id = req.params.id;
    const car = req.body;
    try {
      resp.json(await updateCar({ ...car, id: +id }));
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
      await deleteCar(+req.params.id);

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

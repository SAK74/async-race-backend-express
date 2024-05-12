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

const router = Router();

router
  .route("/")
  .get<{}, Car[], null, { _page?: string; _limit?: string }>((req, resp) => {
    const { cars, count } = getAllCars(
      Number(req.query._page) || 1,
      Number(req.query._limit) || undefined
    );
    if (req.query._limit) {
      resp.set("X-Total-Count", count.toString());
    }
    resp.json(cars);
  })
  .post<{ id: string }, Car, Omit<Car, "id">>((req, resp) => {
    const car = req.body;
    const createdCar = createCar(car);
    resp.json(createdCar);
  });

router
  .route("/:id")
  .get((req, resp) => {
    const car = getCarById(+req.params.id);
    if (car) {
      resp.json(car);
    } else {
      resp.status(StatusCode["NOT FOUND"]).end();
    }
  })
  .put<{ id: string }, Car, Omit<Car, "id">>((req, resp) => {
    const id = req.params.id;
    const car = req.body;
    const updatedCar = updateCar({ ...car, id: +id });
    if (updatedCar) {
      resp.json(updatedCar);
    } else {
      resp.status(StatusCode["NOT FOUND"]).end();
    }
    resp.json();
  })
  .delete((req, resp) => {
    if (deleteCar(+req.params.id)) {
      resp.status(StatusCode.OK).end();
    }
    resp.status(StatusCode["NOT FOUND"]).end();
  });

export default router;

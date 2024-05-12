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
  .get((_, resp) => {
    resp.json(getAllCars());
  })
  .post<{ id: string }, {}, Omit<Car, "id">>((req, resp) => {
    const car = req.body;
    const createdCar = createCar(car);
    resp.json(createdCar);
  });

router
  .route("/:id")
  .get((req, resp) => {
    const car = getCarById(Number(req.params.id));
    if (car) {
      resp.json(car);
    } else {
      resp.status(StatusCode["NOT FOUND"]).end();
    }
  })
  .put<{ id: string }, {}, Omit<Car, "id">>((req, resp) => {
    const id = req.params.id;
    const car = req.body;
    const updatedCar = updateCar({ ...car, id: Number(id) });
    if (updatedCar) {
      resp.json(updatedCar);
    } else {
      resp.status(StatusCode["NOT FOUND"]).end();
    }
    resp.json();
  })
  .delete((req, resp) => {
    if (deleteCar(Number(req.params.id))) {
      resp.status(StatusCode.OK).end();
    }
    resp.status(StatusCode["NOT FOUND"]).end();
  });

export default router;

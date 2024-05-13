import { Router } from "express";
import { Car, EngineResponse, STATUS } from "../../types";
import { StatusCode } from "../../statusCodes";
import { getCarById } from "../cars/service";

const router = Router();

const state: {
  velocity: { [id: string]: number };
  blocked: { [id: string]: boolean };
} = { velocity: {}, blocked: {} };

router.patch<
  "/",
  {},
  EngineResponse | string,
  {},
  { id: Car["id"]; status: STATUS; speed?: number }
>("/", (req, res) => {
  const { id, status } = req.query;

  if (!id || Number.isNaN(+id) || +id <= 0) {
    return res
      .status(StatusCode["BAD REQUEST"])
      .send('Required parameter "id" is missing. Should be a positive number');
  }

  if (!status || !/^(started)|(stopped)|(drive)$/.test(status)) {
    return res
      .status(StatusCode["BAD REQUEST"])
      .send(
        `Wrong parameter "status". Expected: "started", "stopped" or "drive". Received: "${status}"`
      );
  }

  if (!getCarById(+id)) {
    return res
      .status(StatusCode["NOT FOUND"])
      .send("Car with such id was not found in the garage.");
  }

  const distance = 500000;

  if (status === STATUS.DRIVE) {
    if (state.blocked[id]) {
      return res
        .status(StatusCode["TOO MANY REQUESTS"])
        .send(
          "Drive already in progress. You can't run drive for the same car twice while it's not stopped."
        );
    }

    const velocity = state.velocity[id];

    if (!velocity) {
      return res
        .status(StatusCode["NOT FOUND"])
        .send(
          'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?'
        );
    }

    state.blocked[id] = true;

    const x = Math.round(distance / velocity);

    delete state.velocity[id];

    if (new Date().getMilliseconds() % 3 === 0) {
      setTimeout(() => {
        delete state.blocked[id];
        res.statusMessage = "Engine damage...";
        res
          .append("Content-Type", "application/json")
          .status(StatusCode["INTERNAL SERVER ERROR"])
          .send("Car has been stopped suddenly. It's engine was broken down.");
      }, (Math.random() * x) ^ 0);
    } else {
      setTimeout(() => {
        delete state.blocked[id];
        res
          .append("Content-Type", "application/json")
          .status(StatusCode.OK)
          .json({ success: true });
      }, x);
    }
  } else {
    const x = req.query.speed ? +req.query.speed : (Math.random() * 2000) ^ 0;

    const velocity =
      status === STATUS.STARTED ? Math.max(50, (Math.random() * 200) ^ 0) : 0;

    if (velocity) {
      state.velocity[id] = velocity;
    } else {
      delete state.velocity[id];
      delete state.blocked[id];
    }

    setTimeout(
      () =>
        res
          .append("Content-Type", "application/json")
          .status(StatusCode.OK)
          .json({ velocity, distance }),
      x
    );
  }
});

export default router;

import { Response } from "express";
import { StatusCode } from "../statusCodes";

export const handleServerError = (err: unknown, resp: Response) => {
  console.error(err);
  resp.status(StatusCode["INTERNAL SERVER ERROR"]).end();
};

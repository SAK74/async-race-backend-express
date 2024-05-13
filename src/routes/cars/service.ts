import { type Car } from "types";
import { splitedArray } from "../../utils/splitedArray";
import db from "../../db";

export const getAllCars = async (page: number = 1, limit?: number) => {
  const cars = await db.car.findMany({ orderBy: { id: "asc" } });
  if (!limit) {
    return { cars, count: cars.length };
  }
  const splitedCars = splitedArray(cars, limit);
  return {
    cars: splitedCars[Math.min(page - 1, splitedCars.length - 1)],
    count: cars.length,
  };
};

export const getCarById = async (id: number) => {
  return await db.car.findUniqueOrThrow({ where: { id } });
};

export const createCar = async (car: Omit<Car, "id">) => {
  return await db.car.create({ data: car });
};

export const updateCar = async ({ id, color, name }: Car) =>
  await db.car.update({ where: { id }, data: { name, color } });

export const deleteCar = async (id: number) => {
  return await db.car.delete({ where: { id }, select: { name: true } });
};

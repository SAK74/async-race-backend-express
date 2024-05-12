import { garage as cars } from "../../fakeData";
import { randomInt } from "node:crypto";
import { type Car } from "types";

export const getAllCars = () => cars;

export const getCarById = (id: number) => cars.find((car) => car.id === id);

export const createCar = (car: Omit<Car, "id">) => {
  const id = randomInt(999);
  cars.push({ ...car, id });
  return { ...car, id };
};

export const updateCar = (car: Car) => {
  const index = cars.findIndex(({ id }) => id === car.id);
  if (index !== -1) {
    cars[index] = car;
    return cars[index];
  }
};

export const deleteCar = (id: number) => {
  const index = cars.findIndex((car) => id === car.id);
  if (index !== -1) {
    cars.splice(index, 1);
    return true;
  }
  return false;
};

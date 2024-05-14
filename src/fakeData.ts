import { Car, Winner } from "types";

export const garage: Omit<Car, "id">[] = [
  {
    name: "Tesla",
    color: "#e6e6fa",
    // id: 1,
  },
  {
    name: "BMW",
    color: "#fede00",
    // id: 2,
  },
  {
    name: "Mercedes",
    color: "#6c779f",
    // id: 3,
  },
  {
    name: "Ford",
    color: "#ef3c40",
    // id: 4,
  },
];

export const winners: Winner[] = [
  {
    id: 1,
    wins: 1,
    time: 10.01,
  },
];

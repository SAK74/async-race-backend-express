import { winners } from "../../fakeData";
import { randomInt } from "node:crypto";
import { type Winner } from "types";
import { splitedArray } from "../../utils/splitedArray";

export const getAllWinners = (page: number = 1, limit?: number) => {
  if (!limit) {
    return { winners, count: winners.length };
  }
  const splitedWinners = splitedArray(winners, limit);
  return { winners: splitedWinners[page - 1], count: winners.length };
};

export const getWinnerById = (id: number) =>
  winners.find((winner) => winner.id === id);

export const createWinner = (winner: Omit<Winner, "id">) => {
  const id = randomInt(999);
  winners.push({ ...winner, id });
  return { ...winner, id };
};

export const updateWinner = (winner: Winner) => {
  const index = winners.findIndex(({ id }) => id === winner.id);
  if (index !== -1) {
    winners[index] = winner;
    return winners[index];
  }
};

export const deleteWinner = (id: number) => {
  const index = winners.findIndex((winner) => id === winner.id);
  if (index !== -1) {
    winners.splice(index, 1);
    return true;
  }
  return false;
};

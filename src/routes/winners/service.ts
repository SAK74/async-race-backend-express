import { winners } from "../../fakeData";
import { Order, type Sort, type Winner } from "../../types";
import { splitedArray } from "../../utils/splitedArray";

export const getAllWinners = (
  page: number = 1,
  limit?: number,
  sort?: Sort,
  order: Order = Order.ASCENDING
) => {
  const winnersRes = !sort
    ? winners
    : winners.sort((a, b) => {
        switch (sort) {
          case "id":
            return order === Order.ASCENDING ? a.id - b.id : b.id - a.id;
          case "time":
            return order === Order.ASCENDING
              ? a.time - b.time
              : b.time - a.time;
          case "wins":
            return order === Order.ASCENDING
              ? a.wins - b.wins
              : b.wins - a.wins;
        }
      });
  if (!limit) {
    return { winners: winnersRes, count: winners.length };
  }
  const splitedWinners = splitedArray(winnersRes, limit);
  return { winners: splitedWinners[page - 1], count: winners.length };
};

export const getWinnerById = (id: number) =>
  winners.find((winner) => winner.id === id);

export const createWinner = (winner: Winner) => {
  const isPresent = winners.indexOf(winner) !== -1;
  if (!isPresent) {
    winners.push(winner);
    return winner;
  }
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

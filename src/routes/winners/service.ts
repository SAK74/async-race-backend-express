import { Order, type Sort, type Winner } from "../../types";
import { splitedArray } from "../../utils/splitedArray";
import db from "../../db";
import { Prisma } from "@prisma/client";

export const getAllWinners = async (
  page: number = 1,
  limit?: number,
  sort?: Sort,
  order: Order = Order.ASCENDING
) => {
  const orderBy: Prisma.WinnerOrderByWithRelationInput | undefined = sort && {
    [sort]: order === Order.ASCENDING ? "asc" : "desc",
  };
  const winners = await db.winner.findMany({ orderBy });

  if (!limit) {
    return { winners, count: winners.length };
  }
  const splitedWinners = splitedArray(winners, limit);
  return { winners: splitedWinners[page - 1], count: winners.length };
};

export const getWinnerById = async (id: number) =>
  await db.winner.findUniqueOrThrow({ where: { id } });

export const createWinner = async (winner: Winner) =>
  await db.winner.create({ data: winner });

export const updateWinner = async ({ id, time, wins }: Winner) =>
  await db.winner.update({
    where: { id },
    data: { time, wins },
  });

export const deleteWinner = async (id: number) =>
  await db.winner.delete({ where: { id }, select: { id: true } });

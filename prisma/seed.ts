import { PrismaClient } from "@prisma/client";
import { garage, winners } from "../src/fakeData";

const db = new PrismaClient();

async function start() {
  await db.car.createMany({ data: garage });
  await db.winner.createMany({ data: winners });
}

start()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (err) => {
    console.log(err);
    await db.$disconnect();
    process.exit(1);
  });

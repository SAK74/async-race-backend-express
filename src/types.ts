export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export enum StatusCode {
  "OK" = 200,
  "NOT FOUND" = 404,
}

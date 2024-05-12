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

export enum STATUS {
  STARTED = "started",
  STOPPED = "stopped",
  DRIVE = "drive",
}

export type EngineResponse =
  | {
      velocity: number;
      distance: number;
    }
  | {
      success: boolean;
    };

export type Sort = "id" | "wins" | "time";
export enum Order {
  ASCENDING = "ASC",
  DESCENDING = "DESC",
}

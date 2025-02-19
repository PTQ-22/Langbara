// for PLAY and DAILY endpoints
// starting guesses left for each word level (from A1 to C2)
export const MAX_GUESSES_TABLE = [5, 5, 3, 3, 2, 2];
// points table for each word level (from A1 to C2)
export const MAX_POINTS_TABLE = [15, 15, 30, 30, 45, 45];
export const DROP_POINTS_TABLE = [3, 3, 3, 3, 3, 3];


export enum ModesNames {
  DAILY = "DAILY",
  UNLIMITED = "UNLIMITED"
}


export const POLISH_TIMEZONE_OFFSET = 3600 * 1000;
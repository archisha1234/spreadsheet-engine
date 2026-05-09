export const ROWS = 10;
export const COLS = 10;

export const CELL_REGEX = /[A-J](10|[1-9])/g;

export const createCellId = (row: number, col: number) => {
  return `${String.fromCharCode(65 + col)}${row + 1}`;
};
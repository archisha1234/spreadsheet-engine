export type CellData = {
  raw: string;
  value: string | number;
  dependencies: Set<string>;
  dependents: Set<string>;
  error?: string;
};

export type GridState = Record<string, CellData>;
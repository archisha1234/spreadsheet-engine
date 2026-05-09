import { CELL_REGEX } from './constants';

export const isFormula = (value: string) => value.startsWith('=');

export function extractDependencies(formula: string): string[] {
  return formula.match(CELL_REGEX) || [];
}
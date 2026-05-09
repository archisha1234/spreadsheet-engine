import { evaluate } from 'mathjs';
import { CELL_REGEX } from './constants';
import type { GridState } from '../types/cell';

export function evaluateFormula(
  formula: string,
  cells: GridState
): string | number {
  try {
    const expression = formula
      .slice(1)
      .replace(CELL_REGEX, (match) => {
        const value = cells[match]?.value;

        if (
          value === '#ERROR' ||
          value === '#CIRCULAR' ||
          value === undefined ||
          value === ''
        ) {
          return '0';
        }

        return String(value);
      });

    const result = evaluate(expression);

    return result;
  } catch {
    return '#ERROR';
  }
}
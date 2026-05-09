import { useState } from 'react';
import Cell from './Cell';
import type { GridState } from '../types/cell';
import { ROWS, COLS, createCellId } from '../utils/constants';
import { isFormula, extractDependencies } from '../utils/parser';
import { evaluateFormula } from '../utils/evaluator';
import { hasCycle } from '../utils/dependencyGraph';

function initializeGrid(): GridState {
  const grid: GridState = {};

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const id = createCellId(row, col);

      grid[id] = {
        raw: '',
        value: '',
        dependencies: new Set(),
        dependents: new Set(),
      };
    }
  }

  return grid;
}

const Spreadsheet = () => {
  const [cells, setCells] = useState<GridState>(initializeGrid());

  const recalculateDependents = (
    cellId: string,
    updatedCells: GridState
  ) => {
    for (const dependent of updatedCells[cellId].dependents) {
      const dependentCell = updatedCells[dependent];

      if (isFormula(dependentCell.raw)) {
        dependentCell.value = evaluateFormula(
          dependentCell.raw,
          updatedCells
        );
      }

      recalculateDependents(dependent, updatedCells);
    }
  };

  const updateCell = (cellId: string, rawValue: string) => {
    setCells((prev) => {
      const updated = { ...prev };

      updated[cellId] = {
        ...updated[cellId],
        raw: rawValue,
      };

      for (const dep of updated[cellId].dependencies) {
        updated[dep].dependents.delete(cellId);
      }

      updated[cellId].dependencies = new Set();

      if (!isFormula(rawValue)) {
        updated[cellId].value = rawValue;

        recalculateDependents(cellId, updated);

        return { ...updated };
      }

      const dependencies = extractDependencies(rawValue);

      dependencies.forEach((dep) => {
        updated[cellId].dependencies.add(dep);
        updated[dep].dependents.add(cellId);
      });

      const graph: Record<string, Set<string>> = {};

      Object.keys(updated).forEach((key) => {
        graph[key] = updated[key].dependencies;
      });

      if (hasCycle(cellId, graph)) {
        updated[cellId].value = '#CIRCULAR';
        return { ...updated };
      }

      updated[cellId].value = evaluateFormula(rawValue, updated);

      recalculateDependents(cellId, updated);

      return { ...updated };
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: COLS }).map((_, col) => (
              <th key={col}>{String.fromCharCode(65 + col)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS }).map((_, row) => (
            <tr key={row}>
              <th>{row + 1}</th>

              {Array.from({ length: COLS }).map((_, col) => {
                const id = createCellId(row, col);

                return (
                  <td key={id}>
                    <Cell
                      raw={cells[id].raw}
                      value={cells[id].value}
                      onChange={(value) => updateCell(id, value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
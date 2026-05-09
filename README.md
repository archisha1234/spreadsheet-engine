# Spreadsheet Engine with Formula Evaluation

A React-based spreadsheet engine that supports formula parsing, dependency tracking, automatic recalculation, and circular reference detection similar to basic Excel/Google Sheets functionality.

---

## Features

### Grid System
- 10×10 spreadsheet grid
- Columns labeled A–J
- Rows labeled 1–10
- Editable spreadsheet cells

### Formula Support
Supports formulas beginning with `=`

Examples:

```txt
=A1+B1
=A1*2
=(A1+B1)/3
```

### Arithmetic Operations
- Addition `+`
- Subtraction `-`
- Multiplication `*`
- Division `/`
- Parentheses `()`

### Dependency Management
- Tracks dependencies between cells
- Automatically updates dependent cells
- Optimized recalculation of affected cells only

### Circular Reference Detection
Detects cycles such as:

```txt
A1 = =B1
B1 = =A1
```

Displays:

```txt
#CIRCULAR
```

### Error Handling
Handles:
- Invalid formulas
- Malformed expressions
- Unknown references

Displays:

```txt
#ERROR
```

without crashing the application.

### UI Features
- Modern spreadsheet-inspired UI
- Responsive layout
- Focus highlighting
- Error highlighting
- Glassmorphism styling

---

# Tech Stack

- React
- TypeScript
- Vite
- mathjs

---

# Project Structure

```txt
src/
 ├── components/
 │    ├── Spreadsheet.tsx
 │    └── Cell.tsx
 │
 ├── types/
 │    └── cell.ts
 │
 ├── utils/
 │    ├── constants.ts
 │    ├── dependencyGraph.ts
 │    ├── evaluator.ts
 │    └── parser.ts
 │
 ├── App.tsx
 ├── main.tsx
 └── index.css
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/archishapaul/spreadsheet-engine.git
```

Navigate into the project:

```bash
cd spreadsheet-engine
```

Install dependencies:

```bash
npm install
```

Install mathjs:

```bash
npm install mathjs
```

Run the development server:

```bash
npm run dev
```

---

# Usage

## Enter Normal Values

```txt
5
hello
42
```

## Enter Formulas

```txt
=A1+3
=B1*2
=(A1+B1)/2
```

---

# Example

## Input

```txt
A1 = 5
B1 = =A1+3
C1 = =B1*2
```

## Output

```txt
B1 = 8
C1 = 16
```

When:

```txt
A1 = 10
```

Automatically updates:

```txt
B1 = 13
C1 = 26
```

---

# Circular Reference Example

## Input

```txt
A2 = =B2
B2 = =A2
```

## Output

```txt
#CIRCULAR
```

---

# Invalid Formula Example

## Input

```txt
=A1+
```

## Output

```txt
#ERROR
```

---

# Core Concepts Implemented

## Formula Parsing
Cell references are extracted using regex parsing.

## Dependency Graph
Each cell maintains:
- dependencies
- dependents

This enables efficient recalculation propagation.

## Circular Detection
DFS-based cycle detection prevents infinite loops.

## Incremental Recalculation
Only affected dependent cells are recalculated instead of the entire grid.

---

# Future Improvements

- Undo/Redo support
- Dynamic grid sizing
- Formula bar
- Keyboard navigation
- Sticky headers
- Range functions (`SUM`, `AVG`)
- Local storage persistence
- Dark mode
- Copy/Paste support

---

# Deployment

Can be deployed easily on:

- Vercel
- Netlify

---

# Resume Description

Built a React-based spreadsheet engine supporting formula parsing, dependency graph propagation, circular reference detection, and optimized incremental recalculation similar to Excel.

---

# Author

Archisha Paul
# Spreadsheet Engine

A React-based spreadsheet engine inspired by Excel/Google Sheets functionality with support for formula evaluation, dependency tracking, automatic recalculation, circular reference detection, and error handling.

## Live Demo

https://spreadsheet-engine-alpha.vercel.app/

---

## Features

- 10×10 editable spreadsheet grid
- Formula evaluation using `=`
- Arithmetic operations (`+`, `-`, `*`, `/`)
- Cell reference support (`=A1+B1`)
- Dependency tracking and update propagation
- Circular reference detection (`#CIRCULAR`)
- Invalid formula handling (`#ERROR`)
- Responsive modern UI

---

## Tech Stack

- React
- TypeScript
- Vite
- mathjs

---

## Installation

```bash
git clone https://github.com/Archisha1234/spreadsheet-engine.git

cd spreadsheet-engine

npm install
npm install mathjs

npm run dev
```

---

## Example Formulas

```txt
=A1+B1
=A1*2
=(A1+B1)/3
```

---

## Author

Archisha Paul
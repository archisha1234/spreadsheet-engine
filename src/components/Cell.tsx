import { useState } from 'react';

type Props = {
  value: string | number;
  raw: string;
  onChange: (value: string) => void;
};

const Cell = ({
  value,
  raw,
  onChange,
}: Props) => {
  const [editing, setEditing] = useState(false);

  const getClassName = () => {
    if (value === '#ERROR') return 'cell error';

    if (value === '#CIRCULAR') {
      return 'cell circular';
    }

    return 'cell';
  };

  return (
    <input
      className={getClassName()}
      value={editing ? raw : value}
      onFocus={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Cell;
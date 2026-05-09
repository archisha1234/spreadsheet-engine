import React, { useState } from 'react';

type Props = {
  value: string | number;
  raw: string;
  onChange: (value: string) => void;
};

const Cell: React.FC<Props> = ({
  value,
  raw,
  onChange,
}) => {
  const [editing, setEditing] = useState(false);

  const getClassName = () => {
    if (value === '#ERROR') return 'cell error';
    if (value === '#CIRCULAR') return 'cell circular';

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

export default React.memo(Cell);
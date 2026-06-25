import React from 'react';

type Props = {
  label: string;
  children: React.ReactNode;
  error?: string | null;
};

export const FormField: React.FC<Props> = ({ label, children, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {children}
      {error && <span className="error">{error}</span>}
    </div>
  );
};
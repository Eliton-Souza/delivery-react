import React from 'react';

const Switch = ({ checked, setChecked }) => {
 
  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checked}
        onClick={() => setChecked(!checked)}
        style={{ width: '60px', height: '30px' }}
      />
    </div>
  );
};

export default Switch;
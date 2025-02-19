import React, { useState } from 'react'
import { StyledCheckbox } from './CheckBox.styles';

interface CheckBoxProps {
  initialState?: boolean;
  onChange?: (state: boolean) => void;
};

export const CheckBox = ({initialState, onChange}: CheckBoxProps) => {
  const [isChecked, setChecked] = useState<boolean>(initialState || false);

  const handleChange = () => {
    if(onChange) {
      onChange(!isChecked);
    }
    setChecked(!isChecked);
  }

  return (
    <StyledCheckbox
      type='checkbox'
      onChange={handleChange}
      checked={isChecked}
    />
  )
}

import { colors } from "@/constants/colors";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface PropTypes {
  initialValue?: number;
  onChange?: (value: number) => void;
}

const StyledWrapper = styled.div`
  display: inline-block;
  background-color: ${colors.lightGray};
  font-weight: 700px;
  font-size: 13px;
  border: 1px solid ${colors.lightGray};

  button {
    border: none;
    background-color: transparent;
    padding: 15px;
    cursor: pointer;

    &:hover {
      color: ${colors.darkPeach};
    }
  }

  span {
    display: inline-block;
    letter-spacing: 1px;
    color: ${colors.black};
    min-width: 30px;
    text-align: center;
  }
`;

const StepButton: React.FC<PropTypes> = ({ initialValue = 1, onChange }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onIncrease = () => {
    setValue(value + 1);
    if (onChange) {
      onChange(value + 1);
    }
  };

  const onDecrease = () => {
    if (value > 1) {
      setValue(value - 1);
      if (onChange) {
        onChange(value - 1);
      }
    }
  };

  return (
    <StyledWrapper className='step-button'>
      <button onClick={onDecrease}>-</button>
      <span>{value}</span>
      <button onClick={onIncrease}>+</button>
    </StyledWrapper>
  );
};

export default StepButton;

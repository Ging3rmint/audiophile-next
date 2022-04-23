import { memo } from "react";
import { colors } from "@/constants/colors";
import styled from "styled-components";

interface PropTypes {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  label?: string;
}

const StyledWrapper = styled.div`
  display: inline-block;

  input {
    display: none;
    position: absolute;

    &:checked ~ label:before {
      opacity: 1;
    }
  }

  label {
    display: block;
    background-color: ${colors.white};
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    padding: 18px 52px;
    position: relative;
    width: 100%;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.25px;
    cursor: pointer;

    &:hover {
      border: 1px solid #d87d4a;
    }

    &:before {
      position: absolute;
      content: "";
      width: 10px;
      height: 10px;
      background-color: #d87d4a;
      border-radius: 10px;
      top: 50%;
      left: 20px;
      transform: translate(0, -50%);
      opacity: 0;
    }

    &:after {
      position: absolute;
      content: "";
      width: 19px;
      height: 19px;
      border: 1px solid #cfcfcf;
      border-radius: 20px;
      top: 50%;
      left: 14.6px;
      transform: translate(0, -50%);
    }
  }
`;
const RadioField: React.FC<PropTypes> = ({
  value,
  onChange,
  name,
  id,
  label,
}) => {
  return (
    <StyledWrapper className='radio-field'>
      <input
        id={id}
        name={name}
        type='radio'
        onClick={() => onChange && value && onChange(value)}
      />
      <label htmlFor={id}>{label}</label>
    </StyledWrapper>
  );
};

export default memo(RadioField);

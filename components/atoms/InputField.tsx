import { memo } from "react";
import styled from "styled-components";

import { colors } from "@/constants/index";

interface PropTypes {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  value?: string;
  name?: string;
  id?: string;
  error?: string;
  type?: string;
}

const StyledWrapper = styled.div`
  display: inline-block;

  &.error {
    .label-wrapper {
      label {
        color: #cd2c2c;
      }
    }

    input {
      caret-color: red;
      border: 2px solid #cd2c2c;
    }
  }

  .label-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 9px;

    label {
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.214;
      color: ${colors.black};
    }

    span {
      color: #cd2c2c;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.214;
    }
  }

  input {
    padding: 18px 24px;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.214;
    font-weight: 700;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    caret-color: #cfcfcf;
    width: 100%;

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    &:focus {
      caret-color: ${colors.lightPeach};
      border: 1px solid ${colors.lightPeach};
    }
  }
`;

const InputField: React.FC<PropTypes> = ({
  label,
  name,
  id,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
}) => {
  return (
    <StyledWrapper className={`input-field ${error ? "error" : ""}`}>
      <div className='label-wrapper'>
        <label htmlFor={id}>{label}</label>
        {error && <span>{error}</span>}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};

export default memo(InputField);

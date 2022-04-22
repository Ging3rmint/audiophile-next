import styled from "styled-components";
import { colors } from "@/constants/index";

interface PropTypes {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: string;
}

const StyledButton = styled.button`
  background-color: ${colors.darkPeach};
  color: ${colors.white};
  border: 1px solid ${colors.darkPeach};
  padding: 15px 30px;
  letter-spacing: 1px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  > a {
    display: block;
    text-decoration: none;
    color: ${colors.white};
    width: 100%;
    height: 100%;
  }

  &:hover {
    background-color: ${colors.lightPeach};
    border-color: ${colors.lightPeach};
  }

  &.secondary {
    background-color: transparent;
    border: 1px solid ${colors.black};
    color: ${colors.black};

    &.reverse {
      background-color: ${colors.black};
      border: 1px solid ${colors.black};
      color: ${colors.white};

      &:hover {
        background-color: transparent;
        color: ${colors.black};

        > a {
          text-decoration: none;
          color: ${colors.black};
        }
      }
    }

    &:hover {
      background-color: ${colors.black};
      color: ${colors.white};

      > a {
        text-decoration: none;
        color: ${colors.white};
      }
    }

    > a {
      text-decoration: none;
      color: ${colors.black};
    }
  }

  &.simple {
    border: none;
    background-color: none;
  }
`;

const Button: React.FC<PropTypes> = ({
  text,
  children,
  className,
  onClick,
}) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {children ? children : text}
    </StyledButton>
  );
};

export default Button;

Button.defaultProps = {
  text: "SEE PRODUCT",
};

import { colors } from "@/constants/colors";
import styled from "styled-components";

interface PropTypes {
  onClick: () => void;
}

const StyledButton = styled.button`
  position: relative;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: none;

  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: ${colors.white};

    &:before {
      top: 1px;
      left: 0;
      position: absolute;
      width: 100%;
      height: 3px;
      content: "";
      background-color: ${colors.white};
    }

    &:after {
      bottom: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 3px;
      content: "";
      background-color: ${colors.white};
    }
  }
`;

const HamburgerButton: React.FC<PropTypes> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <span></span>
    </StyledButton>
  );
};

export default HamburgerButton;

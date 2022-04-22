import styled from "styled-components";

interface PropTypes {
  children?: React.ReactNode;
  show?: boolean;
  onClick?: () => void;
}
const StyledModal = styled.div`
  position: fixed;
  top: 113px;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  z-index: -1;
  height: 0;
  overflow: hidden;

  &.show {
    opacity: 1;
    z-index: 1;
    height: auto;
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const Modal: React.FC<PropTypes> = ({ children, show, onClick }) => {
  return (
    <StyledModal className={show ? "show" : ""}>
      <div className='overlay' onClick={onClick}></div>
      <div className='container'>{children}</div>
    </StyledModal>
  );
};

export default Modal;

import styled from "styled-components";
import { colors } from "@/constants/index";

interface PropType {
  title: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  background-color: ${colors.black};

  h1 {
    color: ${colors.white};
    text-align: center;
    letter-spacing: 1.5;
    font-size: 40px;
    font-weight: 700;
    padding: 195px 0 97px;
    text-transform: uppercase;
  }
`;

const Banner: React.FC<PropType> = ({ title, style }) => {
  return (
    <StyledBanner style={style}>
      <div className='container'>
        <h1>{title}</h1>
      </div>
    </StyledBanner>
  );
};

export default Banner;

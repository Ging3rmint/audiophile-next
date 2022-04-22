import styled from "styled-components";
import ProductCard from "@/components/molecules/ProductCard";
import ProductLink from "@/components/molecules/ProductLink";

interface PropTypes {
  products: {
    image: string;
    imageAlt: string;
    imageHeight: number;
    imageWidth: number;
    href: string;
    title: string;
  }[];
  type?: string;
  style?: {
    [propName: string]: any;
  };
}
const StyledSection = styled.section`
  h2 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 1.1;
    margin-bottom: 64px;
  }

  .cards-wrapper {
    display: flex;
    justify-content: space-between;
  }
`;

const Recommend: React.FC<PropTypes> = ({ products, type, style }) => {
  return (
    <StyledSection style={style}>
      {type === "card" && <h2>YOU MAY ALSO LIKE</h2>}
      <div className='cards-wrapper'>
        {type === "card"
          ? products.map((ele, eleIdx) => {
              return <ProductCard key={"recommend" + eleIdx} {...ele} />;
            })
          : products.map((ele, eleIdx) => {
              return <ProductLink key={"recommend" + eleIdx} {...ele} />;
            })}
      </div>
    </StyledSection>
  );
};

export default Recommend;

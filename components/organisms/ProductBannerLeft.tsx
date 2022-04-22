import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../atoms/Button";

interface PropTypes {
  image: string;
  href: string;
  title: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  border-radius: 8px;
  background-size: cover;

  .content {
    padding: 101px 95px;

    h2 {
      margin-bottom: 32px;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      line-height: 38px;
    }
  }
`;

const ProductBannerLeft: React.FC<PropTypes> = ({
  image,
  href,
  title,
  style,
}) => {
  const router = useRouter();

  return (
    <StyledBanner
      style={{
        ...style,
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat, repeat",
      }}
    >
      <div className='content'>
        <h2>{title}</h2>
        <Button
          text='SEE PRODUCT'
          className='secondary'
          onClick={() => router.push(href)}
        />
      </div>
    </StyledBanner>
  );
};

export default ProductBannerLeft;

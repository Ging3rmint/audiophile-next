import Image from "next/image";
import { colors, breakpoints } from "@/constants/index";

import styled from "styled-components";
import ArrowLink from "@/components/atoms/ArrowLink";

interface PropTypes {
  title: string;
  href: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
}

const StyledWrapper = styled.div`
  display: inline-block;
  position: relative;
  padding: 10px;
  padding-top: 60px;

  .image {
    position: absolute;
    left: 50%;
    top: -5px;
    transform: translate(-50%, 0);

    width: 180px;
  }

  .content {
    background-color: ${colors.lightGray};
    border-radius: 8px;
    text-align: center;
    padding: 116px 0 30px;
    min-width: 350px;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      min-width: 223px;
      padding: 88px 0 27px;
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
      line-height: 25px;
      margin-bottom: 5px;
    }
  }
`;

const ProductLink: React.FC<PropTypes> = ({
  title,
  href,
  image,
  imageWidth,
  imageHeight,
  imageAlt,
}) => {
  return (
    <StyledWrapper className='product-link'>
      <div className='image'>
        <Image
          layout='responsive'
          sizes={"100%"}
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
      <div className='content'>
        <h2>{title}</h2>
        <ArrowLink href={href} text='SHOP' />
      </div>
    </StyledWrapper>
  );
};

export default ProductLink;

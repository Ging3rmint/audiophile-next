import Image from "next/image";

import styled from "styled-components";
import ArrowLink from "@/components/atoms/ArrowLink";
import { colors } from "@/constants/colors";

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
  padding-top: 60px;

  .image {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
  }
  .content {
    background-color: ${colors.lightGray};
    border-radius: 8px;
    text-align: center;
    padding: 116px 0 30px;
    min-width: 350px;

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
          src={image}
          height={imageHeight}
          width={imageWidth}
          alt={imageAlt}
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

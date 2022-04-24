import { useState } from "react";
import { colors, breakpoints } from "@/constants/index";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../atoms/Button";

interface PropTypes {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    display: block;
  }

  .image {
    flex: 1 1 50%;

    img {
      border-radius: 8px;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      height: auto;
      width: 100%;
      margin-bottom: 24px;
    }
  }

  .content {
    flex: 1 1 50%;

    background-color: ${colors.lightGray};
    padding: 101px 198px 101px 95px;
    border-radius: 8px;
    margin-left: 30px;

    @media (max-width: ${breakpoints.bpTablet}px) {
      padding: 101px 41px;
      margin-left: 10px;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      margin-left: 0;
    }

    h2 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 32px;
    }
  }
`;

const ProductBanner: React.FC<PropTypes> = ({
  title,
  href,
  image,
  imageAlt,
  style,
}) => {
  const router = useRouter();
  const [imageDimension, setImageDimension] = useState({
    width: 0,
    height: 0,
  });

  const onLoadImage = (imageSize: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    setImageDimension({
      width: imageSize.naturalWidth,
      height: imageSize.naturalHeight,
    });
  };

  return (
    <StyledBanner style={style}>
      <div className='image'>
        <Image
          src={image}
          sizes={"100%"}
          layout='responsive'
          alt={imageAlt}
          width={imageDimension.width}
          height={imageDimension.height}
          onLoadingComplete={onLoadImage}
        />
      </div>
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

export default ProductBanner;

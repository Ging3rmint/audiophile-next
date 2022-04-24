import { useState } from "react";
import { breakpoints } from "@/constants/breakpoints";
import { useRouter } from "next/router";
import Image from "next/image";
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
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  .image {
    width: 100%;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 62px;
    transform: translate(0, -50%);

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      left: 24px;
    }

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
          alt='banner image'
          width={imageDimension.width}
          height={imageDimension.height}
          layout='responsive'
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

export default ProductBannerLeft;

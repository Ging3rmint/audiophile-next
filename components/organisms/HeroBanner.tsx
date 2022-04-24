import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { colors, breakpoints } from "@/constants/index";
import Button from "../atoms/Button";

interface PropTypes {
  image: string;
  description: string;
  href: string;
  title: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  position: relative;

  .image {
    max-width: 1440px;
    margin: 0 auto;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .content {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translate(0, -50%);
      width: 400px;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        left: 50% !important;
        transform: translate(-50%, -50%);
        text-align: center;
      }

      > span {
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 10px;
        color: ${colors.white};
        opacity: 0.5;
      }

      h1 {
        margin: 24px 0;
        font-size: 56px;
        line-height: 58px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: ${colors.white};

        @media (max-width: ${breakpoints.bpTablet}px) {
          font-size: 36px;
          line-height: 40px;
        }
      }

      > p {
        color: ${colors.white};
        opacity: 0.75;
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        width: 90%;
        margin-bottom: 40px;

        @media (max-width: ${breakpoints.bpTablet}px) {
          margin: 0 auto 40px;
        }
      }
    }
  }
`;

const HeroBanner: React.FC<PropTypes> = ({
  title,
  description,
  href,
  image,
  style,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

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
          objectFit='contain'
          sizes='100%'
          layout='responsive'
          src={image}
          width={imageDimension.width}
          height={imageDimension.height}
          onLoadingComplete={onLoadImage}
        />
      </div>

      <div className='container'>
        <div className='content'>
          <span>NEW PRODUCT</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <Button text='SEE PRODUCT' onClick={handleClick} />
        </div>
      </div>
    </StyledBanner>
  );
};

export default HeroBanner;

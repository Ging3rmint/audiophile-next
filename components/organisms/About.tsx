import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { colors, breakpoints } from "@/constants/index";

interface Proptypes {
  image: string;
  imageAlt: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.bpDesktop}px) {
    flex-direction: column-reverse;
  }

  .image {
    width: 50%;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      width: 100%;
    }

    img {
      border-radius: 8px;
    }
  }

  .content {
    width: 50%;
    padding: 123px 56px 0 0;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      width: 100%;
      padding-right: 0;
      padding-top: 63px;
    }

    h2 {
      width: 90%;
      font-weight: 700;
      font-size: 40px;
      line-height: 44px;
      letter-spacing: 1.5;
      margin-bottom: 32px;

      span {
        color: ${colors.darkPeach};
      }

      @media (max-width: ${breakpoints.bpDesktop}px) {
        width: 70%;
        margin: 0 auto;
        text-align: center;
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        width: 80%;
        font-size: 28px;
        line-height: 38px;
        letter-spacing: 1px;
      }
    }

    p {
      color: ${colors.black};
      opacity: 0.5;
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        width: 80%;
        margin: 0 auto;
        margin-top: 32px;
        text-align: center;
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        width: 90%;
      }
    }
  }
`;

const About: React.FC<Proptypes> = ({ image, imageAlt, style }) => {
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
    <StyledWrapper style={style}>
      <div className='content'>
        <h2>
          BRINGING YOU THE <span>BEST</span> AUDIO GEAR
        </h2>
        <p>
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <div className='image'>
        <Image
          objectFit='contain'
          layout='responsive'
          sizes='100%'
          src={image}
          alt={imageAlt}
          onLoadingComplete={onLoadImage}
          width={imageDimension.width}
          height={imageDimension.height}
        />
      </div>
    </StyledWrapper>
  );
};

export default About;

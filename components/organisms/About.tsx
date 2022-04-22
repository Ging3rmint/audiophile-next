import Image from "next/image";
import styled from "styled-components";
import { colors } from "@/constants/index";

interface Proptypes {
  image: string;
  imageAlt: string;
  imageHeight: number;
  imageWidth: number;
  style?: {
    [propName: string]: any;
  };
}

const StyledWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  .image {
    img {
      border-radius: 8px;
    }
  }

  .content {
    width: 50%;
    padding: 123px 56px 0 0;

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
    }

    p {
      color: ${colors.black};
      opacity: 0.5;
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
    }
  }
`;

const About: React.FC<Proptypes> = ({
  image,
  imageAlt,
  imageHeight,
  imageWidth,
  style,
}) => {
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
          src={image}
          alt={imageAlt}
          height={imageHeight}
          width={imageWidth}
        />
      </div>
    </StyledWrapper>
  );
};

export default About;

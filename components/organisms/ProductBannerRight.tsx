import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { colors, breakpoints } from "@/constants/index";
import Button from "../atoms/Button";

interface PropTypes {
  image: string;
  title: string;
  href: string;
  description: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  width: 100%;
  background-color: ${colors.darkPeach};
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;

  .image {
    position: absolute;
    left: 128px;
    bottom: -5px;
    width: 32%;

    @media (max-width: ${breakpoints.bpTablet}px) {
      top: 52px;
      left: 50%;
      width: 20%;
      transform: translate(-50%, 0);
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      width: 50%;
    }
  }

  .content {
    margin-left: auto;
    margin-right: 95px;
    text-align: left;
    width: 35%;
    padding: 133px 0;

    @media (max-width: ${breakpoints.bpTablet}px) {
      padding: 353px 0 64px;
      width: 45%;
      margin: 0 auto;
      text-align: center;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      margin-top: 32px;
      padding: 294px 0 64px;
      width: 70%;
    }

    h2 {
      color: ${colors.white};
      font-size: 56px;
      letter-spacing: 2px;
      line-height: 58px;
      font-weight: 700;
      margin-bottom: 24px;
      width: 80%;

      @media (max-width: ${breakpoints.bpTablet}px) {
        margin: 0 auto 24px;
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        font-size: 36px;
        letter-spacing: 1.3;
        line-height: 40px;
      }
    }

    p {
      color: ${colors.white};
      opacity: 0.75;
      line-height: 25px;
      font-weight: 500;
      font-size: 15px;
      width: 90%;
      margin-bottom: 40px;

      @media (max-width: ${breakpoints.bpTablet}px) {
        margin: 0 auto 40px;
      }
    }
  }
`;

const ProductBannerRight: React.FC<PropTypes> = ({
  title,
  description,
  href,
  image,
  imageWidth,
  imageHeight,
  imageAlt,
  style,
}) => {
  const router = useRouter();

  return (
    <StyledBanner style={style}>
      <div className='image'>
        <Image
          src={image}
          width={imageWidth}
          height={imageHeight}
          alt={imageAlt}
        />
      </div>

      <div className='content'>
        <h2>{title}</h2>
        <p>{description}</p>
        <Button
          text='SEE PRODUCT'
          className='secondary reverse'
          onClick={() => router.push(href)}
        />
      </div>
    </StyledBanner>
  );
};

export default ProductBannerRight;

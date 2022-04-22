import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { colors } from "@/constants/colors";
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
    bottom: -10px;
  }

  .content {
    margin-left: auto;
    margin-right: 95px;
    text-align: left;
    width: 35%;
    padding: 133px 0;

    h2 {
      color: ${colors.white};
      font-size: 56px;
      letter-spacing: 2px;
      line-height: 58px;
      font-weight: 700;
      margin-bottom: 24px;
    }

    p {
      color: ${colors.white};
      opacity: 0.75;
      line-height: 25px;
      font-weight: 500;
      font-size: 15px;
      width: 90%;
      margin-bottom: 40px;
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
          alt={imageAlt}
          height={imageHeight}
          width={imageWidth}
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

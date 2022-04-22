import { colors } from "@/constants/colors";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../atoms/Button";

interface PropTypes {
  title: string;
  href: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  display: flex;
  justify-content: space-between;

  .image {
    > * {
      height: 100%;
      width: 100%;
    }

    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }

  .content {
    background-color: ${colors.lightGray};
    padding: 101px 198px 101px 95px;
    border-radius: 8px;

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
          height={imageHeight}
          width={imageWidth}
          alt={imageAlt}
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

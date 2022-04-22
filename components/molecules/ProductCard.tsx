import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import Button from "@/components/atoms/Button";

interface PropType {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  href: string;
}

const StyledCard = styled.div`
  display: inline-block;
  img {
    border-radius: 8px;
  }

  .content {
    margin-top: 40px;
    text-align: center;

    span {
      display: block;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1.7;
      margin-bottom: 32px;
    }
  }
`;

const ProductCard: React.FC<PropType> = ({
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  title,
  href,
}) => {
  const router = useRouter();

  return (
    <StyledCard>
      <figure className='image'>
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      </figure>
      <div className='content'>
        <span>{title}</span>
        <Button text='SEE PRODUCT' onClick={() => router.push(href)} />
      </div>
    </StyledCard>
  );
};

export default ProductCard;

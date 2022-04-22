import { useRef } from "react";
import { colors } from "@/constants/colors";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../atoms/Button";
import StepButton from "../atoms/StepButton";

interface PropTypes {
  id?: string;
  image: string;
  imageHeight: number;
  imageWidth: number;
  imageAlt: string;
  isNew?: boolean;
  title: string;
  description: string;
  href?: string;
  direction?: string;
  cost?: number;
  addToCart?: (qty: number) => void;
  style?: {
    [propName: string]: any;
  };
}

const StyledWrapper = styled.section`
  display: flex;

  &.reverse {
    flex-direction: row-reverse;
    .content {
      padding-left: 0;
      padding-right: 125px;
    }
  }

  > * {
    flex: 1 1 100%;
  }

  .image {
    img {
      border-radius: 8px;
    }
  }

  .content {
    padding: 109px 0;
    padding-left: 125px;

    .new {
      display: block;
      margin-bottom: 16px;
      color: ${colors.darkPeach};
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 10px;
    }

    h2 {
      font-size: 40px;
      font-weight: 700;
      line-height: 44px;
      letter-spacing: 1.5;
      margin-bottom: 32px;
      text-transform: uppercase;
    }

    p {
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      opacity: 0.5;
      color: ${colors.black};
      margin-bottom: 40px;
    }

    .price {
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1.3;
    }

    .button-group {
      margin-top: 47px;

      > *:first-of-type {
        margin-right: 16px;
      }
    }
  }
`;

const ProductCTA: React.FC<PropTypes> = ({
  image,
  imageHeight,
  imageWidth,
  imageAlt,
  title,
  isNew,
  direction,
  description,
  href,
  cost,
  addToCart,
  style,
}) => {
  const router = useRouter();
  const quantity = useRef(1);

  const onQuantityChange = (qty: number) => {
    quantity.current = qty;
  };

  const handleLinkClick = () => {
    if (href) {
      router.push(href);
    }
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(quantity.current);
    }
  };

  return (
    <StyledWrapper
      style={style}
      className={direction === "reverse" ? "reverse" : ""}
    >
      <figure className='image'>
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      </figure>
      <div className='content'>
        {isNew && <span className='new'>NEW PRODUCT</span>}
        <h2>{title}</h2>
        <p>{description}</p>

        {cost ? (
          <>
            <span className='price'>$ {cost.toLocaleString()}</span>
            <div className='button-group'>
              <StepButton onChange={onQuantityChange} />
              <Button text='ADD TO CART' onClick={handleAddToCart} />
            </div>
          </>
        ) : (
          <Button text='SEE PRODUCT' onClick={handleLinkClick} />
        )}
      </div>
    </StyledWrapper>
  );
};

export default ProductCTA;

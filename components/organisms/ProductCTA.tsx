import { useRef, useState } from "react";
import { colors, breakpoints } from "@/constants/index";
import Image from "next/image";
import { useRouter } from "next/router";

import styled from "styled-components";
import Button from "../atoms/Button";
import StepButton from "../atoms/StepButton";

interface PropTypes {
  id?: string;
  image: string;
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

  &:not(.cost) {
    @media (max-width: ${breakpoints.bpDesktop}px) {
      display: block;
    }

    .image {
      @media (max-width: ${breakpoints.bpDesktop}px) {
        background-color: ${colors.lightGray};
        border-radius: 8px;

        > * {
          width: 50%;
          margin: 0 auto;
        }
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        > * {
          width: 100%;
        }
      }
    }
  }

  &.reverse {
    flex-direction: row-reverse;

    .content {
      padding-left: 0;
      padding-right: 125px;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        padding: 0;
      }
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

    @media (max-width: ${breakpoints.bpDesktop}px) {
      padding: 0;
      margin: 52px auto 0;
      text-align: center;
      width: 70%;
    }

    @media (max-width: ${breakpoints.bpTablet}px) {
      margin-top: 32px;
      width: 100%;
    }

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

      @media (max-width: ${breakpoints.bpDesktop}px) {
        width: 50%;
        margin: 0 auto 32px;
      }

      @media (max-width: ${breakpoints.bpTablet}px) {
        width: 70%;
        font-size: 28px;
        line-height: 38px;
        letter-spacing: 1;
        margin-bottom: 24px;
      }
    }

    p {
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      opacity: 0.5;
      color: ${colors.black};
      margin-bottom: 40px;

      @media (max-width: ${breakpoints.bpTablet}px) {
        margin-bottom: 24px;
      }
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

  &.cost {
    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
    }

    .content {
      @media (max-width: ${breakpoints.bpDesktop}px) {
        padding-left: 69px;
        text-align: left;
        margin: auto 0;
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        padding-left: 0;
        margin: 30px 0 0;
      }

      h2 {
        @media (max-width: ${breakpoints.bpDesktop}px) {
          width: 100%;
        }
      }
    }
  }
`;

const ProductCTA: React.FC<PropTypes> = ({
  image,
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
      className={`${direction === "reverse" ? "reverse" : ""} ${
        cost ? "cost" : ""
      }`}
    >
      <figure className='image'>
        <div>
          <Image
            objectFit='contain'
            layout='responsive'
            onLoadingComplete={onLoadImage}
            src={image}
            alt={imageAlt}
            width={imageDimension.width}
            height={imageDimension.height}
          />
        </div>
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

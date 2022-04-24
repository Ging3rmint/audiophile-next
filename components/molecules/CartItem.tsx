import Image from "next/image";
import styled from "styled-components";
import { useAppDispatch } from "hooks";
import { updateCart, removeCartItem } from "redux/cart";
import { colors, breakpoints } from "@/constants/index";

import StepButton from "@/components/atoms/StepButton";

interface PropTypes {
  image: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  slug: string;
  tag: string;
  isEdit?: boolean;
}

const StyledList = styled.li`
  display: flex;
  align-items: center;
  margin-top: 32px;
  position: relative;

  &:first-child {
    margin-top: 10px;
  }

  &:hover {
    .delete {
      display: block;
    }
  }

  .delete {
    position: absolute;
    color: ${colors.white};
    background-color: ${colors.black};
    top: -10px;
    left: 0px;
    z-index: 3;
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: none;
  }

  > img {
    border-radius: 8px;
  }

  .content {
    margin-left: 16px;
    margin-right: auto;
    min-width: 140px;

    span {
      &:first-of-type {
        font-size: 15px;
        font-weight: 700;
      }
      display: block;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      min-width: 100px;
    }
  }

  .step-button {
    button {
      padding: 7px 12px;
    }
    span {
      min-width: 30px;
    }
  }

  .qty-text {
    color: ${colors.black};
    opacity: 0.5;
    font-weight: 700;
    font-size: 15px;
  }
`;

const CartItem: React.FC<PropTypes> = ({
  image,
  name,
  price,
  quantity,
  category,
  slug,
  tag,
  isEdit,
}) => {
  const dispatch = useAppDispatch();

  const onQuantityChange = (qty: number) => {
    dispatch(
      updateCart({ image, name, price, quantity: qty, category, slug, tag })
    );
  };

  const onRemoveTargetItem = () => {
    dispatch(removeCartItem(slug));
  };

  return (
    <StyledList>
      {isEdit && (
        <button className='delete' onClick={onRemoveTargetItem}>
          X
        </button>
      )}
      <Image width={64} height={64} src={image} alt={name} />
      <div className='content'>
        <span>{tag}</span>
        <span>$ {price.toLocaleString()}</span>
      </div>
      {isEdit ? (
        <StepButton initialValue={quantity} onChange={onQuantityChange} />
      ) : (
        <span className='qty-text'>x{quantity}</span>
      )}
    </StyledList>
  );
};

export default CartItem;

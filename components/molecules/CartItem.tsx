import Image from "next/image";
import styled from "styled-components";
import { useAppDispatch } from "hooks";
import { updateCart, removeCartItem } from "redux/cart";

import StepButton from "@/components/atoms/StepButton";
import { colors } from "@/constants/colors";

interface PropTypes {
  image: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  slug: string;
  tag: string;
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
    left: -10px;
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

    span {
      &:first-of-type {
        font-size: 15px;
        font-weight: 700;
      }
      display: block;
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
`;

const CartItem: React.FC<PropTypes> = ({
  image,
  name,
  price,
  quantity,
  category,
  slug,
  tag,
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
      <button className='delete' onClick={onRemoveTargetItem}>
        X
      </button>
      <Image width={64} height={64} src={image} alt={name} />
      <div className='content'>
        <span>{tag}</span>
        <span>$ {price.toLocaleString()}</span>
      </div>
      <StepButton initialValue={quantity} onChange={onQuantityChange} />
    </StyledList>
  );
};

export default CartItem;

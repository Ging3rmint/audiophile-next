import { memo } from "react";

import styled from "styled-components";
import { colors } from "@/constants/colors";

import Button from "../atoms/Button";
import CartItem from "../molecules/CartItem";

interface PropTypes {
  cartItems: {
    quantity: number;
    name: string;
    category: string;
    slug: string;
    price: number;
    image: string;
    tag: string;
  }[];
  costs: {
    total: number;
    gst: number;
  };
  onClick?: (e?: React.FormEvent) => void;
}

const StyledAside = styled.aside`
  background-color: ${colors.white};
  padding: 32px;
  border-radius: 8px;

  .cart-button {
    width: 100%;
    margin-top: 32px;
  }

  h1 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    color: ${colors.black};
    letter-spacing: 1.3;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    span {
      color: ${colors.black};
      opacity: 0.5;
      font-size: 15px;
      font-weight: 500;

      &:last-of-type {
        opacity: 1;
        font-weight: 700;
        font-size: 18px;
      }
    }

    &:last-of-type {
      margin-top: 24px;

      span:last-of-type {
        color: ${colors.darkPeach};
      }
    }
  }
`;

const CartAside: React.FC<PropTypes> = ({ cartItems, costs, onClick }) => {
  return (
    <StyledAside className='cart-aside'>
      <h1>summary</h1>
      <ul className='cart-listing'>
        {cartItems.map((item, itemIdx) => {
          return <CartItem key={"cart" + itemIdx} {...item} />;
        })}
      </ul>
      <div className='calcuation-wrapper'>
        <div className='row'>
          <span>TOTAL</span>
          <span>$ {costs.total.toLocaleString()}</span>
        </div>
        <div className='row'>
          <span>SHIPPING</span>
          <span>$0</span>
        </div>
        <div className='row'>
          <span>GST {"(9%)"}</span>
          <span>$ {costs.gst.toLocaleString()}</span>
        </div>
        <div className='row'>
          <span>GRAND TOTAL</span>
          <span>$ {(costs.gst + costs.total).toLocaleString()}</span>
        </div>
      </div>
      <Button
        text='CONTINUE &#38; PAY'
        className='cart-button'
        onClick={onClick}
      />
    </StyledAside>
  );
};

export default memo(CartAside);

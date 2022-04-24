import { useEffect, useState } from "react";
import { colors, breakpoints } from "@/constants/index";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectCartItems, clearCart } from "redux/cart";
import { useWindowDimensions } from "../../hooks";

import styled from "styled-components";

import HamburgerButton from "../atoms/HamburgerButton";
import Icon from "../atoms/Icon";
import Button from "../atoms/Button";
import Modal from "../molecules/Modal";
import CartItem from "../molecules/CartItem";

interface PropTypes {
  pathName?: string;
  darkMode?: boolean;
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;

  &.dark {
    background-color: ${colors.offBlack};

    .container:before {
      display: none;
    }
  }

  .container {
    display: flex;
    padding: 35px 20px;
    position: relative;
    align-items: center;

    @media (max-width: ${breakpoints.bpTablet}px) {
      justify-content: space-between;
    }

    &:before {
      content: "";
      height: 1px;
      width: calc(100% - 40px);
      background-color: ${colors.white};
      position: absolute;
      top: calc(100%);
      left: 20px;
      opacity: 0.2;
    }

    nav {
      flex: 1 1 100%;

      &.mobileTablet {
        opacity: 0;
        position: fixed;
        background-color: black;
        top: 114px;
        padding: 20px;
        bottom: 0;
        left: 0;
        transform: translate(-100%, 0);
        transition: transform 0.3s ease-in-out;

        &.active {
          opacity: 1;
          transform: translate(0, 0);
        }
        > ul {
          display: block;

          li {
            margin-bottom: 20px;
          }
        }
      }
    }
  }

  .logo h1 {
    color: ${colors.white};
    font-size: 32px;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      margin-left: 42px;
    }
  }

  .cart {
    position: relative;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      margin-left: auto;
    }

    .qty-cart {
      position: absolute;
      top: -10px;
      left: -10px;
      padding: 2px 8px;
      font-size: 12px;
      border-radius: 100%;
      font-weight: 700;
      background-color: ${colors.darkPeach};
      color: ${colors.white};
    }

    > button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }

  ul:not(.cart-listing) {
    width: 100%;
    display: flex;
    justify-content: center;

    li {
      margin-right: 34px;
      position: relative;

      &.active,
      &:hover {
        &:before {
          width: 100%;
        }
      }

      &:before {
        content: "";
        height: 1px;
        background-color: ${colors.white};
        position: absolute;
        top: calc(100% + 1px);
        left: 0;
        width: 0;
        transition: all 0.3s ease-in-out;
      }

      &:last-child {
        margin-right: 0;
      }

      a {
        text-decoration: none;
        color: ${colors.white};
        letter-spacing: 2px;
        font-weight: 700;
        font-size: 13px;
      }
    }
  }
`;

const StyledModalContent = styled.div`
  background-color: ${colors.white};
  position: absolute;
  top: 30px;
  right: 20px;
  padding: 33px;
  border-radius: 8px;

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    right: 50%;
    width: 90%;
    transform: translate(50%, 0);
  }

  .top {
    display: flex;
    justify-content: space-between;

    span {
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1.3;
    }

    button {
      text-decoration: underline;
      background-color: transparent;
      border: none;
      color: ${colors.black};
      opacity: 0.5;
      font-size: 15px;
      cursor: pointer;
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    span {
      &:first-of-type {
        opacity: 0.5;
        color: ${colors.black};
        font-size: 15px;
      }
      &:last-of-type {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }

  > button {
    width: 100%;
  }
`;

const Header: React.FC<PropTypes> = ({ pathName, darkMode }) => {
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const cartItems = useAppSelector(selectCartItems);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    let initialValue = 0;

    const sum = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.price;
    }, initialValue);

    const total = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, initialValue);

    setTotalCost(sum);
    setTotalCartItem(total);
  }, [cartItems]);

  const windowDimensions = useWindowDimensions();
  const [viewMode, setViewMode] = useState("desktop");

  useEffect(() => {
    if (windowDimensions && windowDimensions.width) {
      if (
        windowDimensions.width < breakpoints.bpDesktop &&
        windowDimensions.width > breakpoints.bpLgMobile
      ) {
        setViewMode("tablet");
      } else if (windowDimensions.width < breakpoints.bpTablet) {
        setViewMode("mobile");
      } else {
        setViewMode("desktop");
      }
    }
  }, [windowDimensions]);

  const onCartClick = () => {
    setShowCart(!showCart);
  };

  const onClearCart = () => {
    dispatch(clearCart());
    setShowCart(false);
  };

  return (
    <StyledHeader className={darkMode ? "dark" : "dark"}>
      <div className='container'>
        {viewMode !== "desktop" && (
          <HamburgerButton onClick={() => setShowMobileMenu(!showMobileMenu)} />
        )}
        <div className='logo'>
          <Link href='/'>
            <a>
              <h1>audiophile</h1>
            </a>
          </Link>
        </div>
        <nav
          className={
            viewMode !== "desktop"
              ? `mobileTablet ${showMobileMenu && "active"}`
              : ""
          }
        >
          <ul>
            <li
              className={
                router.pathname === "/" || pathName === "/" ? "active" : ""
              }
            >
              <Link href='/'>HOME</Link>
            </li>
            <li
              className={
                router.pathname === "/headphones" ||
                (pathName && pathName.includes("/headphones"))
                  ? "active"
                  : ""
              }
            >
              <Link href='/headphones'>HEADPHONES</Link>
            </li>
            <li
              className={
                router.pathname === "/speakers" ||
                (pathName && pathName.includes("/speakers"))
                  ? "active"
                  : ""
              }
            >
              <Link href='/speakers'>SPEAKERS</Link>
            </li>
            <li
              className={
                router.pathname === "/earphones" ||
                (pathName && pathName.includes("/earphones"))
                  ? "active"
                  : ""
              }
            >
              <Link href='/earphones'>EARPHONES</Link>
            </li>
          </ul>
        </nav>
        <div className='cart'>
          {totalCartItem ? (
            <span className='qty-cart'>{totalCartItem}</span>
          ) : (
            ""
          )}
          <button onClick={onCartClick}>
            <Icon name='cart' size={24} color={colors.white} />
            <span className='sr-only'>Click to go to cart</span>
          </button>
          <Modal show={showCart} onClick={() => setShowCart(false)}>
            <StyledModalContent>
              <div className='top'>
                <span>CART {`(${totalCartItem})`}</span>
                <button onClick={onClearCart}>Remove all</button>
              </div>
              <ul className='cart-listing'>
                {cartItems.map((item: any, itemIdx: number) => {
                  return (
                    <CartItem key={"cart" + itemIdx} {...item} isEdit={true} />
                  );
                })}
              </ul>
              <div className='bottom'>
                <span>TOTAL</span>
                <span>$ {totalCost.toLocaleString()}</span>
              </div>
              <Button
                text='CHECKOUT'
                onClick={() => router.push("/checkout")}
              />
            </StyledModalContent>
          </Modal>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;

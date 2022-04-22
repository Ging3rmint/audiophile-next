import { colors } from "@/constants/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import Icon from "../atoms/Icon";

interface PropTypes {
  pathName?: string;
}

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  // background-color: ${colors.offBlack};

  .container {
    display: flex;
    padding: 35px 20px;
    position: relative;
    align-items: center;

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
    }
  }

  .logo h1 {
    color: ${colors.white};
    font-size: 32px;
  }

  .cart button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  ul {
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

const Header: React.FC<PropTypes> = ({ pathName }) => {
  const router = useRouter();

  return (
    <StyledHeader>
      <div className='container'>
        <div className='logo'>
          <Link href='/'>
            <a>
              <h1>audiophile</h1>
            </a>
          </Link>
        </div>
        <nav>
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
          <button>
            <Icon name='cart' size={24} color={colors.white} />
            <span className='sr-only'>Click to go to cart</span>
          </button>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;

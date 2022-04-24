import { useState, useEffect } from "react";
import { useWindowDimensions } from "hooks";
import { colors, breakpoints } from "@/constants/index";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Icon from "../atoms/Icon";

interface PropTypes {
  pathName?: string;
}

const StyledFooter = styled.footer`
  background-color: ${colors.black};
  padding: 71px 0 58px;

  @media (max-width: ${breakpoints.bpTablet}px) {
    padding: 52px 0 38px;
  }

  .container {
    position: relative;

    &:before {
      content: "";
      height: 3px;
      width: 90px;
      background-color: ${colors.darkPeach};
      position: absolute;
      top: -70px;
      left: 20px;
      z-index: 2;

      @media (max-width: ${breakpoints.bpTablet}px) {
        top: -50px;
      }
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      display: block;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      text-align: center;
    }

    h2 {
      color: ${colors.white};
      font-size: 28px;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        margin-bottom: 32px;
      }
    }

    ul {
      display: flex;

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        display: block;
      }

      li {
        margin-right: 34px;

        @media (max-width: ${breakpoints.bpLgMobile}px) {
          margin-right: 0;
          margin-bottom: 16px;
        }

        position: relative;

        &.active,
        &:hover {
          &:before {
            width: 100%;
          }
        }

        &:last-child {
          margin-right: 0;
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

        a {
          text-decoration: none;
          color: ${colors.white};
          letter-spacing: 2px;
          font-weight: 700;
          font-size: 13px;
        }
      }
    }
  }

  .middle {
    margin-top: 36px;
    display: flex;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      display: block;
    }

    p {
      color: ${colors.white};
      opacity: 0.5;
      font-size: 15px;
      font-weight: 500;
      line-height: 25px;
      width: 50%;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        width: 100%;
      }
      @media (max-width: ${breakpoints.bpLgMobile}px) {
        text-align: center;
      }
    }

    &__social-media {
      margin-top: auto;
      margin-left: auto;
      display: flex;

      a {
        color: ${colors.white};
        margin-left: 16px;
      }
    }
  }

  .bottom {
    margin-top: 56px;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
      text-align: center;

      .middle__social-media {
        justify-content: center;
        margin-top: 48px;

        > a {
          margin-right: 16px;
        }
      }
    }

    span {
      display: inline-block;
      color: ${colors.white};
      opacity: 0.5;
      font-size: 15px;
      font-weight: 700;
    }
  }
`;

const Footer: React.FC<PropTypes> = ({ pathName }) => {
  const router = useRouter();

  const windowDimensions = useWindowDimensions();
  const [viewMode, setViewMode] = useState("desktop");

  useEffect(() => {
    if (windowDimensions && windowDimensions.width) {
      if (windowDimensions.width < breakpoints.bpDesktop) {
        setViewMode("tablet");
      } else {
        setViewMode("desktop");
      }
    }
  }, [windowDimensions]);

  return (
    <StyledFooter>
      <div className='container'>
        <div className='top'>
          <div className='logo'>
            <Link href='/'>
              <a>
                <h2>audiophile</h2>
              </a>
            </Link>
          </div>
          <nav>
            <ul>
              <li className={router.pathname === "/" ? "active" : ""}>
                <Link href='/'>HOME</Link>
              </li>
              <li
                className={
                  router.pathname === "/headphones" ||
                  (pathName && pathName?.includes("/headphones"))
                    ? "active"
                    : ""
                }
              >
                <Link href='/headphones'>HEADPHONES</Link>
              </li>
              <li
                className={
                  router.pathname === "/speakers" ||
                  (pathName && pathName?.includes("/speakers"))
                    ? "active"
                    : ""
                }
              >
                <Link href='/speakers'>SPEAKERS</Link>
              </li>
              <li
                className={
                  router.pathname === "/earphones" ||
                  (pathName && pathName?.includes("/earphones"))
                    ? "active"
                    : ""
                }
              >
                <Link href='/earphones'>EARPHONES</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='middle'>
          <p>
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we&apos;re open 7 days a week.
          </p>
          {viewMode === "desktop" && (
            <div className='middle__social-media'>
              <Link href='/'>
                <a>
                  <Icon name='facebook' size={20} color={colors.white} />
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <Icon name='twitter' size={20} color={colors.white} />
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <Icon name='instagram' size={20} color={colors.white} />
                </a>
              </Link>
            </div>
          )}
        </div>
        <div className='bottom'>
          <span>Copyright 2021. All Rights Reserved</span>
          {viewMode != "desktop" && (
            <div className='middle__social-media'>
              <Link href='/'>
                <a>
                  <Icon name='facebook' size={20} color={colors.white} />
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <Icon name='twitter' size={20} color={colors.white} />
                </a>
              </Link>
              <Link href='/'>
                <a>
                  <Icon name='instagram' size={20} color={colors.white} />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;

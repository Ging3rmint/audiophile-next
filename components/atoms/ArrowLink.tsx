import Link from "next/link";
import styled from "styled-components";

import { colors } from "@/constants/index";

interface PropTypes {
  href: string;
  text?: string;
}

const StyledWrapper = styled.div`
  a {
    color: rgba(0, 0, 0, 0.5);
    text-decoration: none;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;

    &:hover {
      color: ${colors.darkPeach};
      span {
        margin-left: 12px;
      }
    }

    span {
      display: inline-block;
      transition: all 0.3s ease-in-out;
      margin-left: 10px;
      font-size: 21px;
      transform: translate(0, 2px);
      color: ${colors.darkPeach};
    }
  }
`;

const ArrowLink: React.FC<PropTypes> = ({ href, text }) => {
  return (
    <StyledWrapper>
      <Link href={href}>
        <a>
          <div>
            {text} <span>{">"}</span>
          </div>
        </a>
      </Link>
    </StyledWrapper>
  );
};

export default ArrowLink;

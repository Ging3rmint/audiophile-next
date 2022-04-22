import { useRouter } from "next/router";
import styled from "styled-components";
import { colors } from "@/constants/colors";
import Button from "../atoms/Button";

interface PropTypes {
  image: string;
  description: string;
  href: string;
  title: string;
  height: number;
  style?: {
    [propName: string]: any;
  };
}

const StyledBanner = styled.section`
  margin: 0 auto;
  background-position: center;

  .container {
    position: relative;
    height: 100%;

    .content {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translate(0, -50%);
      width: 400px;

      > span {
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 10px;
        color: ${colors.white};
        opacity: 0.5;
      }

      h1 {
        margin: 24px 0;
        font-size: 56px;
        line-height: 58px;
        letter-spacing: 2px;
        color: ${colors.white};
      }

      > p {
        color: ${colors.white};
        opacity: 0.75;
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        width: 90%;
        margin-bottom: 40px;
      }
    }
  }
`;

const HeroBanner: React.FC<PropTypes> = ({
  title,
  description,
  href,
  image,
  height,
  style,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <StyledBanner
      style={{
        ...style,
        backgroundImage: `url('${image}')`,
        backgroundRepeat: "no-repeat, repeat",
        height: height,
      }}
    >
      <div className='container'>
        <div className='content'>
          <span>NEW PRODUCT</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <Button text='SEE PRODUCT' onClick={handleClick} />
        </div>
      </div>
    </StyledBanner>
  );
};

export default HeroBanner;

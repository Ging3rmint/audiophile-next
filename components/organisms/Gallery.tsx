import Image from "next/image";
import styled from "styled-components";
import { breakpoints } from "@/constants/index";

interface PropTypes {
  images: {
    url: string;
    height: number;
    width: number;
    alt: string;
  }[];
  style?: {
    [propName: string]: any;
  };
}
const StyledGallery = styled.section`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    display: block;
  }

  img {
    border-radius: 8px;
  }

  .left {
    display: flex;
    flex-direction: column;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      padding-right: 18px;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      padding-right: 0;
    }

    .sub-gallery {
      @media (max-width: ${breakpoints.bpLgMobile}px) {
        margin-bottom: 20px;
      }
    }

    .sub-gallery:last-of-type {
      margin-top: auto;
    }
  }
`;

const Gallery: React.FC<PropTypes> = ({ images, style }) => {
  return (
    <StyledGallery style={style}>
      <div className='left'>
        {images[0] && (
          <figure className='sub-gallery'>
            <Image
              layout='responsive'
              sizes='100%'
              objectFit='cover'
              src={images[0].url}
              alt={images[0].alt}
              height={images[0].height}
              width={images[0].width}
            />
          </figure>
        )}
        {images[1] && (
          <figure className='sub-gallery'>
            <Image
              src={images[1].url}
              alt={images[1].alt}
              height={images[1].height}
              width={images[1].width}
            />
          </figure>
        )}
      </div>
      {images[2] && (
        <figure className='right'>
          <Image
            src={images[2].url}
            alt={images[2].alt}
            height={images[2].height}
            width={images[2].width}
          />
        </figure>
      )}
    </StyledGallery>
  );
};

export default Gallery;

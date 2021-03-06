import { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { useWindowDimensions } from "hooks";
import styled from "styled-components";
import { colors, breakpoints } from "@/constants/index";
import { useAppDispatch } from "hooks";
import { addCartItem } from "redux/cart";
import { useRouter } from "next/router";
import { products } from "../api/products/data";
import BaseLayout from "layouts/BaseLayout";

import ProductCTA from "@/components/organisms/ProductCTA";
import Gallery from "@/components/organisms/Gallery";
import Recommend from "@/components/organisms/Recommend";
import About from "@/components/organisms/About";

const StyledPage = styled.section`
  padding-top: 176px;

  .features {
    display: flex;
    justify-content: space-between;
    margin-bottom: 160px;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      display: block;
      margin-top: 120px;
    }

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      margin: 88px 0;
    }

    h2 {
      margin-bottom: 32px;
      font-size: 32px;
      letter-spacing: 1.1px;
    }

    .left {
      width: 60%;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        width: 100%;
      }

      p {
        white-space: pre-line;
        font-size: 15px;
        line-height: 25px;
        color: ${colors.black};
        opacity: 0.5;
      }
    }

    .right {
      width: 40%;
      padding-left: 125px;

      @media (max-width: ${breakpoints.bpDesktop}px) {
        width: 60%;
        padding: 0;
        margin-top: 120px;
        display: flex;
        justify-content: space-between;
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        width: 100%;
        display: block;
        margin-top: 88px;
      }

      ul {
        li {
          font-size: 15px;
          margin-bottom: 8px;

          span {
            color: ${colors.black};
            opacity: 0.5;

            &:first-of-type {
              margin-right: 24px;
              color: ${colors.darkPeach};
              font-weight: 700;
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;

const ProductDetailPage = ({
  category,
  slug,
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addToCart = (quantity: number) => {
    const {
      name,
      image: { mobile },
      slug,
      price,
      category,
      tag,
    } = data;

    dispatch(
      addCartItem({
        name,
        image: mobile,
        slug,
        price,
        quantity,
        category,
        tag,
      })
    );
  };

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

  return (
    <BaseLayout
      dark={true}
      pathName={`/${category}`}
      title={`audiophile | ${slug}`}
    >
      <StyledPage>
        <section className='container'>
          <button className='button-back' onClick={() => router.back()}>
            Go Back
          </button>
          <ProductCTA
            image={data.image[viewMode]}
            imageAlt={data.name}
            title={data.name}
            isNew={data.new}
            description={data.description}
            cost={data.price}
            addToCart={addToCart}
          />
          <div className='features'>
            <div className='left'>
              <h2>FEATURES</h2>
              <p className='features-description'>{data.features}</p>
            </div>
            <div className='right'>
              <h2>IN THE BOX</h2>
              <ul>
                {data.includes.map((item: any, itemIdx: number) => {
                  return (
                    <li key={itemIdx}>
                      <span>{item.quantity}x</span>
                      <span>{item.item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <Gallery
            images={[
              {
                url: data.gallery.first[viewMode],
                alt: "gallery image",
                width: 445,
                height: 280,
              },
              {
                url: data.gallery.second[viewMode],
                alt: "gallery image",
                width: 445,
                height: 280,
              },
              {
                url: data.gallery.third[viewMode],
                alt: "gallery image",
                width: 635,
                height: 592,
              },
            ]}
          />

          <Recommend
            style={
              viewMode === "mobile" ? { marginTop: 120 } : { marginTop: 160 }
            }
            type='card'
            products={[
              {
                image: data.others[0].image[viewMode],
                imageAlt: data.others[0].name,
                imageWidth: 350,
                imageHeight: 318,
                title: data.others[0].name,
                href: `/${data.others[0].category}/${data.others[0].slug}`,
              },
              {
                image: data.others[1].image[viewMode],
                imageAlt: data.others[1].name,
                imageWidth: 350,
                imageHeight: 318,
                title: data.others[1].name,
                href: `/${data.others[1].category}/${data.others[1].slug}`,
              },
              {
                image: data.others[2].image[viewMode],
                imageAlt: data.others[2].name,
                imageWidth: 350,
                imageHeight: 318,
                title: data.others[2].name,
                href: `/${data.others[2].category}/${data.others[2].slug}`,
              },
            ]}
          />
          <Recommend
            style={
              viewMode === "mobile" ? { marginTop: 120 } : { marginTop: 160 }
            }
            products={[
              {
                title: "HEADPHONES",
                href: "/headphones",
                image:
                  "/images/shared/desktop/image-category-thumbnail-headphones.png",
                imageWidth: 228,
                imageHeight: 224,
                imageAlt: "headphone",
              },
              {
                title: "SPEAKERS",
                href: "/speakers",
                image:
                  "/images/shared/desktop/image-category-thumbnail-speakers.png",
                imageWidth: 228,
                imageHeight: 224,
                imageAlt: "speaker",
              },
              {
                title: "EARPHONES",
                href: "/earphones",
                image:
                  "/images/shared/desktop/image-category-thumbnail-earphones.png",
                imageWidth: 228,
                imageHeight: 208,
                imageAlt: "earphone",
              },
            ]}
          />
          <About
            style={
              viewMode === "mobile"
                ? { marginTop: 120, marginBottom: 120 }
                : { marginTop: 160, marginBottom: 160 }
            }
            image={`/images/shared/${viewMode}/image-best-gear.jpg`}
            imageAlt='Best gear'
          />
        </section>
      </StyledPage>
    </BaseLayout>
  );
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/products`
  // );

  const paths = products.map((product: any) => {
    return { params: { category: product.category, slug: product.slug } };
  });

  return { paths, fallback: false };
};

interface StaticPropTypes {
  category: string;
  slug: string;
  data: any;
}

interface IParams extends ParsedUrlQuery {
  category: string;
  slug: string;
}

export const getStaticProps: GetStaticProps<StaticPropTypes> = async (
  context
) => {
  const { category, slug } = context.params as IParams;

  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/products/${category}/${slug}`
  // );

  const data = products.find((product) => {
    return product.category === category && product.slug === slug;
  });

  return {
    props: { category, slug, data },
    revalidate: 1,
  };
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_URL}/api/${query.category}/${query.slug}`
//   );

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { category: query.category, slug: query.slug, data },
//   };
// };

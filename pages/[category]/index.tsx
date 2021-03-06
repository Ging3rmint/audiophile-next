import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "axios";
import { breakpoints } from "@/constants/breakpoints";
import { useWindowDimensions } from "hooks";
import { products } from "../api/products/data";

import BaseLayout from "layouts/BaseLayout";
import Banner from "@/components/organisms/Banner";
import ProductCTA from "@/components/organisms/ProductCTA";
import Recommend from "@/components/organisms/Recommend";
import About from "@/components/organisms/About";

const StyledPage = styled.section``;

const ProductPage = ({
  category,
  productData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    <BaseLayout title='audiophile | product' pathName={`/${category}`}>
      <StyledPage>
        <Banner title={category} />

        <section className='container'>
          {productData.length &&
            productData
              .sort((a: any, b: any) => {
                return a.new === b.new ? 0 : a.new ? -1 : 1;
              }) //show new item first
              .map((product: any, productIdx: number) => {
                let direction = "default";
                if (productIdx % 2 === 0) {
                  direction = "reverse";
                }

                return (
                  <ProductCTA
                    key={product.slug}
                    style={
                      viewMode === "desktop"
                        ? { marginTop: 160 }
                        : viewMode === "tablet"
                        ? { marginTop: 120 }
                        : { marginTop: productIdx === 0 ? 64 : 120 }
                    }
                    image={product.image.desktop}
                    imageAlt={product.name}
                    title={product.name}
                    isNew={product.new}
                    description={product.description}
                    href={`/${category}/${product.slug}`}
                    direction={direction}
                  />
                );
              })}
          <Recommend
            style={
              viewMode === "desktop" ? { marginTop: 160 } : { marginTop: 120 }
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
              viewMode === "desktop"
                ? { marginTop: 160, marginBottom: 160 }
                : { marginTop: 120, marginBottom: 120 }
            }
            image={`/images/shared/${viewMode}/image-best-gear.jpg`}
            imageAlt='Best gear'
          />
        </section>
      </StyledPage>
    </BaseLayout>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  //this causes error when building since localhost is not available. server needs to be up during build time
  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/products`
  // );

  const paths = products.map((product: any) => {
    return { params: { category: product.category } };
  });

  return { paths, fallback: false };
};

interface StaticPropTypes {
  category: string;
  productData: any;
}

interface IParams extends ParsedUrlQuery {
  category: string;
}

export const getStaticProps: GetStaticProps<StaticPropTypes> = async (
  context
) => {
  const { category } = context.params as IParams;

  //this causes error when building since localhost is not available. server needs to be up during build time
  // const { data } = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/products/${category}`
  // );

  const productData = products.filter((product) => {
    return product.category === category;
  });

  return {
    props: { category, productData: productData },
  };
};

// export const getServerSideProps: GetServerSideProps = async ({
//   query: { category },
// }) => {
//   const { data } = await axios.get(
//     `${process.env.NEXT_PUBLIC_URL}/api/products/${category}`
//   );

//   if (data && !data.length) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { category, productData: data },
//   };
// };

import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";

import BaseLayout from "layouts/BaseLayout";
import Banner from "@/components/organisms/Banner";
import ProductCTA from "@/components/organisms/ProductCTA";
import Recommend from "@/components/organisms/Recommend";
import About from "@/components/organisms/About";

const StyledPage = styled.section`
  .container {
    padding: 0;
  }
`;

const ProductPage: NextPage = ({
  category,
  productData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
                    style={{ marginTop: 160 }}
                    image={product.image.desktop}
                    imageHeight={560}
                    imageWidth={540}
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
            style={{ marginTop: 160 }}
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
            style={{ marginTop: 160, marginBottom: 160 }}
            image='/images/shared/desktop/image-best-gear.jpg'
            imageHeight={588}
            imageWidth={540}
            imageAlt='Best gear'
          />
        </section>
      </StyledPage>
    </BaseLayout>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({
  query: { category },
}) => {
  const { data } = await axios.get(`http://localhost:3000/api/${category}`);

  if (data && !data.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category, productData: data },
  };
};

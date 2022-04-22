import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import styled from "styled-components";
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
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BaseLayout title='audiophile | product' pathName={`/${slug}`}>
      <StyledPage>
        <Banner title={slug} />

        <section className='container'>
          <ProductCTA
            style={{ marginTop: 160 }}
            image='/images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg'
            imageHeight={560}
            imageWidth={540}
            imageAlt='Best gear'
            title='XX99 MARK II HEADPHONES'
            isNew
            description='The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
            href='/'
            direction='default'
          />
          <ProductCTA
            style={{ marginTop: 160 }}
            image='/images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg'
            imageHeight={560}
            imageWidth={540}
            imageAlt='Best gear'
            title='XX99 MARK II HEADPHONES'
            description='The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
            href='/'
            direction='reverse'
          />
          <ProductCTA
            style={{ marginTop: 160 }}
            image='/images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg'
            imageHeight={560}
            imageWidth={540}
            imageAlt='Best gear'
            title='XX99 MARK II HEADPHONES'
            description='The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
            href='/'
            direction='default'
          />
          <Recommend
            style={{ marginTop: 160 }}
            products={[
              {
                title: "HEADPHONES",
                href: "/",
                image:
                  "/images/shared/desktop/image-category-thumbnail-headphones.png",
                imageWidth: 228,
                imageHeight: 224,
                imageAlt: "headphone",
              },
              {
                title: "HEADPHONES",
                href: "/",
                image:
                  "/images/shared/desktop/image-category-thumbnail-headphones.png",
                imageWidth: 228,
                imageHeight: 224,
                imageAlt: "headphone",
              },
              {
                title: "HEADPHONES",
                href: "/",
                image:
                  "/images/shared/desktop/image-category-thumbnail-headphones.png",
                imageWidth: 228,
                imageHeight: 224,
                imageAlt: "headphone",
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
  query: { slug },
}) => {
  return {
    props: { slug },
  };
};

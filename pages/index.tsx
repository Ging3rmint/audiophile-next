import type { NextPage } from "next";
import styled from "styled-components";

import BaseLayout from "layouts/BaseLayout";

import HeroBanner from "@/components/organisms/HeroBanner";
import Recommend from "@/components/organisms/Recommend";
import ProductBannerRight from "@/components/organisms/ProductBannerRight";
import ProductBannerLeft from "@/components/organisms/ProductBannerLeft";
import ProductBanner from "@/components/organisms/ProductBanner";
import About from "@/components/organisms/About";

const StyledPage = styled.section`
  .container {
    padding: 0;
  }
`;

const HomePage: NextPage = () => {
  return (
    <BaseLayout>
      <StyledPage>
        <HeroBanner
          title='XX99 Mark II
        Headphones'
          description='Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'
          image='./images/home/desktop/image-hero.jpg'
          height={729}
          href='/headphones/xx99-mark-two-headphones'
        />
        <section className='container'>
          <Recommend
            style={{ marginTop: 120 }}
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
                imageHeight: 224,
                imageAlt: "earphone",
              },
            ]}
          />
          <ProductBannerRight
            style={{ marginTop: 168 }}
            title='ZX9 SPEAKER'
            description='Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.'
            href='/speakers/zx9-speaker'
            image='/images/home/desktop/image-speaker-zx9.png'
            imageHeight={504}
            imageWidth={394}
            imageAlt='ZX9 Speaker'
          />

          <ProductBannerLeft
            style={{ marginTop: 48 }}
            title='ZX7 SPEAKER'
            href='/speakers/zx7-speaker'
            image='/images/home/desktop/image-speaker-zx7.jpg'
          />

          <ProductBanner
            style={{ marginTop: 48 }}
            title='YX1 EARPHONES'
            href='/earphones/yx1-earphones'
            image='/images/home/desktop/image-earphones-yx1.jpg'
            imageHeight={320}
            imageWidth={540}
            imageAlt='yx1-earphones'
          />

          <About
            style={{ marginTop: 200, marginBottom: 200 }}
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

export default HomePage;

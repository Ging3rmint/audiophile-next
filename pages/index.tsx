import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { breakpoints } from "../constants";
import { useWindowDimensions } from "hooks";
import styled from "styled-components";

import BaseLayout from "layouts/BaseLayout";

import HeroBanner from "@/components/organisms/HeroBanner";
import Recommend from "@/components/organisms/Recommend";
import ProductBannerRight from "@/components/organisms/ProductBannerRight";
import ProductBannerLeft from "@/components/organisms/ProductBannerLeft";
import ProductBanner from "@/components/organisms/ProductBanner";
import About from "@/components/organisms/About";

const StyledPage = styled.section`
  // .container {
  //   padding: 0 10px;
  // }
`;

const HomePage: NextPage = () => {
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
    <BaseLayout>
      <StyledPage>
        <HeroBanner
          title='XX99 Mark II
        Headphones'
          description='Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'
          image={`./images/home/${viewMode}/image-hero.jpg`}
          href='/headphones/xx99-mark-two-headphones'
        />
        <section className='container'>
          <Recommend
            style={
              viewMode === "desktop"
                ? { marginTop: 120 }
                : viewMode === "tablet"
                ? { marginTop: 96 }
                : { marginTop: 40 }
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
                imageHeight: 200,
                imageAlt: "earphone",
              },
            ]}
          />
          <ProductBannerRight
            style={
              viewMode === "desktop"
                ? { marginTop: 168 }
                : viewMode === "tablet"
                ? { marginTop: 96 }
                : { marginTop: 120 }
            }
            title='ZX9 SPEAKER'
            description='Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.'
            href='/speakers/zx9-speaker'
            image='/images/home/desktop/image-speaker-zx9.png'
            imageHeight={504}
            imageWidth={394}
            imageAlt='ZX9 Speaker'
          />

          <ProductBannerLeft
            style={
              viewMode === "desktop"
                ? { marginTop: 48 }
                : viewMode === "tablet"
                ? { marginTop: 32 }
                : { marginTop: 24 }
            }
            title='ZX7 SPEAKER'
            href='/speakers/zx7-speaker'
            image={`/images/home/${viewMode}/image-speaker-zx7.jpg`}
          />

          <ProductBanner
            style={
              viewMode === "desktop"
                ? { marginTop: 48 }
                : viewMode === "tablet"
                ? { marginTop: 32 }
                : { marginTop: 24 }
            }
            title='YX1 EARPHONES'
            href='/earphones/yx1-earphones'
            image={`/images/home/${viewMode}/image-earphones-yx1.jpg`}
            imageAlt='yx1-earphones'
          />

          <About
            style={
              viewMode === "desktop"
                ? { marginTop: 200, marginBottom: 200 }
                : viewMode === "tablet"
                ? { marginTop: 96, marginBottom: 96 }
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

export default HomePage;

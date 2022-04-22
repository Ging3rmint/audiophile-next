import { NextPage } from "next";
import Link from "next/link";
import BaseLayout from "layouts/BaseLayout";

import Button from "@/components/atoms/Button";
import InputField from "@/components/atoms/InputField";
import RadioField from "@/components/atoms/RadioField";
import StepButton from "@/components/atoms/StepButton";
import ArrowLink from "@/components/atoms/ArrowLink";

import ProductLink from "@/components/molecules/ProductLink";

import Banner from "@/components/organisms/Banner";
import HeroBanner from "@/components/organisms/HeroBanner";
import ProductBannerRight from "@/components/organisms/ProductBannerRight";
import ProductBannerLeft from "@/components/organisms/ProductBannerLeft";
import ProductBanner from "@/components/organisms/ProductBanner";
import About from "@/components/organisms/About";
import ProductCTA from "@/components/organisms/ProductCTA";
import Gallery from "@/components/organisms/Gallery";
import ProductCard from "@/components/molecules/ProductCard";
import Recommend from "@/components/organisms/Recommend";

const ModulePage: NextPage = () => {
  return (
    <BaseLayout>
      <Banner title='HEADPHONES' />
      <HeroBanner
        title='XX99 Mark II
        Headphones'
        description='Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.'
        image='./images/home/desktop/image-hero.jpg'
        height={729}
        href='/'
      />
      <div className='container'>
        <div>
          <Button>
            <Link href='/'>SEE PRODUCT</Link>
          </Button>
        </div>
        <div>
          <Button className='secondary'>
            <Link href='/'>SEE PRODUCT</Link>
          </Button>
        </div>
        <div>
          <InputField
            label='Name'
            id='nameInput'
            name='name'
            placeholder='Insert your name'
          />
        </div>
        <div>
          <InputField
            error='Wrong format'
            label='Name'
            id='nameInput'
            name='name'
            placeholder='Insert your name'
          />
        </div>
        <div>
          <RadioField label='e-Money' id='moneyRadio1' name='money' />
          <RadioField label='e-Money2' id='moneyRadio2' name='money' />
        </div>
        <div>
          <StepButton />
        </div>
        <div>
          <ArrowLink text='SHOP' href='/' />
        </div>
        <div>
          <ProductLink
            title='HEADPHONES'
            href='/'
            image='/images/shared/desktop/image-category-thumbnail-headphones.png'
            imageWidth={228}
            imageHeight={224}
            imageAlt='headphone'
          />
        </div>
        <div>
          <ProductBannerRight
            title='ZX9 SPEAKER'
            description='Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.'
            href='/'
            image='/images/home/desktop/image-speaker-zx9.png'
            imageHeight={504}
            imageWidth={394}
            imageAlt='ZX9 Speaker'
          />
        </div>
        <div>
          <ProductBannerLeft
            title='ZX9 SPEAKER'
            href='/'
            image='/images/home/desktop/image-speaker-zx7.jpg'
          />
        </div>
        <div>
          <ProductBanner
            title='YX1 EARPHONES'
            href='/'
            image='/images/home/desktop/image-earphones-yx1.jpg'
            imageHeight={320}
            imageWidth={540}
            imageAlt='ZX9 Speaker'
          />
        </div>
        <div>
          <About
            image='/images/shared/desktop/image-best-gear.jpg'
            imageHeight={588}
            imageWidth={540}
            imageAlt='Best gear'
          />
        </div>
        <div>
          <ProductCTA
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
        </div>
        <div>
          <ProductCTA
            image='/images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg'
            imageHeight={560}
            imageWidth={540}
            imageAlt='Best gear'
            title='XX99 MARK II HEADPHONES'
            isNew
            description='The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
            href='/'
            direction='reverse'
          />
        </div>
        <div>
          <ProductCTA
            image='/images/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg'
            imageHeight={560}
            imageWidth={540}
            imageAlt='Best gear'
            title='XX99 MARK II HEADPHONES'
            isNew
            description='The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.'
            href='/'
            cost={2999}
          />
        </div>
        <div>
          <Gallery
            images={[
              {
                url: "/images/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg",
                alt: "person",
                width: 445,
                height: 280,
              },
              {
                url: "/images/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg",
                alt: "phone",
                width: 445,
                height: 280,
              },
              {
                url: "/images/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg",
                alt: "headphone",
                width: 635,
                height: 592,
              },
            ]}
          />
        </div>
        <div>
          <ProductCard
            image='/images/shared/desktop/image-xx99-mark-one-headphones.jpg'
            imageAlt='xx99 mark one headphone'
            imageWidth={350}
            imageHeight={318}
            title='XX99 MARK I'
            href='/'
          />
        </div>
        <div>
          <Recommend
            type='card'
            products={[
              {
                image:
                  "/images/shared/desktop/image-xx99-mark-one-headphones.jpg",
                imageAlt: "xx99 mark one headphone",
                imageWidth: 350,
                imageHeight: 318,
                title: "XX99 MARK I",
                href: "/",
              },
              {
                image:
                  "/images/shared/desktop/image-xx99-mark-one-headphones.jpg",
                imageAlt: "xx99 mark one headphone",
                imageWidth: 350,
                imageHeight: 318,
                title: "XX99 MARK I",
                href: "/",
              },
              {
                image:
                  "/images/shared/desktop/image-xx99-mark-one-headphones.jpg",
                imageAlt: "xx99 mark one headphone",
                imageWidth: 350,
                imageHeight: 318,
                title: "XX99 MARK I",
                href: "/",
              },
            ]}
          />
        </div>
        <div>
          <Recommend
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
        </div>
      </div>
    </BaseLayout>
  );
};

export default ModulePage;

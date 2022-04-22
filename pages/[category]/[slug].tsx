import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from "next";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";
import { colors } from "@/constants/colors";
import { useAppDispatch, useAppSelector } from "hooks";
import { updateCart } from "redux/cart";

import BaseLayout from "layouts/BaseLayout";

import ProductCTA from "@/components/organisms/ProductCTA";
import Gallery from "@/components/organisms/Gallery";
import Recommend from "@/components/organisms/Recommend";
import About from "@/components/organisms/About";

const StyledPage = styled.section`
  padding-top: 176px;

  .container > a {
    margin-bottom: 56px;
    display: inline-block;
    color: ${colors.black};
    opacity: 0.5;
  }

  .features {
    display: flex;
    justify-content: space-between;
    margin-bottom: 160px;

    h2 {
      margin-bottom: 32px;
      font-size: 32px;
      letter-spacing: 1.1px;
    }

    .left {
      width: 60%;

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

const ProductDetailPage: NextPage = ({
  category,
  slug,
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

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
      updateCart({
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

  return (
    <BaseLayout
      dark={true}
      pathName={`/${category}`}
      title={`audiophile | ${slug}`}
    >
      <StyledPage>
        <section className='container'>
          <Link href={`/${category}`}>Go Back</Link>
          <ProductCTA
            image={data.image.desktop}
            imageHeight={560}
            imageWidth={540}
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
                url: data.gallery.first.desktop,
                alt: "gallery image",
                width: 445,
                height: 280,
              },
              {
                url: data.gallery.second.desktop,
                alt: "gallery image",
                width: 445,
                height: 280,
              },
              {
                url: data.gallery.third.desktop,
                alt: "gallery image",
                width: 635,
                height: 592,
              },
            ]}
          />

          <Recommend
            style={{ marginTop: 160 }}
            type='card'
            products={[
              {
                image: data.others[0].image.desktop,
                imageAlt: data.others[0].name,
                imageWidth: 350,
                imageHeight: 318,
                title: data.others[0].name,
                href: `/${data.others[0].category}/${data.others[0].slug}`,
              },
              {
                image: data.others[1].image.desktop,
                imageAlt: data.others[1].name,
                imageWidth: 350,
                imageHeight: 318,
                title: data.others[1].name,
                href: `/${data.others[1].category}/${data.others[1].slug}`,
              },
              {
                image: data.others[2].image.desktop,
                imageAlt: data.others[2].name,
                imageWidth: 350,
                imageHeight: 318,
                title: data.others[2].name,
                href: `/${data.others[2].category}/${data.others[2].slug}`,
              },
            ]}
          />
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

export default ProductDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/${query.category}/${query.slug}`
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category: query.category, slug: query.slug, data },
  };
};

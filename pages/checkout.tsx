import type { NextPage } from "next";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";
import { useAppSelector, useForm } from "hooks";
import { selectCartItems } from "redux/cart";
import styled from "styled-components";
import { colors, breakpoints } from "../constants";
import { validateEmail } from "utils/validation";
import BaseLayout from "layouts/BaseLayout";

import Modal from "@/components/molecules/Modal";
import CheckoutForm from "@/components/organisms/CheckoutForm";
import CartAside from "@/components/organisms/CartAside";
import Button from "@/components/atoms/Button";
import Image from "next/image";

interface FormValueTypes {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMode: string;
  eMoneyNumber: string;
  eMoneyPin: string;
  [propName: string]: any;
}

const StyledPage = styled.section`
  background-color: ${colors.lightGray};
  padding: 200px 0 142px;

  .form-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @media (max-width: ${breakpoints.bpDesktop}px) {
      display: block;

      > * {
        &:first-of-type {
          max-width: 100%;
          margin: 0;
          margin-bottom: 32px;
          width: 100%;
        }
      }
    }
  }
`;

const StyledModalContent = styled.div`
  background-color: ${colors.white};
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 48px;
  border-radius: 8px;

  @media (max-width: ${breakpoints.bpDesktop}px) {
    width: 60%;
  }

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    width: 90%;
    padding: 32px;
  }

  .checkmark-icon {
    font-size: 32px;
    color: ${colors.white};
    background-color: ${colors.darkPeach};
    padding: 15px 25px;
    border-radius: 100%;
    display: inline-block;
    margin-bottom: 33px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      margin-bottom: 23px;
    }
  }

  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 32px;
    width: 60%;
    line-height: 36px;
    color: ${colors.black};
    margin-bottom: 24px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      width: 100%;
      font-size: 24px;
      margin-bottom: 16px;
    }
  }

  p {
    opacity: 0.5;
    color: ${colors.black};
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 33px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      margin-bottom: 23px;
    }
  }

  .item-card {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 46px;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
      margin-bottom: 23px;
    }

    &__left {
      width: 55%;
      background-color: ${colors.lightGray};
      padding: 24px;

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        width: 100%;
      }

      .other {
        margin-top: 12px;
        text-align: center;
        font-size: 12px;
        font-height: 16px;
        font-weight: 700;
        color: ${colors.black};
        opacity: 0.5;
        padding-top: 12px;
        border-top: 1px solid rgba(0, 0, 0, 0.3);
      }
    }

    &__right {
      width: 45%;
      background-color: ${colors.black};
      padding: 41px 32px;
      color: ${colors.white};

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        width: 100%;
        padding: 15px 24px;
      }

      > span {
        display: block;
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;

        &:first-of-type {
          margin-bottom: 8px;
          opacity: 0.5;
          font-size: 15px;
          font-weight: 500;
        }
      }
    }
  }

  .product-card {
    display: flex;

    .image {
      width: 60px;
      height: 60px;
    }

    &__content {
      // margin-left: 16px;

      span {
        display: block;
        color: ${colors.black};
        opacity: 0.5;
        font-size: 14px;
        font-weight: 700;
        line-height: 25px;

        &:first-of-type {
          font-size: 15px;
          text-transform: uppercase;
          opacity: 1;
        }
      }
    }

    > span {
      font-weight: 700;
      font-size: 15px;
      color: ${colors.black};
      opacity: 0.5;
      margin-left: auto;
    }
  }

  .btn-home {
    width: 100%;
  }
`;

const GST = 0.09;

const computeTotalCost = (cartItems: any[]) => {
  let initialValue = 0;

  return cartItems.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.price;
  }, initialValue);
};

const CheckoutPage: NextPage = () => {
  const [isShowModal, setShowModal] = useState(false);
  const [formData, handleChange, handleSubmit, formErrors] = useForm({
    initialValue: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      paymentMode: "e-Money",
      eMoneyNumber: "",
      eMoneyPin: "",
    },
    onSubmit: () => setShowModal(true),
    validations: {
      name: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
      },
      email: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
        pattern: {
          value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          message: "Invalid email address",
        },
      },
      phoneNumber: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
      },
      address: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
      },
      zipCode: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
      },
      city: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
      },
      country: {
        required: {
          value: true,
          message: "Field cannot be empty",
        },
      },
      eMoneyNumber: {
        dependent: {
          key: "paymentMode",
          isValid: (dependentValue: string, value: string) => {
            return dependentValue !== "e-Money" || value.length;
          },
          message: "Field cannot be empty",
        },
      },
      eMoneyPin: {
        dependent: {
          key: "paymentMode",
          isValid: (dependentValue: string, value: string) => {
            return dependentValue !== "e-Money" || value.length;
          },
          message: "Field cannot be empty",
        },
      },
    },
  });

  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const sum = useMemo<number>(() => computeTotalCost(cartItems), [cartItems]);

  useLayoutEffect(() => {
    if (!cartItems.length) {
      router.push("/");
    }
  }, []);

  return (
    <BaseLayout>
      <StyledPage>
        <section className='container'>
          <button className='button-back' onClick={() => router.back()}>
            Go Back
          </button>
          <section className='form-wrapper'>
            <CheckoutForm
              formValues={formData}
              formErrors={formErrors}
              onChange={handleChange}
            />
            <CartAside
              cartItems={cartItems}
              costs={{ total: sum, gst: sum * GST }}
              onClick={handleSubmit}
            />
          </section>
        </section>
      </StyledPage>
      {cartItems.length ? (
        <Modal show={isShowModal}>
          <StyledModalContent>
            <div>
              <span className='checkmark-icon'>&#10004;</span>
            </div>
            <h2>Thank you for your order</h2>
            <p>You will receive an email confirmation shortly.</p>
            <div className='item-card'>
              <div className='item-card__left'>
                <div className='product-card'>
                  <div className='image'>
                    <Image
                      objectFit='contain'
                      layout='responsive'
                      src={cartItems[0].image}
                      width={50}
                      height={50}
                      alt='cart item'
                    />
                  </div>

                  <div className='product-card__content'>
                    <span>{cartItems[0].name}</span>
                    <span>$ {cartItems[0].price.toLocaleString()}</span>
                  </div>
                  <span>x{cartItems[0].quantity}</span>
                </div>
                {cartItems.length ? (
                  <div className='other'>
                    <span>
                      and {cartItems.length - 1} other item{"(s)"}{" "}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className='item-card__right'>
                <span>GRAND TOTAL</span>
                <span>$ {(sum + GST * sum).toLocaleString()}</span>
              </div>
            </div>
            <Button
              className='btn-home'
              text='BACK TO HOME'
              onClick={() => router.push("/")}
            />
          </StyledModalContent>
        </Modal>
      ) : (
        ""
      )}
    </BaseLayout>
  );
};

export default CheckoutPage;

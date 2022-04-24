import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks";
import { selectCartItems } from "redux/cart";
import styled from "styled-components";
import { colors } from "../constants";
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

  .checkmark-icon {
    font-size: 32px;
    color: ${colors.white};
    background-color: ${colors.darkPeach};
    padding: 15px 25px;
    border-radius: 100%;
    display: inline-block;
    margin-bottom: 33px;
  }

  h2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 32px;
    width: 60%;
    line-height: 36px;
    color: ${colors.black};
    margin-bottom: 24px;
  }

  p {
    opacity: 0.5;
    color: ${colors.black};
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 33px;
  }

  .item-card {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 46px;

    &__left {
      width: 55%;
      background-color: ${colors.lightGray};
      padding: 24px;

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

    &__content {
      margin-left: 16px;

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

const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);
  const [isShowModal, setShowModal] = useState(false);

  const [costs, setCosts] = useState({
    total: 0,
    gst: 0,
  });

  const [formValues, setFormValues] = useState({
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
  });

  const [formErrors, setFormErrors] = useState({
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
  });

  useEffect(() => {
    if (cartItems.length) {
      let initialValue = 0;

      const sum = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity * item.price;
      }, initialValue);

      const gst = sum * 0.09;

      setCosts({
        total: sum,
        gst,
      });
    } else {
      router.push("/");
    }
  }, [cartItems]);

  const formValidation = (formValues: FormValueTypes, callback: any) => {
    let isValid = true;
    const newFormErrors: FormValueTypes = { ...formErrors };

    Object.keys(formValues).forEach((key, idx) => {
      switch (key) {
        case "email":
          isValid = validateEmail(formValues[key]);
          if (!isValid) {
            newFormErrors[key] = "Invalid email address";
          } else {
            newFormErrors[key] = "";
          }
          break;
        case "eMoneyNumber":
        case "eMoneyPin":
          if (formValues.paymentMode === "e-Money" && formValues[key] === "") {
            newFormErrors[key] = "Field cannot be empty";
            isValid = false;
          } else {
            newFormErrors[key] = "";
          }
          break;
        default:
          if (formValues[key] === "") {
            newFormErrors[key] = "Field cannot be empty";
            isValid = false;
          } else {
            newFormErrors[key] = "";
          }
          break;
      }
    });

    if (isValid) {
      callback();
    } else {
      setFormErrors(newFormErrors);
    }
  };

  const onFormValueChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onPaymentClick = () => {
    console.log(formValues.paymentMode);
    formValidation(formValues, () => {
      setShowModal(true);
    });
  };

  return (
    <BaseLayout>
      <StyledPage>
        <section className='container'>
          <button className='button-back' onClick={() => router.back()}>
            Go Back
          </button>
          <section className='form-wrapper'>
            <CheckoutForm
              formValues={formValues}
              formErrors={formErrors}
              onChange={onFormValueChange}
            />
            <CartAside
              cartItems={cartItems}
              costs={costs}
              onClick={onPaymentClick}
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
                  <Image
                    src={cartItems[0].image}
                    width={50}
                    height={50}
                    alt='cart item'
                  />
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
                <span>$ {(costs.total + costs.gst).toLocaleString()}</span>
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

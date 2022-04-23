import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "hooks";
import { selectCartItems } from "redux/cart";
import styled from "styled-components";
import { colors } from "../constants";
import BaseLayout from "layouts/BaseLayout";

import CheckoutForm from "@/components/organisms/CheckoutForm";
import CartAside from "@/components/organisms/CartAside";

const StyledPage = styled.section`
  background-color: ${colors.lightGray};
  padding: 200px 0 142px;

  .form-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;
const CheckoutPage: NextPage = () => {
  const router = useRouter();
  const cartItems = useAppSelector(selectCartItems);

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
    paymentMode: "",
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  useEffect(() => {
    let initialValue = 0;

    const sum = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity * item.price;
    }, initialValue);

    const gst = sum * 0.09;

    setCosts({
      total: sum,
      gst,
    });
  }, [cartItems]);

  const onFormValueChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
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
              onChange={onFormValueChange}
            />
            <CartAside cartItems={cartItems} costs={costs} />
          </section>
        </section>
      </StyledPage>
    </BaseLayout>
  );
};

export default CheckoutPage;

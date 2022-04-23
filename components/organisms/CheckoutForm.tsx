import { memo } from "react";
import styled from "styled-components";
import { colors } from "@/constants/index";

import RadioField from "../atoms/RadioField";
import InputField from "../atoms/InputField";

interface FormValueTypes {
  formValues: {
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
  };
  onChange: (key: string, value: string) => void;
}

const StyledForm = styled.form`
  background-color: ${colors.white};
  padding: 57px 48px;
  border-radius: 8px;

  section > span {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.2;
    color: ${colors.black};
    margin-top: 16px;
    display: block;
  }

  h1,
  h2 {
    text-transform: uppercase;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 1.15;
    color: ${colors.black};
    margin-bottom: 41px;
  }

  h2 {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.9;
    color: ${colors.darkPeach};
  }

  .input-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;

    .input-field {
      width: 49%;
      margin-bottom: 24px;

      &:last-of-type {
        display: block;
      }
    }

    &--full {
      margin-top: 16px;

      .input-field {
        width: 100%;
        display: block;
      }
    }

    &--align-right {
      .radio-field {
        width: 49%;
        display: block;
        margin-left: auto;
        margin-top: 16px;
      }
    }
  }
`;

const CheckoutForm: React.FC<FormValueTypes> = ({ formValues, onChange }) => {
  const onFormValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = event.target.value;
    onChange(key, value);
  };

  return (
    <StyledForm className='checkout-form'>
      <h1>Checkout</h1>
      <section>
        <h2>Billing Details</h2>
        <div className='input-wrapper'>
          <InputField
            name='name'
            label='Name'
            id='name'
            placeholder='John Doe'
            value={formValues.name}
            onChange={(e) => onFormValueChange(e, "name")}
          />
          <InputField
            name='email'
            label='Email Address'
            id='email'
            placeholder='JohnDoe@gmail.com'
            type='email'
            value={formValues.email}
            onChange={(e) => onFormValueChange(e, "email")}
          />
          <InputField
            name='phoneNumber'
            label='Phone Number'
            id='phoneNumber'
            placeholder='+6591234567'
            value={formValues.phoneNumber}
            onChange={(e) => onFormValueChange(e, "phoneNumber")}
          />
        </div>
      </section>
      <section>
        <h2>Shipping Info</h2>
        <div className='input-wrapper--full'>
          <InputField
            name='address'
            label='Address'
            id='address'
            placeholder='Block 105 Bedok Reservior Rd #10-22'
            value={formValues.address}
            onChange={(e) => onFormValueChange(e, "address")}
          />
        </div>
        <div className='input-wrapper'>
          <InputField
            name='zipCode'
            label='Zip Code / Postal Code'
            id='zipCode'
            placeholder='110331'
            value={formValues.zipCode}
            onChange={(e) => onFormValueChange(e, "zipCode")}
          />
          <InputField
            name='city'
            label='City'
            id='city'
            placeholder='Singapore'
            value={formValues.city}
            onChange={(e) => onFormValueChange(e, "city")}
          />
          <InputField
            name='country'
            label='Country'
            id='country'
            placeholder='Singapore'
            value={formValues.country}
            onChange={(e) => onFormValueChange(e, "country")}
          />
        </div>
      </section>
      <section>
        <h2>Payment Details</h2>
        <span>Payment Method</span>
        <div className='input-wrapper--align-right'>
          <RadioField
            name='paymentMode'
            label='e-Money'
            id='eMoney'
            value='e-Money'
            onChange={(value) => onChange("paymentMode", value)}
          />
          <RadioField
            name='paymentMode'
            label='Cash on Delivery'
            id='cashOnDelivery'
            value='Cash on Delivery'
            onChange={(value) => onChange("paymentMode", value)}
          />
        </div>
        <div className='input-wrapper'>
          <InputField
            name='eMoneyNumber'
            label='e-Money Number'
            id='eMoneyNumber'
            placeholder='238521993'
            value={formValues.eMoneyNumber}
            onChange={(e) => onFormValueChange(e, "eMoneyNumber")}
          />
          <InputField
            name='eMoneyPin'
            label='e-Money Pin'
            id='eMoneyPin'
            placeholder='6981'
            value={formValues.eMoneyPin}
            onChange={(e) => onFormValueChange(e, "eMoneyPin")}
          />
        </div>
      </section>
    </StyledForm>
  );
};

export default memo(CheckoutForm);

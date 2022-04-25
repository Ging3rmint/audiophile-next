import { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.outerWidth : null;
    const height = hasWindow ? window.outerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export const useForm = (options: {
  validations?: any;
  [propName: string]: any;
}) => {
  const [formData, setFormData] = useState(options?.initialValue || {});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (key: string, value: string) => {
    setFormErrors({ ...formErrors, [key]: "" });
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleValidation = () => {
    let valid = true;
    const newErrors: { [propName: string]: string } = {};

    for (const key in options.validations) {
      const value = formData[key];
      const validation = options.validations[key];

      //REQUIRED FIELD
      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      }

      //REGEX PATTERN
      const pattern = validation?.pattern;
      if (pattern?.value && !RegExp(pattern.value).test(value)) {
        valid = false;
        newErrors[key] = pattern.message;
      }

      //CUSTOM VALIDATION
      const custom = validation?.custom;
      if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        newErrors[key] = custom.message;
      }

      //DEPENDENT VALIDATION
      const dependent = validation?.dependent;
      if (
        dependent?.isValid &&
        dependent?.key &&
        formData[dependent.key] &&
        !dependent.isValid(formData[dependent.key], value)
      ) {
        valid = false;
        newErrors[key] = dependent.message;
      }
    }

    if (!valid) {
      setFormErrors(newErrors);
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (options?.validations && handleValidation()) {
      return;
    }

    setFormErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return [formData, handleChange, handleSubmit, formErrors];
};

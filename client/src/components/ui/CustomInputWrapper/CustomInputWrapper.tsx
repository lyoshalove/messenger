import React from "react";
import { CustomInput } from "../CustomInput/CustomInput";
import "./styles.sass";

interface IProps {
  children?: React.ReactElement;
  labelText: string;
  errorMessage: string;
  type?: string;
  className?: string;
  placeholder?: string;
}

export const CustomInputWrapper = React.forwardRef(
  ({ labelText, children, errorMessage, ...props }: IProps, ref: any) => {
    return (
      <label className="label">
        <span className="label__text">{labelText}</span>
        {children}
        <CustomInput ref={ref} {...props} />
        {errorMessage && <span className="label__error">{errorMessage}</span>}
      </label>
    );
  }
);

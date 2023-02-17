import React from "react";
import "./styles.sass";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const CustomInput = React.forwardRef(({ ...props }: IProps, ref: any) => {
  return <input ref={ref} {...props} />;
});

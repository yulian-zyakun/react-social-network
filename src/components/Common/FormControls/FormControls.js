import React from "react";
import { Field } from "redux-form";
import styles from "./FormControls.module.css";

const FormControl = ({ input, meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, ...otherProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...otherProps} />
    </FormControl>
  );
};

export const createField = (
  name,
  placeholder,
  validators,
  component,
  type = "",
  text = ""
) => {
  return (
    <div>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        component={component}
        validate={validators}
      />
      {text}
    </div>
  );
};

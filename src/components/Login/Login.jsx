import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { required } from "../../Utils/Validators/validators";
import { createField, Input } from "../Common/FormControls/FormControls";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from "../Common/FormControls/FormControls.module.css";

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", "Email", [required], Input, "text")}
      {createField("password", "Password", [required], Input, "password")}
      {createField("rememberMe", null, [], Input, "checkbox")}
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        createField("captcha", "Captcha", [required], Input, "text")}
      {error && <div className={styles.formError}>{error}</div>}
      <div>
        <button>Log in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { userStore } from "../stores";

const LoginBackground = styled.div`
  height: 100vh;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.6)
    ),
    ${() => `url(${process.env.PUBLIC_URL}/assets/login_background.jpg)`};

  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: end;
`;

const LoginFormBox = styled.form`
  height: 608px;
  width: 450px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 15px;
  border-radius: 5px;
`;

const Description = styled.div`
  width: 100%;
  font-size: 32px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 20px;
`;
const LoginForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    font-size: 16px;
    padding: 15px;
    width: 100%;
    height: 56px;
    border: 1.5px solid rgb(93, 93, 93);
    border-radius: 5px;
    outline: none;
    background: none;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    &:focus {
      border: 2px solid rgb(93, 93, 93);
      outline: 2px solid white;
    }
  }
`;

const EmailInput = styled.input``;
const PasswordInput = styled.input``;

const SignIn = styled.button`
  color: white;
  font-size: 16px;
  background-color: #e50814;
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
`;
const SignInCode = styled.div`
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
`;
const ForgotPassword = styled.div`
  color: white;
  cursor: pointer;
`;
const RememberUserCheckBox = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const CheckboxInput = styled.input`
  width: 15px;
  height: 15px;
  accent-color: #d3d3d3;
  border: 1px solid #a1a1a1;
`;

const SignupLinkBox = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  font-size: 16px;
`;
const LinkToSignup = styled.span`
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

const NoticeReCAPTCHA = styled.div`
  font-size: 13px;
`;
const LearnMore = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: #0071eb;
`;

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const history = useHistory();
  const setLogin = userStore((state) => state.setLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<IForm>({});

  const onSiginIn = () => {
    const phone = getValues("email");
    const password = getValues("password");
    if (phone === "010-1234-1234" && password === "12341234") {
      setLogin();
      history.push("/");
    }
  };
  const onValid = (data: IForm) => {
    if (data.email !== "010-1234-1234") {
      setError(
        "email",
        { message: "Please Input 010-1234-1234" },
        { shouldFocus: true }
      );
    }
    if (data.password !== "12341234") {
      setError(
        "password",
        { message: "Please Input 12341234" },
        { shouldFocus: true }
      );
    }
  };
  return (
    <LoginBackground>
      <LoginFormBox onSubmit={handleSubmit(onValid)}>
        <Description>Sign In</Description>
        <LoginForm>
          <EmailInput
            {...register("email", {
              required: "Email or phone number is required",
              validate: {
                notValidPhone: (value) =>
                  value !== "010-1234-1234"
                    ? "Please Input 010-1234-1234"
                    : true,
              },
            })}
            type="text"
            placeholder="Email or phone number"
          />

          <span style={{ fontSize: 12, color: "#c51821", fontWeight: 500 }}>
            {errors.email?.message}
          </span>
          <PasswordInput
            {...register("password", {
              required: "Password is required",
              validate: {
                notValidPhone: (value) =>
                  value !== "12341234" ? "Please Input 12341234" : true,
              },
            })}
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
          />
          <span style={{ fontSize: 12, color: "#c51821", fontWeight: 500 }}>
            {errors.password?.message}
          </span>
        </LoginForm>
        <SignIn onClick={onSiginIn}>Sign In</SignIn>
        <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>OR</span>
        <SignInCode>Use a Sign-In Code</SignInCode>
        <ForgotPassword>Forgot Password?</ForgotPassword>
        <RememberUserCheckBox>
          <CheckboxInput type="checkbox" />
          <span>Remember me</span>
        </RememberUserCheckBox>
        <SignupLinkBox>
          <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
            New to Netflix?{" "}
          </span>
          <LinkToSignup>Sign up now.</LinkToSignup>
        </SignupLinkBox>
        <NoticeReCAPTCHA>
          <span style={{ color: "#808080" }}>
            This page is protected by Google reCAPTCHA to ensure you’re not a
            bot.{" "}
          </span>
          <LearnMore>Learn more.</LearnMore>
        </NoticeReCAPTCHA>
      </LoginFormBox>
    </LoginBackground>
  );
};

export default Login;

import {
  PageContainer,
  Container,
  Form,
  InputContainer,
  Label,
  InputField,
  Button,
  TitleContainer,
  SignUpBtn,
  Link,
} from "./signin.style";
import { ChangeEvent, useState } from "react";
import { SigninInput } from "@developer-crex/common-validation";
import axios from "axios";
import { Server_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { authAtom } from "../../store/atoms/authAtom";
import { useSetRecoilState } from "recoil";
const Signin = () => {
  const [signinData, setSigninData] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const setAuth = useSetRecoilState(authAtom);

  const navigate = useNavigate();

  const sendRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Server_URL}/api/v1/user/signin`,
        signinData
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      setAuth(true);
      navigate("/blogs");
    } catch (e) {
      alert("Error signing in");
    }
  };

  return (
    <>
      <PageContainer>
        <Container>
          <TitleContainer>
            <h2 className="text-xl font-semibold">Login</h2>
            <p>Welcome Back Mate 🚀</p>
          </TitleContainer>
          <Form onSubmit={sendRequest}>
            <LabelledInput
              label="Email"
              placeholder="E.g. johndoe@gmail.com"
              value={signinData.email}
              onChange={(e) =>
                setSigninData({
                  ...signinData,
                  email: e.target.value,
                })
              }
              inputType="text"
            />

            <LabelledInput
              label="Password"
              placeholder="Enter your password"
              value={signinData.password}
              onChange={(e) =>
                setSigninData({
                  ...signinData,
                  password: e.target.value,
                })
              }
              inputType="password"
            />
            <Button type="submit">Signin</Button>
          </Form>
          <SignUpBtn>
            Don't have an account <Link href="/signup">Signup &#8599;</Link>
          </SignUpBtn>
        </Container>
      </PageContainer>
    </>
  );
};

export default Signin;

interface LabelledInputType {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType: "text" | "password";
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  value,
  inputType,
}: LabelledInputType) => {
  return (
    <InputContainer>
      <Label className="font-medium">{label}</Label>
      <InputField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={inputType}
      />
    </InputContainer>
  );
};

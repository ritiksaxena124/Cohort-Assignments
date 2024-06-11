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
} from "./signup.style";
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@developer-crex/common-validation";
import axios from "axios";
import { Server_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const sendRequest = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Server_URL}/api/v1/user/signup`,
        signupData
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/signin");
    } catch (e) {
      alert("Error signing up");
    }
  };

  return (
    <>
      <PageContainer>
        <Container>
          <TitleContainer>
            <h2 className="text-xl font-semibold	">Create an account</h2>
            <p>Start your journey with us👋</p>
          </TitleContainer>
          <Form onSubmit={sendRequest}>
            <LabelledInput
              label="First Name"
              placeholder="John"
              value={signupData.firstName}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  firstName: e.target.value,
                })
              }
              inputType="text"
            />

            <LabelledInput
              label="Last Name"
              placeholder="Doe"
              value={signupData.lastName || ""}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  lastName: e.target.value,
                })
              }
              inputType="text"
            />

            <LabelledInput
              label="Email"
              placeholder="E.g. johndoe@gmail.com"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                })
              }
              inputType="text"
            />

            <LabelledInput
              label="Password"
              placeholder="Enter your password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                })
              }
              inputType="password"
            />
            <Button type="submit">Create my account</Button>
          </Form>
          <SignUpBtn>
            Already have an account? <Link href="/login">Signin &#8599;</Link>
          </SignUpBtn>
        </Container>
      </PageContainer>
    </>
  );
};

export default Signup;

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

import React, { useState } from "react";


import FormInput from "./form-input";
import CustomButton from "./custom-button";

const SignUp = () => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(`Passwords don't match`);
      return;
    }
    // try {
    //   // Create user
    //   // const { user } = await auth.createUserWithEmailAndPassword(
    //   //   email,
    //   //   password
    //   );

    //   await createUserProfileDocument(user, { displayName });
    //   userCredentials({
    //     displayName: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    userCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          label="Display Name"
          handleChange={handleChange}
          value={displayName}
          required
        />
        <FormInput
          name="email"
          type="email"
          label="E-mail"
          handleChange={handleChange}
          value={email}
          required
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          handleChange={handleChange}
          value={password}
          required
        />
        <FormInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          handleChange={handleChange}
          value={confirmPassword}
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;

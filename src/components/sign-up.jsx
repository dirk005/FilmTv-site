import React, { useState } from "react";

import FormInput from "./form-input";
import CustomButton from "./custom-button";

import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.actions";

const SignUp = ({ setCurrentUser }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = (event) => {
    let url = 'https://floating-journey-19460.herokuapp.com/';
      if (process.env.NODE_ENV === 'development'){
        url = 'http://localhost:8080'
    }
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(`Passwords don't match`);
      return;
    }
    fetch(`${url}/user/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name: displayName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return fetch(`${url}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser({
          id: data.userId,
          token: data.token,
          email: data.userData.email,
          name: data.userData.name,
        });
        setCredentials({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(null, mapDispatchToProps)(SignUp);

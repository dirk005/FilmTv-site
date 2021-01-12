import React, {  useState } from "react";


import FormInput from "./form-input";
import CustomButton from "./custom-button";



const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit =  (event) => {
    event.preventDefault();
        
      fetch(`http://localhost:8080/user/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
          password:password
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
      setCredentials({ email: "", password: "" });
    
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2  className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
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
          value={password}
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>          
        </div>
      </form>
    </div>
  );
};

export default SignIn;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
 
const SignUpForm = ({handleUserStatus, userStatus}) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (JSON.stringify(password) != JSON.stringify(confirmPassword)) {
      alert("Password do not match");
      return;
    }

    try {
      dispatch(
        signUpStart(
          email.toString(),
          password.toString(),
          displayName.toString()
        )
      );
      resetFormFields();
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("User creation encountered an error ", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: [value] });
  };

  return (
    <div className="sign-up-container">
     
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
        <h3>Already have an account</h3>
        <span onClick={handleUserStatus} style={{cursor: 'pointer'}}>
            <u>Log In with your email and password</u>
        </span>
      </form>
    </div>
  );
};

export default SignUpForm;

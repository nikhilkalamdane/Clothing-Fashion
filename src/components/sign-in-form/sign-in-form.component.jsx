import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input/form-input.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import "./sign-in-form.styles.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = ({handleUserStatus, userStatus}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const currentUser = useSelector(selectCurrentUser);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
 
  useEffect(() => {
    if(currentUser){
      navigate("/shop");
    }
  },[currentUser]);


  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email.toString(), password.toString()));
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </div>

        <div>
          <h3>Don't have an account</h3>
          <span onClick={handleUserStatus} style={{cursor: 'pointer'}}>
              <u>Create account with your email and password</u>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";
import { useState } from "react";
const Authentication = () => {
  const [userStatus, setUserStatus] = useState(false);

  const handleUserStatus = async (event) => {
    await setUserStatus(!userStatus);
  }

  return (
    <div className="authentication-container">
      {userStatus ? 
      <SignUpForm userStatus={userStatus} handleUserStatus={handleUserStatus}/> : 
      <SignInForm userStatus={userStatus} handleUserStatus={handleUserStatus}/>}
      
      
    </div>
  );
};

export default Authentication;

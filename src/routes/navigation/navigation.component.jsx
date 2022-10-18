import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import mainLogo from'../../assets/clothingFashion.png';
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinksContaier,
} from "./navigation.styles";

import {
  removeAllItemFromCart
} from "../../store/cart/cart.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => {
    dispatch(signOutStart());
    dispatch(removeAllItemFromCart());
    navigate("/");
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          {/* <CrwnLogo className="logo" /> */}
          <img src={mainLogo}/>
        </LogoContainer>
        <NavLinksContaier>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContaier>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;

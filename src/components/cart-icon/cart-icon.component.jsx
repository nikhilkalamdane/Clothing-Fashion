import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const currentUser = useSelector(selectCurrentUser);


  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      {
        currentUser ?
        (<ItemCount>{cartCount}</ItemCount>):
        (<ItemCount>0</ItemCount>)
      }   
        
    </CartIconContainer>
  );
};

export default CartIcon;

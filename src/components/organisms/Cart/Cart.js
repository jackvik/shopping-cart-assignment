import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom"
import CartItem from '../../molecules/CartItem/CartItem';
import LowestPrice from "../../../images/lowest-price.png";
import './Cart.scss';

const Cart = React.memo(({ showCart, toggleCartModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const cartData = useSelector(state => state.cart.cartList);
  const itemCount = useSelector(state => state.cart.cartItem);
  useEffect(() => {
    console.log(location.pathname);
  }, []);
  var totalPrice = cartData.reduce((acc, item) => {
    return acc + (item.count * item.price)
  }, 0);

  return (
    <div className={`cart-container ${showCart || (location.pathname == "/cart") ? 'show-modal' : ''}`}>
      <div className='cart-drawer-modal' aria-label="cart modal">
        <div className='cart-drawer-header-wrap' aria-label="cart header">
          <h3 aria-label="My Cart header">
            My Cart <span>{itemCount ? itemCount : ''}</span>
          </h3>
          {window.innerWidth >= 770 ? <button type='button' className='close' aria-label='Close Icon' onClick={toggleCartModal}>
            <span aria-hidden='true'>
              X
          </span>
          </button> : ""}
        </div>
        <div className="modal-body" >
          {cartData.length ? (
            <div className='cart-body-main'>
              <div className='cart-list-wrap'>
                <ul className='clearfix'>{cartData.map((item, index) => {
                  return <CartItem item={item} key={index} />
                })}</ul>
                <div className='lowest-price'>
                  <img src={LowestPrice} alt='Lowest Price' />
                  <span>You won't find it cheaper anywhere</span>
                </div>
              </div>
            </div>
          ) : (
            <article className='cart-body-wrap' aria-label="No cart item description">
              <h5 aria-label="No item in your cart">No item in your cart</h5>
              <p aria-label="Your favourite items are just a click away">Your favourite items are just a click away</p>
            </article>
          )}</div>
        <div className='cart-footer-wrap'>
          {cartData.length ? (
            <>
              <p className='cart-footer-text'>Promo code can be applied on payment page</p>
              <button type='button' className="custom-button" >
                <span className='checkout-text-wrap'>Proceed to Checkout</span>
                <span className='checkout-price-wrap'>
                  Rs. {totalPrice}
                </span>
              </button>
            </>
          ) : (
            <button
              type='button'
              className="custom-button empty-cart-button"
              onClick={() => {
                history.push('/products');
              }}
            >
              Start Shopping
            </button>
          )}
        </div>
      </div>
    </div>
  );
});


export default Cart;

import React, { useContext } from 'react';
import { Modal } from '@mui/material';
import { AppCtx } from './../../App';

const CartModal = () => {
  const { cart, isCartOpen, setIsCartOpen } = useContext(AppCtx);
  return (
    <Modal open={isCartOpen} onClose={() => setIsCartOpen(!isCartOpen)}>
      <div className='product-modal'>
        {cart.map((item) => {
          return <div key={item.id}>{item.name}</div>;
        })}
      </div>
    </Modal>
  );
};

export default CartModal;

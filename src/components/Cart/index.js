import React, { useContext } from 'react';
import { Grid, Modal, Paper } from '@mui/material';
import { AppCtx } from './../../App';

const CartModal = () => {
  const { cart, isCartOpen, setIsCartOpen } = useContext(AppCtx);
  return (
    <Modal open={isCartOpen} onClose={() => setIsCartOpen(!isCartOpen)}>
      <div className='product-modal cart'>
        {cart.map((item) => {
          return (
            <section key={item.id} style={{ marginBottom: 10 }}>
              <Paper>
                <Grid container>
                  <Grid item xs={2}>
                    <div className='item-img-wrapper'>
                      <img src={item.img} alt='' className='item-img' />
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <div>
                      <strong>{item.name}</strong>
                    </div>
                    <div>{item.flavor}</div>
                    <div>{item.price}</div>
                    <div>{item.quantity}</div>
                    <div>Subtotal: {item.quantity * item.price}</div>
                  </Grid>
                </Grid>
              </Paper>
            </section>
          );
        })}
      </div>
    </Modal>
  );
};

export default CartModal;

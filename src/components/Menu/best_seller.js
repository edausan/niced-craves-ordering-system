import React, { useState, useEffect, useContext } from 'react';
import { Grid, Modal, Button } from '@mui/material';
import { menu } from './../Swipeable/index';
import ProductCard from './product_card';
import { AppCtx } from './../../App';

const BestSeller = () => {
  const [isOpen, setIsOpen] = useState({ product: null, status: false });
  const { setCart } = useContext(AppCtx);

  useEffect(() => {
    console.log({ isOpen });
  }, [isOpen]);

  return (
    <div>
      <Modal open={isOpen.status} onClose={() => setIsOpen(!isOpen.status)}>
        <section className='product-modal'>
          <Grid container>
            <Grid item xs={12}>
              <div className='product-img-wrapper modal'>
                <img
                  style={{ width: '100%' }}
                  src={isOpen.product?.img}
                  alt=''
                />
              </div>
            </Grid>
          </Grid>

          {isOpen.product?.name}
          <Button onClick={() => setIsOpen(!isOpen.status)}>Close</Button>
          <Button onClick={() => setCart((cart) => [...cart, isOpen.product])}>
            Add to cart
          </Button>
        </section>
      </Modal>

      <Grid container sx={{ alignItems: 'center', mt: 2 }}>
        <Grid item xs={12} sx={{ padding: '0 1rem' }}>
          <Grid container>
            <Grid item xs={10}>
              <h3 style={{ margin: 0 }}>Best Seller</h3>
            </Grid>
            <Grid item xs={2}>
              <small>Show all</small>
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12}>
          <Grid
            container
            // spacing={2}
            sx={{
              alignItems: 'stretch',
              flexWrap: 'unset',
              maxWidth: '100%',
              overflowX: 'auto',
              padding: '20px 0',
              paddingRight: '20px',
            }}
          >
            {menu.map((m) => {
              return (
                <Grid
                  key={m.id}
                  item
                  xs={6}
                  sx={{ ml: 2 }}
                  onClick={() =>
                    setIsOpen({ status: !isOpen.status, product: m })
                  }
                >
                  <ProductCard product={m} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default BestSeller;

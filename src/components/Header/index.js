import { ShoppingCart } from '@mui/icons-material';
import { Grid, Badge } from '@mui/material';
import React, { useContext } from 'react';
import Logo from '../../nc_logo.png';
import Swipeable from '../Swipeable';
import { AppCtx } from './../../App';

export const Header = () => {
  const { setIsCartOpen, cart } = useContext(AppCtx);
  return (
    <section className='header'>
      <Swipeable />
      <Grid container className='top-bar' sx={{ mt: 2 }}>
        <Grid item xs={2} sx={{ ml: 2 }}>
          <div className='logo-wrapper'>
            <img src={Logo} alt='NICED Craves' />
          </div>
        </Grid>
        <Grid item xs={7}></Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Badge badgeContent={cart.length} color='primary'>
            <ShoppingCart
              sx={{ color: '#fff' }}
              onClick={() => setIsCartOpen(true)}
            />
          </Badge>
        </Grid>
      </Grid>
    </section>
  );
};

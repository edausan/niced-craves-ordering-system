import { ShoppingCart } from '@mui/icons-material';
import { Grid, Badge, Button } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import Logo from '../../nc_logo.png';
import BottomNavigation from '../BottomNavigation';
import Swipeable from '../Swipeable';
import { AppCtx } from './../../App';

export const Header = () => {
  const { setIsCartOpen, cart } = useContext(AppCtx);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });
  }, []);

  return (
    <section className='header'>
      <Swipeable />
      {/* <Grid container className='top-bar' sx={{ p: 2 }} alignItems='center'>
        <div
          style={{
            position: 'absolute',
            width: '94%',
            height: '80%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            zIndex: 1,
            opacity: scroll / 400,
            boxShadow: '0 10px 10px rgba(0,0,0,.2)',
            borderRadius: 10,
          }}
        ></div>
        <Grid item xs={2} sx={{ ml: 1, position: 'relative', zIndex: 2 }}>
          <div className='logo-wrapper'>
            <img src={Logo} alt='NICED Craves' />
          </div>
        </Grid>
        <Grid item xs={5} sx={{ position: 'relative', zIndex: 2 }}>
          <Button color='inherit' size='small' variant='text' sx={{ ml: 2 }}>
            Delivery Rates
          </Button>
        </Grid>
        <Grid item xs={2} sx={{ position: 'relative', zIndex: 2 }}>
          <Button color='inherit' size='small' variant='text'>
            Contact
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Badge badgeContent={cart.length} color='warning'>
            <ShoppingCart
              fontSize='large'
              sx={{
                color: scroll >= 150 ? '#000' : '#fff',
                boxShabow: '0 5px 8px rgba(0,0,0,.3)',
              }}
              onClick={() => setIsCartOpen(true)}
            />
          </Badge>
        </Grid>
      </Grid> */}
    </section>
  );
};

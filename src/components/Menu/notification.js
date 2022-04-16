import { AddShoppingCart, ShoppingCart } from '@mui/icons-material';
import { Divider, Grid, Snackbar, Button } from '@mui/material';
import { useContext } from 'react';
import { AppCtx } from '../../App';

const Notification = ({ item, showNotif }) => {
  const { setShowNotif, setIsCartOpen } = useContext(AppCtx);

  const action = (
    <Button
      onClick={() => {
        setIsCartOpen(true);
        setShowNotif(false);
      }}
      size='small'
      sx={{ minWidth: 30 }}
    >
      <ShoppingCart color='warning' fontSize='small' />
    </Button>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={showNotif}
      autoHideDuration={3000}
      onClose={() => setShowNotif(false)}
      action={action}
      message={
        <div style={{ width: '100%', maxWidth: 300 }}>
          <strong style={{ color: 'orange' }}>
            {item?.name}
            {item?.flavor ? ` (${item?.flavor})` : ''}
          </strong>{' '}
          is added to cart.
        </div>
      }
    />
  );
};

export default Notification;

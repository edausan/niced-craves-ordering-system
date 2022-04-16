import React, { useContext, useEffect, useState, createContext } from 'react';
import {
  Grid,
  Modal,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  ButtonGroup,
  TextField,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add,
  BallotOutlined,
  Close,
  Delete,
  Remove,
  ShoppingCart,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { AppCtx } from './../../App';
import Cart from './cart';
import Orders from './orders';

export const CartCtx = createContext(null);

const CartModal = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setCart,
    setIsCartUpdated,
    handleCheckout,
    orders,
    customerInfo,
    checkedOut,
  } = useContext(AppCtx);
  const [quantity, setQuantity] = useState({ item: '', value: 1 });
  const [deleted, setDeleted] = useState({ item: null, status: false });
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState('cart');

  useEffect(() => {
    if (cart.length > 0) {
      let total = 0;
      cart.forEach((item) => {
        console.log({ item });
        const subtotal =
          item.quantity * item.selected_price +
          (item.add_on ? 10 : 0) * item.quantity -
          (item.rice === 'no-rice' ? 5 : 0);
        total = total + subtotal;
      });

      setTotal(total + customerInfo.delivery.price);
    }
  }, [cart]);

  useEffect(() => {
    checkedOut && setTab('orders');
  }, [checkedOut]);

  useEffect(() => {
    console.log({ quantity });
    handleChange(null, 'quantity', quantity.item);
  }, [quantity]);

  const handleChange = (event, column, item) => {
    const updated_cart = cart.map((cart_item) => {
      if (cart_item.id === item.id) {
        console.log({ quantity });
        return {
          ...item,
          id: `${item.name?.split(' ').join('_')}~${
            column === 'flavor' ? event.target.value : item.flavor
          }~${column === 'add_on' ? event.target.value : item.add_on}~${
            item.price
          }`,
          [column]:
            column === 'quantity'
              ? quantity.item.id === item.id
                ? quantity.value > 0
                  ? quantity.value
                  : item.quantity
                : item.quantity
              : event.target.value,
        };
      }

      // parseInt(event.target?.value || event > 0 ? event : 1)

      return cart_item;
    });
    setIsCartUpdated(true);
    setCart(updated_cart);
  };

  useEffect(() => {
    console.log({ deleted });
    setTimeout(() => {
      deleted.status && handleDeleteItem(deleted.item);
    }, 300);
  }, [deleted]);

  const handleDeleteItem = (item) => {
    const filtered = cart.filter((c_item) => c_item.id !== item.id);
    setCart(filtered);
    setDeleted({ item: null, status: false });
  };

  return (
    <Modal
      open={isCartOpen}
      onClose={() => {
        setIsCartOpen(!isCartOpen);
        setTab('cart');
      }}
      sx={{ border: 'none !important', outline: 'none !important' }}
    >
      <CartCtx.Provider
        value={{
          cart,
          setCart,
          deleted,
          setDeleted,
          handleChange,
          setQuantity,
          quantity,
          handleCheckout,
          total,
          orders,
          customerInfo,
          setTab,
        }}
      >
        <div className='product-modal cart'>
          <Tabs
            value={tab}
            onChange={(e, tab) => setTab(tab)}
            fullWidth
            sx={{ minHeight: '40px' }}
            textColor={tab === 'cart' ? 'primary' : 'secondary'}
            indicatorColor={tab === 'cart' ? 'primary' : 'secondary'}
          >
            <Tab
              icon={<ShoppingCartOutlined fontSize='small' sx={{ mr: 1 }} />}
              iconPosition='start'
              label='Cart'
              value='cart'
              sx={{ padding: '0px 20px', minHeight: '40px' }}
            />
            <Tab
              icon={<BallotOutlined fontSize='small' sx={{ mr: 1 }} />}
              iconPosition='start'
              label='Orders'
              value='orders'
              sx={{ padding: '0px 20px', minHeight: '40px' }}
            />
          </Tabs>
          {tab === 'cart' ? <Cart /> : <Orders />}
        </div>
      </CartCtx.Provider>
    </Modal>
  );
};

export default CartModal;

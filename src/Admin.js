import React, { useContext, useEffect, useState } from 'react';
import { MainCtx } from './index';
import { GetOrders } from './components/firestore';
import { Paper } from '@mui/material';

const Admin = () => {
  const { db } = useContext(MainCtx);

  const [orders, setOrders] = useState([]);

  const { data } = GetOrders({ db });

  useEffect(() => {
    console.log({ data });
    setOrders(data);
  }, [data]);

  useEffect(() => {
    console.log({ orders });
  }, [orders]);

  return (
    <div style={{ padding: 20 }}>
      {orders.map((order) => {
        const { cart, customer, id } = order;
        return (
          <Paper key={id} sx={{ p: 2, mt: 2 }}>
            <strong>{customer.name}</strong>
            <small style={{ display: 'block' }}>
              Address: <strong>{customer.address}</strong>
            </small>
            <small>
              Payment Method: <strong>{customer.payment_method}</strong>
            </small>
            <section
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid #000',
              }}
            >
              {cart.map((item) => {
                return (
                  <section style={{ marginBottom: 10 }}>
                    <strong>{item.name}</strong>
                    <div>
                      <small>Qty: {item.quantity}</small>
                    </div>
                  </section>
                );
              })}
            </section>
          </Paper>
        );
      })}

      {/* <section>
			Name: {orders.userInfo}
		</section> */}
    </div>
  );
};

export default Admin;

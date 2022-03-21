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
        return (
          <Paper key={order.id} sx={{ p: 2, mt: 2 }}>
            <strong>{order.userInfo.name}</strong>
            <section>
              {order.cart.map((item) => {
                return (
                  <div>
                    {item.name} | {item.quantity}
                  </div>
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

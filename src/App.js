import { Menu } from './components/Menu/index';
import { Header } from './components/Header/index';
import BestSeller from './components/Menu/best_seller';
import { useState, createContext, useEffect } from 'react';
import { Modal } from '@mui/material';

export const AppCtx = createContext({});

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    console.log({ cart });
  }, [cart]);

  return (
    <div className='App'>
      <AppCtx.Provider value={{ cart, setCart, isCartOpen, setIsCartOpen }}>
        <Modal open={isCartOpen} onClose={() => setIsCartOpen(!isCartOpen)}>
          <div className='product-modal'>
            {cart.map((item) => {
              return <div key={item.id}>{item.name}</div>;
            })}
          </div>
        </Modal>
        <Header />
        {/* <Menu /> */}
        <section>
          <BestSeller />
        </section>
      </AppCtx.Provider>
    </div>
  );
}

export default App;

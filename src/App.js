import { Menu } from './components/Menu/index';
import { Header } from './components/Header/index';
import BestSeller from './components/Menu/best.seller';
import { useState, createContext, useEffect } from 'react';
import { Modal } from '@mui/material';
import CartModal from './components/Cart';

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
        <CartModal />

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

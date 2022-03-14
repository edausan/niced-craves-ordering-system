import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { menu } from '../../data';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Swipeable = () => {
  return (
    <section className='swipeable-wrapper'>
      <AutoPlaySwipeableViews height={500}>
        {menu.map((m, idx) => {
          return (
            <div
              key={idx}
              // style={{ ...styles.slide }}
              className='carousel-img-wrapper'
            >
              <div className='carousel-product-description'>
                <h1 className='product-name'>{m.name}</h1>
                <h2 className='product-price'>₱{m.prices[0]}.00</h2>
              </div>
              <img src={m.img} alt='' />
            </div>
          );
        })}
      </AutoPlaySwipeableViews>
    </section>
  );
};

export default Swipeable;

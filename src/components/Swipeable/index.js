import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ClubHouse from '../../images/Clubhouse.png';
import Milktea from '../../images/Milktea.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const uid = () => {
  return Math.random();
};

export const menu = [
  {
    id: uid(),
    img: ClubHouse,
    name: 'Clubhouse w/ Fries',
    price: 99,
    size: null,
  },
  {
    id: uid(),
    img: Milktea,
    name: 'Creamy Milktea',
    price: 39,
    size: 'Medium',
  },
  {
    id: uid(),
    img: ClubHouse,
    name: 'Clubhouse w/ Fries',
    price: 99,
    size: null,
  },
  {
    id: uid(),
    img: Milktea,
    name: 'Creamy Milktea',
    price: 39,
    size: 'Medium',
  },
  {
    id: uid(),
    img: ClubHouse,
    name: 'Clubhouse w/ Fries',
    price: 99,
    size: null,
  },
  {
    id: uid(),
    img: Milktea,
    name: 'Creamy Milktea',
    price: 39,
    size: 'Medium',
  },
  {
    id: uid(),
    img: ClubHouse,
    name: 'Clubhouse w/ Fries',
    price: 99,
    size: null,
  },
  {
    id: uid(),
    img: Milktea,
    name: 'Creamy Milktea',
    price: 39,
    size: 'Medium',
  },
  {
    id: uid(),
    img: ClubHouse,
    name: 'Clubhouse w/ Fries',
    price: 99,
    size: null,
  },
  {
    id: uid(),
    img: Milktea,
    name: 'Creamy Milktea',
    price: 39,
    size: 'Medium',
  },
];

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
                <h2 className='product-price'>₱{m.price}.00</h2>
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

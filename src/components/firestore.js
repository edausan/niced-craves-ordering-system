import {
  onSnapshot,
  collection,
  addDoc,
  enableIndexedDbPersistence,
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyD5D_95e3pq02ZPhcpYrSKR635tuSsSW3w',
  authDomain: 'niced-craves-ordering-system.firebaseapp.com',
  projectId: 'niced-craves-ordering-system',
  storageBucket: 'niced-craves-ordering-system.appspot.com',
  messagingSenderId: '312614147462',
  appId: '1:312614147462:web:31c8a827a9b4600f79c807',
  measurementId: 'G-KBG9XZMELD',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

// const firestoreDb = initializeFirestore(app, {
//   cacheSizeBytes: CACHE_SIZE_UNLIMITED,
// });

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

// Get Products
const GetData = ({ colRef, db }) => {
  const ref = collection(db, colRef);
  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(ref, { includeMetadataChanges: true }, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const source = snapshot.metadata.fromCache ? 'local cache' : 'server';
      console.log('Data came from ' + source);
      setData(docs);
    });
  }, []);

  return {
    best_sellers: data.filter((item) => item.is_best_seller),
    products: data.filter((item) => !item.is_best_seller),
  };
};

// Add Product
const AddProduct = ({ colRef, db, params }) => {
  const ref = collection(db, colRef);
  addDoc(ref, { ...params });
};

// Add Orders
const Checkout = ({ db }) => {
  const [data, setData] = useState({ cart: [], userInfo: {} });

  useEffect(() => {
    // console.log({ data });
    if (data.cart.length > 0) handleAdd();
  }, [data]);

  const handleAdd = () => {
    console.log({ handleAdd: data });
    const ref = collection(db, 'orders');
    try {
      addDoc(ref, { ...data });
    } catch (error) {
      console.log(error);
    }
  };

  return { setData };
};

// Get Orders
const GetOrders = ({ db }) => {
  const ref = collection(db, 'orders');
  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(ref, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(docs);
    });
  }, []);

  return { data };
};

export { GetData, AddProduct, Checkout, GetOrders };

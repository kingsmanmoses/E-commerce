import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showcart, setshowcart] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQuantities, settotalQuantities] = useState(0);
  const [Qty, setQty] = useState(0);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    settotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setcartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setcartItems([...cartItems, { ...product }]);
    }
    toast.success(`${Qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    settotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    settotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setcartItems(newCartItems);
  };

  const toggleCartItemsQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setcartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      settotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      settotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setcartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        settotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const IncQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const DecQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showcart,
        setshowcart,
        cartItems,
        totalPrice,
        Qty,
        totalQuantities,
        IncQty,
        DecQty,
        onAdd,
        toggleCartItemsQuantity,
        onRemove,
        setcartItems,
        settotalPrice,
        settotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

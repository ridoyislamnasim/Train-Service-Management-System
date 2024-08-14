// take params: price, discount, discount_type = flat, percent
// return: calculated_discount

export const calculateDiscount = (price, discount, discount_type) => {
  if (discount_type === 'flat') {
    return parseFloat(discount);
  } else if (discount_type === 'percent') {
    return (parseFloat(discount) * parseFloat(price)) / 100;
  } else {
    return 0;
  }
};

// take params: disconted_price, vat,
// return: calculated_vat

export const calculateVat = (discounted_price, vat) => {
  return (parseFloat(vat) * parseFloat(discounted_price)) / 100;
};


export const totalCartDiscountedPrice = (cart) => {
  return cart.reduce((acc, item) => acc + ((item.product.price - calculateDiscount(item.product.price, item.product.discount || 0, item.product.discount_type || "")) * item.quantity), 0);
};
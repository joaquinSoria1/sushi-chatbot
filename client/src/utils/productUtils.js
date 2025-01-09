import { menuData } from '../data/menuStore';

export const standardizeProduct = (product) => {
  // Buscamos el producto completo en el store
  const completeProduct = menuData.findProduct(product.name) || product;

  return {
    id: String(completeProduct.id),
    _id: String(completeProduct.id),
    name: completeProduct.name,
    description: completeProduct.description,
    price: Number(completeProduct.price),
    image: completeProduct.image,
    quantity: Number(product.quantity || 1),
    category: completeProduct.pieces ? 'roll' : 'promotion',
    ...(completeProduct.pieces && { pieces: Number(completeProduct.pieces) }),
    ...(completeProduct.originalPrice && { originalPrice: Number(completeProduct.originalPrice) })
  };
};
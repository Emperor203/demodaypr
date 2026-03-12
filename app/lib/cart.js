export const CART_STORAGE_KEY = "cartItems";

export function readCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeCart(items) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cart:updated"));
  } catch {}
}

export function addToCart(product) {
  const cart = readCart();
  const index = cart.findIndex((item) => item.id === product.id);

  if (index >= 0) {
    cart[index] = { ...cart[index], qty: cart[index].qty + 1 };
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: 1,
    });
  }

  writeCart(cart);
  return cart;
}

export function removeFromCart(id) {
  const next = readCart().filter((item) => item.id !== id);
  writeCart(next);
  return next;
}

export function updateCartQty(id, qty) {
  const safeQty = Math.max(1, Number(qty) || 1);
  const next = readCart().map((item) =>
    item.id === id ? { ...item, qty: safeQty } : item
  );
  writeCart(next);
  return next;
}

export function getCartCount(items) {
  return items.reduce((sum, item) => sum + (item.qty || 0), 0);
}

export function getCartTotal(items) {
  return items.reduce((sum, item) => sum + Number(item.price) * (item.qty || 0), 0);
}

const photos = import.meta.glob('./assets/*.webp', { eager: true, query: '?url', import: 'default' });
export const photo = (name) => photos[`./assets/${name}.webp`];

export const categories = {
  gifts: 'Gifts', bags: 'Travel & bags', wedding: 'Wedding', fashion: 'Fashion finds', watches: 'Watches',
};
export const occasions = { wedding: 'Wedding', birthday: 'Birthday', thanks: 'Thank you' };
export const budgets = { small: 'Under ₹1,000', medium: '₹1,000–₹2,000', large: 'Over ₹2,000' };
export const preferences = { accessories: 'Accessories', bags: 'Bags', keepsakes: 'Keepsakes' };

export const products = [
  ['jaipur-sling', 'The Jaipur Sling', 2799, 'jaipur1', 'bags', 'bags', ['birthday', 'thanks'], 'A golden floral sling from the Palace Memoirs collection.'],
  ['lucknow-clutch', 'The Lucknow Clutch', 2799, 'lucknow', 'bags', 'bags', ['birthday', 'wedding'], 'An emerald floral clutch from the Palace Memoirs collection.'],
  ['roma-shoulder', 'The Roma Shoulder Bag', 3299, 'roma', 'bags', 'bags', ['birthday'], 'A structured shoulder bag from the Palace Memoirs collection.'],
  ['jaipur-wallet', 'The Jaipur Wallet', 2299, 'jaipur', 'bags', 'accessories', ['birthday', 'thanks'], 'A garden-print wallet from the Rani Bagh collection.'],
  ['vivah-set', 'Vivah Indulgence Gift Set', 3199, 'wedding1', 'wedding', 'keepsakes', ['wedding', 'thanks'], 'A boxed Kimirica gift set for celebrations.'],
  ['carnation-frame', 'Carnation Frame Gift', 2099, 'wedding2', 'wedding', 'keepsakes', ['wedding', 'thanks'], 'A floral frame gift in purple and pink.'],
  ['blooming-love', 'Blooming Love Gift Set', 1749, 'wedding3', 'wedding', 'keepsakes', ['wedding', 'birthday'], 'A personalised gift set with a photo keepsake.'],
  ['couple-mugs', 'Rose & Couple Mug Duo', 999, 'wedding4', 'wedding', 'keepsakes', ['wedding', 'thanks'], 'A pair of mugs arranged with red roses.'],
  ['elephant-watch', 'Fantastical Elephant Watch', 1812, 'watch11', 'watches', 'accessories', ['birthday', 'thanks'], 'A slim wristwatch in a rose-gold tone.'],
  ['jungle-watch', 'Jungle Flowers Watch', 1498, 'watch2', 'watches', 'accessories', ['birthday', 'thanks'], 'A floral wristwatch from the TEAL collection.'],
  ['owl-watch', 'Vintage Owl Watch', 1498, 'watch3', 'watches', 'accessories', ['birthday'], 'An owl-inspired wristwatch from the TEAL collection.'],
  ['forest-watch', 'Forest Jade Watch', 1498, 'watch4', 'watches', 'accessories', ['birthday', 'thanks'], 'A wristwatch from the Forest Jade collection.'],
  ['brown-handbag', 'Handcrafted Brown Handbag', 16018, 'fashion1', 'fashion', 'bags', ['birthday'], 'A brown leather handbag with a simple shoulder strap.'],
  ['basket-bag', 'Handwoven Basket Bag', 7604, 'fashion', 'fashion', 'bags', ['birthday'], 'A handwoven basket bag in vegan leather.'],
  ['leather-handbag', 'Elegant Leather Handbag', 11081, 'fashion3', 'fashion', 'bags', ['birthday'], 'A leather handbag from Teplo Leather.'],
  ['top-handle', 'Classic Leather Top Handle Bag', 11060, 'fashion4', 'fashion', 'bags', ['birthday'], 'A classic top-handle bag with a structured silhouette.'],
].map(([id, name, price, image, category, preference, occasions, description]) => ({
  id, name, price, image, category, preference, occasions, description,
}));

export const money = (amount) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
}).format(amount);

export function matches(product, filters) {
  const { category, q, occasion, budget, preference } = filters;
  const searchable = [product.name, product.description, categories[product.category],
    preferences[product.preference], ...product.occasions.map((key) => occasions[key])].join(' ').toLowerCase();
  return (!category || category === 'gifts' || product.category === category)
    && (!q || q.trim().toLowerCase().split(/\s+/).every((word) => searchable.includes(word)))
    && (!occasion || product.occasions.includes(occasion))
    && (!preference || product.preference === preference)
    && (!budget || (budget === 'small' && product.price < 1000)
      || (budget === 'medium' && product.price >= 1000 && product.price <= 2000)
      || (budget === 'large' && product.price > 2000));
}

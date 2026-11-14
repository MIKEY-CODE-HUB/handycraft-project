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
  ['canvas-weekender', 'Olive Canvas Weekender', 3899, 'canvas-weekender', 'bags', 'bags', ['birthday'], 'An olive duffel with a roomy shape for short trips.'],
  ['market-tote', 'Natural Canvas Market Tote', 1299, 'market-tote', 'bags', 'bags', ['birthday', 'thanks'], 'A natural canvas tote for errands and weekend markets.'],
  ['indigo-pouch', 'Indigo Travel Pouch', 799, 'indigo-pouch', 'bags', 'bags', ['thanks'], 'A zippered indigo pouch for small travel essentials.'],
  ['passport-sleeve', 'Cognac Passport Sleeve', 1199, 'passport-sleeve', 'bags', 'accessories', ['birthday', 'thanks'], 'A warm brown sleeve to keep a passport close at hand.'],
  ['toast-flutes', 'Wedding Toast Flute Pair', 2499, 'toast-flutes', 'wedding', 'keepsakes', ['wedding'], 'Two champagne flutes presented together as a wedding gift.'],
  ['linen-guest-book', 'Ivory Linen Guest Book', 1399, 'linen-guest-book', 'wedding', 'keepsakes', ['wedding'], 'An ivory guest book for handwritten wedding wishes.'],
  ['brass-ring-dish', 'Brass Ring Dish', 899, 'brass-ring-dish', 'wedding', 'keepsakes', ['wedding'], 'A small brass dish for rings and other everyday jewellery.'],
  ['taper-candle-pair', 'Cream Taper Candle Pair', 649, 'taper-candle-pair', 'wedding', 'keepsakes', ['wedding', 'thanks'], 'Two cream tapers for a wedding table or a quiet dinner.'],
  ['indigo-scarf', 'Indigo Block Print Scarf', 1599, 'indigo-scarf', 'fashion', 'accessories', ['birthday'], 'A lightweight scarf with a repeating indigo print.'],
  ['amber-necklace', 'Amber Bead Necklace', 1199, 'amber-necklace', 'fashion', 'accessories', ['birthday'], 'A strand of warm amber-coloured beads.'],
  ['hammered-hoops', 'Silver-Tone Hammered Hoops', 999, 'hammered-hoops', 'fashion', 'accessories', ['birthday', 'thanks'], 'Textured silver-tone hoops for everyday outfits.'],
  ['woven-belt', 'Tan Woven Belt', 1299, 'woven-belt', 'fashion', 'accessories', ['birthday'], 'A woven tan belt with a classic buckle.'],
  ['heritage-watch', 'Heritage Leather Watch', 2199, 'heritage-watch', 'watches', 'accessories', ['birthday'], 'A cream analog dial with a brown leather strap.'],
  ['square-dial-watch', 'Midnight Square Dial Watch', 2499, 'square-dial-watch', 'watches', 'accessories', ['birthday'], 'A square analog dial with a black strap.'],
  ['olive-field-watch', 'Olive Field Watch', 1899, 'olive-field-watch', 'watches', 'accessories', ['birthday', 'thanks'], 'An easy-to-read field watch with an olive canvas strap.'],
  ['silver-mesh-watch', 'Silver Mesh Watch', 2699, 'silver-mesh-watch', 'watches', 'accessories', ['birthday'], 'A slim watch with a silver-tone mesh bracelet.'],
  ['botanical-cards', 'Botanical Greeting Card Set', 399, 'botanical-cards', 'gifts', 'keepsakes', ['birthday', 'thanks'], 'A boxed set of illustrated botanical greeting cards.'],
  ['morning-mug', 'Pale Blue Morning Mug', 499, 'morning-mug', 'gifts', 'keepsakes', ['birthday', 'thanks'], 'A pale blue ceramic mug for tea or coffee.'],
  ['amber-jar-candle', 'Amber Jar Candle', 699, 'amber-jar-candle', 'gifts', 'keepsakes', ['birthday', 'thanks'], 'A candle poured in an amber-coloured jar.'],
  ['dried-flower-posy', 'Dried Flower Posy', 849, 'dried-flower-posy', 'gifts', 'keepsakes', ['birthday', 'thanks'], 'A small arrangement of dried flowers in muted colours.'],
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
  return (!category || product.category === category || (category === 'gifts' && product.preference === 'keepsakes'))
    && (!q || q.trim().toLowerCase().split(/\s+/).every((word) => searchable.includes(word)))
    && (!occasion || product.occasions.includes(occasion))
    && (!preference || product.preference === preference)
    && (!budget || (budget === 'small' && product.price < 1000)
      || (budget === 'medium' && product.price >= 1000 && product.price <= 2000)
      || (budget === 'large' && product.price > 2000));
}

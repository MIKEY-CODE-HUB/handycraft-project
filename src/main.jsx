import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Gift, Heart, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { budgets, categories, matches, money, occasions, photo, preferences, products } from './catalog';
import '@fontsource-variable/dm-sans/wght.css';
import './style.css';

const productById = Object.fromEntries(products.map((product) => [product.id, product]));
const allCollections = '/shop';
const collection = (category) => `/shop?category=${category}`;
const image = (name, alt, props = {}) => <img src={photo(name)} alt={alt} loading="lazy" {...props} />;

function useSavedState(key, initial, validate) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return validate(saved) ? saved : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* State remains available for this visit. */ }
  }, [key, value]);
  return [value, setValue];
}

function Modal({ title, className = '', onClose, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element.showModal();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = originalOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialog} aria-label={title} className={className}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-content">
      <div className="dialog-heading"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X /></button></div>
      {children}
    </div>
  </dialog>;
}

function Header({ count, openBasket }) {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const activeCategory = params.get('category');
  return <>
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="HandyCrafts home">HandyCrafts</Link>
        <form key={location.pathname + location.search} className="search" role="search" onSubmit={(event) => {
          event.preventDefault();
          const search = new FormData(event.currentTarget).get('q').trim();
          navigate(search ? `/shop?${new URLSearchParams({ q: search })}` : allCollections);
        }}>
          <input type="search" name="q" aria-label="Search products" defaultValue={params.get('q') || ''} placeholder="Search bags, watches, gifts…" />
          <button className="icon-button" aria-label="Search"><Search size={18} /></button>
        </form>
        <div className="header-actions">
          <NavLink className="icon-button" to="/favourites" aria-label="Favourites"><Heart size={20} /></NavLink>
          <button className="icon-button" onClick={openBasket} aria-label={`Basket, ${count} items`}>
            <ShoppingBag size={20} /> <span className="count">{count}</span>
          </button>
        </div>
      </div>
      <nav className="collection-nav wrap" aria-label="Collections">
        {Object.entries(categories).map(([key, label]) => <Link key={key} to={collection(key)}
          aria-current={location.pathname === '/shop' && activeCategory === key ? 'page' : undefined}>{label}</Link>)}
        <NavLink to="/finder"><Gift size={15} /> Gift Finder</NavLink>
      </nav>
    </header>
  </>;
}

function ProductCard({ product, saved, toggle }) {
  return <article className="product-card">
    <div className="product-image">
      <Link to={`/product/${product.id}`} aria-label={product.name}>{image(product.image, product.name)}</Link>
      <button className="icon-button save" aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${product.name}`}
        onClick={() => toggle(product.id)}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /></button>
    </div>
    <p className="eyebrow">{categories[product.category]}</p>
    <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
    <p className="price">{money(product.price)}</p>
  </article>;
}

function ProductGrid({ items, favourites, toggle }) {
  return <div className="product-grid">{items.map((item) => <ProductCard key={item.id} product={item}
    saved={favourites.includes(item.id)} toggle={toggle} />)}</div>;
}

const seasonalPicks = [
  ['Top gifts', 'img-1', '/shop?category=gifts'],
  ['New arrivals', 'img2', '/shop'],
  ['Cosy finds', 'img3', '/shop?category=fashion'],
  ['Family traditions', 'img4', '/shop?preference=keepsakes'],
  ['Books & libraries', 'img5', null],
];

const homeCollections = [
  ['bags', 'Travels and Bags', 'Palace Memoirs'],
  ['watches', 'Watches', null],
  ['wedding', 'Forever Wedding Classics', null],
  ['fashion', 'Fashion Finds', null],
];

function Home(props) {
  return <div className="home">
    <section className="original-hero" aria-labelledby="home-heading">
      {image('bottle', '', { loading: 'eager', fetchPriority: 'high' })}
      <div className="wrap original-hero-copy">
        <div>
          <h1 id="home-heading">The HandyCraft Collection</h1>
          <p>Thoughtfully made pieces for modern living</p>
          <Link className="primary" to={allCollections}>Explore the collection <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
    <div className="wrap">
      <div className="original-promos">
        <section className="urgent-gift">
          <h2>Need a gift ASAP?</h2>
          <p>Find thoughtful gifts, even though it’s down to the wire.</p>
          <Link className="primary" to="/finder">Shop our picks <ArrowRight size={17} /></Link>
        </section>
        <section className="budget-gift">
          {image('wedding4', '')}
          <div><h2>Gifts under ₹1,000</h2><Link className="text-link" to="/shop?budget=small">Shop now <ArrowRight size={16} /></Link></div>
        </section>
      </div>
      <section className="section seasonal-section">
        <div className="section-heading"><h2>Discover our best of winter 2026</h2></div>
        <div className="collection-grid seasonal-grid">{seasonalPicks.map(([label, asset, to]) => to
          ? <Link className="collection-card" to={to} key={label}>{image(asset, '')}<span>{label} <ArrowRight size={15} /></span></Link>
          : <div className="collection-card" key={label}>{image(asset, '')}<span>{label}</span></div>)}</div>
      </section>
      {homeCollections.map(([category, title, collectionName]) => <section className="section home-collection" key={category}>
        <div className="section-heading"><div>{collectionName && <p className="eyebrow">{collectionName}</p>}<h2>{title}</h2></div>
          <Link className="text-link" to={collection(category)}>View collection <ArrowRight size={16} /></Link></div>
        <ProductGrid items={products.filter((product) => product.category === category)} {...props} />
      </section>)}
      <section className="section gifting-note">
        <h2>Affordable and thoughtful gifts for everyday moments</h2>
        <p>Find a photo keepsake for a wedding, a watch for a birthday, or a small thank-you for someone who helped.</p>
        <Link className="text-link" to="/finder">Find a gift <ArrowRight size={16} /></Link>
      </section>
    </div>
  </div>;
}

const filterFields = [
  ['category', 'Collection', categories], ['occasion', 'Occasion', occasions],
  ['budget', 'Budget', budgets], ['preference', 'Type', preferences],
];
function FilterControls({ filters, update }) {
  return <div className="filters">{filterFields.map(([key, label, options]) => <label key={key}>{label}
    <select value={filters[key] || ''} onChange={(event) => update(key, event.target.value)}>
      <option value="">Any</option>
      {Object.entries(options).map(([value, title]) => <option key={value} value={value}>{title}</option>)}
    </select>
  </label>)}</div>;
}

function Shop(props) {
  const [params, setParams] = useSearchParams();
  const [isFiltering, setFiltering] = useState(false);
  const filters = Object.fromEntries(params);
  const update = (key, value) => setParams((current) => {
    const next = new URLSearchParams(current);
    if (value) next.set(key, value);
    else next.delete(key);
    return next;
  });
  const items = products.filter((product) => matches(product, filters));
  if (filters.sort === 'asc') items.sort((a, b) => a.price - b.price);
  if (filters.sort === 'desc') items.sort((a, b) => b.price - a.price);
  const chips = filterFields.filter(([key, , options]) => Object.hasOwn(options, filters[key]));
  return <div className="wrap inner-page">
    <p className="eyebrow">The HandyCrafts collection</p>
    <h1>{filters.q ? `Results for “${filters.q}”` : (Object.hasOwn(categories, filters.category) ? categories[filters.category] : 'Shop the collection')}</h1>
    <div className="shop-layout">
      <aside aria-label="Filters"><FilterControls filters={filters} update={update} /></aside>
      <div className="shop-results">
        <div className="results-bar">
          <p aria-live="polite">{items.length} {items.length === 1 ? 'product' : 'products'}</p>
          <button className="secondary mobile-filters" onClick={() => setFiltering(true)}><SlidersHorizontal size={16} /> Filters</button>
          <label className="sort">Sort <select value={filters.sort || ''} onChange={(event) => update('sort', event.target.value)}>
            <option value="">Featured</option><option value="asc">Price: low to high</option><option value="desc">Price: high to low</option>
          </select></label>
        </div>
        {(chips.length > 0 || filters.q) && <div className="chips">
          {filters.q && <button onClick={() => update('q', '')} aria-label={`Clear search for ${filters.q}`}>{filters.q} <X size={13} /></button>}
          {chips.map(([key, label, options]) => <button key={key} onClick={() => update(key, '')}
            aria-label={`Clear ${label.toLowerCase()} filter`}>{options[filters[key]]} <X size={13} /></button>)}
          <button onClick={() => setParams(filters.sort ? { sort: filters.sort } : {})}>Clear all</button>
        </div>}
        {items.length ? <ProductGrid items={items} {...props} />
          : <div className="empty"><h2>No matching products</h2><p>Try clearing a filter or searching for a different term.</p>
            <button className="primary" onClick={() => setParams({})}>Show all products</button></div>}
      </div>
    </div>
    {isFiltering && <Modal title="Filter products" className="filter-dialog" onClose={() => setFiltering(false)}>
      <FilterControls filters={filters} update={update} />
      <button className="primary" onClick={() => setFiltering(false)}>Show {items.length} {items.length === 1 ? 'product' : 'products'}</button>
    </Modal>}
  </div>;
}

const questions = [
  ['occasion', 'What’s the occasion?', occasions, 'Any occasion'],
  ['budget', 'What’s your budget?', budgets, 'Any budget'],
  ['preference', 'What would they like?', preferences, 'Show everything'],
];
function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const hasChangedStep = useRef(false);
  const navigate = useNavigate();
  const [key, question, choices, any] = questions[step];
  const next = (event) => {
    event.preventDefault();
    if (step < questions.length - 1) {
      hasChangedStep.current = true;
      setStep(step + 1);
    }
    else {
      const query = new URLSearchParams(Object.entries(answers).filter(([, value]) => value));
      navigate(query.size ? `/shop?${query}` : allCollections);
    }
  };
  const questionHeading = useRef(null);
  useEffect(() => { if (hasChangedStep.current) questionHeading.current.focus(); }, [step]);
  return <div className="wrap inner-page finder">
    <div className="finder-intro"><Gift size={29} /><h1>Find a gift</h1><p>A shortlist based on the occasion, your budget, and what they like.</p></div>
    <form className="finder-form" onSubmit={next}>
      <p className="eyebrow">Step {step + 1} of {questions.length}</p>
      <fieldset key={key}>
        <legend tabIndex={-1} ref={questionHeading}>{question}</legend>
        {Object.entries({ '': any, ...choices }).map(([value, label]) => <label key={value} className="choice">
          <input type="radio" name={key} value={value} checked={(answers[key] ?? '') === value}
            onChange={() => setAnswers({ ...answers, [key]: value })} />
          {label}
        </label>)}
      </fieldset>
      <div className="finder-actions">
        {step > 0 && <button type="button" className="secondary" onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button>}
        <button className="primary">{step === questions.length - 1 ? 'Show gift ideas' : 'Continue'} <ArrowRight size={17} /></button>
      </div>
    </form>
  </div>;
}

function Product({ favourites, toggle, add }) {
  const { id } = useParams();
  const product = Object.hasOwn(productById, id) ? productById[id] : null;
  const [zoom, setZoom] = useState(false);
  if (!product) return <Missing />;
  const saved = favourites.includes(id);
  const related = products.filter((item) => item.id !== id && item.category === product.category).slice(0, 3);
  return <div className="wrap inner-page">
    <Link className="text-link product-back" to={collection(product.category)}><ArrowLeft size={16} /> {categories[product.category]}</Link>
    <section className="product-detail">
      <button onClick={() => setZoom(true)} className="detail-image" aria-label="Enlarge product photo">
        {image(id === 'jaipur-sling' ? 'jaipur1-large' : product.image, product.name, { loading: 'eager' })}
        <span><Search size={17} /> Enlarge photo</span>
      </button>
      <div className="detail-copy">
        <p className="eyebrow">{categories[product.category]}</p><h1>{product.name}</h1>
        <p className="detail-price">{money(product.price)}</p><p>{product.description}</p>
        <p className="detail-occasions"><strong>Gift occasions</strong> {product.occasions.map((key) => occasions[key]).join(' · ')}</p>
        <div className="detail-actions"><button className="primary" onClick={() => add(id)}><ShoppingBag size={18} /> Add to basket</button>
        <button className="secondary" onClick={() => toggle(id)} aria-pressed={saved}><Heart size={18} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save'}</button></div>
      </div>
    </section>
    <section className="section"><div className="section-heading"><h2>More from {categories[product.category].toLowerCase()}</h2></div>
      <ProductGrid items={related} favourites={favourites} toggle={toggle} /></section>
    {zoom && <Modal title={product.name} className="zoom-dialog" onClose={() => setZoom(false)}>
      {image(id === 'jaipur-sling' ? 'jaipur1-large' : product.image, product.name, { loading: 'eager' })}
    </Modal>}
  </div>;
}

function Basket({ basket, changeQuantity, onClose }) {
  const items = products.filter((item) => basket[item.id]);
  const subtotal = items.reduce((total, item) => total + basket[item.id] * item.price, 0);
  return <Modal title="Your basket" className="basket" onClose={onClose}>
    {items.length ? <>
      <ul className="basket-items">{items.map((item) => <li key={item.id}>
        {image(item.image, '')}<div><h3>{item.name}</h3><p>{money(item.price * basket[item.id])}</p>
          <div className="quantity"><button aria-label={`Decrease quantity of ${item.name}`} onClick={() => changeQuantity(item.id, -1)}><Minus size={15} /></button>
            <span aria-live="polite">{basket[item.id]}</span>
            <button aria-label={`Increase quantity of ${item.name}`} onClick={() => changeQuantity(item.id, 1)} disabled={basket[item.id] >= 99}><Plus size={15} /></button>
          </div>
          <button className="remove" onClick={() => changeQuantity(item.id, -basket[item.id])}>Remove {item.name}</button>
        </div>
      </li>)}</ul>
      <div className="basket-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
      <p className="demo-note">Demo basket. Checkout is unavailable.</p>
      <button className="primary" onClick={onClose}>Continue browsing <ArrowRight size={17} /></button>
    </> : <div className="empty"><ShoppingBag /><h3>Your basket is empty</h3>
      <Link className="primary" to={allCollections} onClick={onClose}>Explore the collection</Link></div>}
  </Modal>;
}

function Missing() {
  return <div className="wrap inner-page empty"><h1>Page unavailable</h1><Link className="primary" to={allCollections}>Shop the collection</Link></div>;
}

function App() {
  const [favourites, setFavourites] = useSavedState('handycraft-favourites', [],
    (value) => Array.isArray(value) && value.every((id) => Object.hasOwn(productById, id)));
  const [basket, setBasket] = useSavedState('handycraft-basket', {},
    (value) => value && typeof value === 'object' && !Array.isArray(value)
      && Object.entries(value).every(([id, count]) => Object.hasOwn(productById, id) && Number.isInteger(count) && count >= 1 && count <= 99));
  const [basketOpen, setBasketOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  const changeQuantity = (id, delta) => setBasket((current) => {
    const next = { ...current };
    const quantity = Math.min(99, (current[id] || 0) + delta);
    if (quantity > 0) next[id] = quantity;
    else delete next[id];
    return next;
  });
  const toggle = (id) => setFavourites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const productProps = { favourites, toggle };
  return <>
    <a href="#main-content" className="skip-link" onClick={(event) => {
      event.preventDefault(); document.getElementById('main-content').focus();
    }}>Skip to content</a>
    <Header openBasket={() => setBasketOpen(true)} count={Object.values(basket).reduce((total, count) => total + count, 0)} />
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home {...productProps} />} />
        <Route path="/shop" element={<Shop {...productProps} />} />
        <Route path="/finder" element={<Finder />} />
        <Route path="/product/:id" element={<Product {...productProps} add={(id) => { changeQuantity(id, 1); setBasketOpen(true); }} />} />
        <Route path="/favourites" element={<div className="wrap inner-page"><h1>Favourites</h1>
          {favourites.length ? <ProductGrid items={products.filter((item) => favourites.includes(item.id))} {...productProps} />
            : <div className="empty"><Heart /><h2>No favourites yet</h2><p>Save a product to find it here next time.</p>
              <Link className="primary" to={allCollections}>Explore the collection</Link></div>}
        </div>} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </main>
    <footer><div className="wrap footer-inner">
      <Link className="brand" to="/">HandyCrafts</Link>
      <nav aria-label="Footer"><Link to={allCollections}>Shop all</Link><Link to="/finder">Gift Finder</Link><Link to="/favourites">Favourites</Link></nav>
    </div></footer>
    {basketOpen && <Basket basket={basket} changeQuantity={changeQuantity} onClose={() => setBasketOpen(false)} />}
  </>;
}

createRoot(document.getElementById('root')).render(<HashRouter><App /></HashRouter>);

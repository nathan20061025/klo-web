/* =====================================================================
   KLO shared script — loaded by every page (<script src="klo.js">)
   Contains: site config, product catalog, cart/wishlist/user/order data
   layer (localStorage), shared header + footer, nav behaviour, cookie
   banner, and the form helpers (contact + newsletter).
   ===================================================================== */

/* ---------- SITE CONFIG — edit these values for your real business ---------- */
var KLO_CONFIG = {
  siteUrl: 'https://example.com',            /* your real domain, no trailing slash */
  email: 'hello@klo-clothing.com',
  phone: '+1 (415) 555-0199',
  phoneHours: 'Mon–Fri, 9am–5pm PT',
  address: '412 Market Street, San Francisco, CA 94103',
  /* Social profile URLs. Leave '' to hide that icon. */
  social: { Instagram: '', Pinterest: '', TikTok: '' },
  /* Form delivery. Paste a Formspree/Getform/Basin endpoint URL here to receive
     contact messages and newsletter sign-ups by email, e.g.
     'https://formspree.io/f/xxxxxxxx'. While empty, submissions are stored in
     this browser only (visible in admin.html). */
  formEndpoint: '',
  /* Admin account. Sign in on auth.html with this email + password and an
     "Admin" button appears in the navbar. FRONT-END ONLY: this is visible in
     the page source, so it is a convenience gate, not real security. */
  adminEmail: 'admin@klo-clothing.com',
  adminPassword: 'admin123'
};

/* ---------- PRODUCT CATALOG (single source of truth) ---------- */
var KLO_PRODUCTS = {
  m1: { id:"m1", name:"Waxed Field Jacket", price:248, oldPrice:null, category:"Outerwear", gender:"Men", image:"images/1544923246-77307dd654cb-800.jpg", desc:"A waxed-cotton field jacket built for daily wear through every season. Overbuilt seams and a storm flap keep it holding up long after fast-fashion outerwear gives out — and it only gets better with age.", colors:["Deep Teal","Midnight","Stone"] },
  m2: { id:"m2", name:"Heavyweight Tee", price:58, oldPrice:null, category:"Essentials", gender:"Men", image:"images/1622445275576-721325763afe-800.jpg", desc:"A 240gsm cotton tee cut for daily rotation. Heavier than most, so it holds its shape wash after wash instead of thinning out after one season.", colors:["Stone","Charcoal","Slate"] },
  m3: { id:"m3", name:"Straight Raw Denim", price:149, oldPrice:186, category:"Denim", gender:"Men", image:"images/1541099649105-f69ad21f3246-800.jpg", desc:"14oz selvedge denim in a straight leg cut. Raw and stiff out of the box, molded to you within a few weeks of wear.", colors:["Indigo","Midnight"] },
  m4: { id:"m4", name:"Reclaimed Wool Crew", price:128, oldPrice:null, category:"Knitwear", gender:"Men", image:"images/1614975059251-992f11792b9f-800.jpg", desc:"An 80% reclaimed wool crewneck, spun from post-consumer fiber without sacrificing warmth or structure.", colors:["Charcoal","Slate"] },
  m5: { id:"m5", name:"Long Wool Overcoat", price:298, oldPrice:null, category:"Outerwear", gender:"Men", image:"images/1591047139829-d91aecb6caea-800.jpg", desc:"A long wool-blend overcoat built for cold-weather daily wear, cut generous enough to layer a knit underneath.", colors:["Midnight","Charcoal"] },
  m6: { id:"m6", name:"Brushed Cotton Overshirt", price:96, oldPrice:null, category:"Essentials", gender:"Men", image:"images/1620799140408-edc6dcb6d633-800.jpg", desc:"A brushed twill overshirt that layers as a light jacket or buttons up as a shirt — built to be worn both ways for years.", colors:["Slate","Olive"] },
  m7: { id:"m7", name:"Denim Trucker Jacket", price:168, oldPrice:null, category:"Denim", gender:"Men", image:"images/1584370848010-d7fe6bc767ec-800.jpg", desc:"A washed indigo trucker jacket, cut close to the body with reinforced stitching at every stress point.", colors:["Washed Indigo","Midnight"] },
  m8: { id:"m8", name:"Mended-Edge Cardigan", price:142, oldPrice:null, category:"Knitwear", gender:"Men", image:"images/1516826957135-700dedea698c-800.jpg", desc:"A merino wool cardigan with a deliberately visible mended edge — a nod to the repairs we hope you'll never need, but will always honor.", colors:["Slate","Midnight"] },  w1: { id:"w1", name:"Tailored Wool Trench", price:268, oldPrice:null, category:"Outerwear", gender:"Women", image:"images/1539533018447-63fcce2678e3-800.jpg", desc:"A tailored virgin wool trench cut for structure through the shoulder and movement through the body.", colors:["Deep Teal","Midnight","Stone"] },
  w2: { id:"w2", name:"Relaxed Cotton Tee", price:54, oldPrice:null, category:"Essentials", gender:"Women", image:"images/1571945153237-4929e783af4a-800.jpg", desc:"A relaxed-fit 220gsm organic cotton tee, cut generous through the body for everyday layering.", colors:["Stone","Charcoal","Slate"] },
  w3: { id:"w3", name:"High-Rise Straight Denim", price:142, oldPrice:178, category:"Denim", gender:"Women", image:"images/1541099649105-f69ad21f3246-800.jpg", desc:"High-rise, straight-leg organic cotton denim built to hold its shape through repeated wear.", colors:["Indigo","Midnight"] },
  w4: { id:"w4", name:"Reclaimed Merino Sweater", price:132, oldPrice:null, category:"Knitwear", gender:"Women", image:"images/1576871337622-98d48d1cf531-800.jpg", desc:"An 80% reclaimed merino sweater, soft against the skin and durable enough for daily wear across seasons.", colors:["Charcoal","Slate"] },
  w5: { id:"w5", name:"Long Wool Coat", price:312, oldPrice:null, category:"Outerwear", gender:"Women", image:"images/1548126032-079a0fb0099d-800.jpg", desc:"A long wool-blend coat with clean lines, cut to layer easily over knitwear through the colder months.", colors:["Midnight","Charcoal"] },
  w6: { id:"w6", name:"Brushed Linen Shirt", price:92, oldPrice:null, category:"Essentials", gender:"Women", image:"images/1551803091-e20673f15770-800.jpg", desc:"A brushed linen-blend shirt, breathable enough for warm days and soft enough to wear on repeat.", colors:["Slate","Olive"] },
  w7: { id:"w7", name:"Cropped Denim Jacket", price:158, oldPrice:null, category:"Denim", gender:"Women", image:"images/1601333144130-8cbb312386b6-800.jpg", desc:"A cropped washed-indigo denim jacket, cut close through the body with reinforced seams throughout.", colors:["Washed Indigo","Midnight"] },
  w8: { id:"w8", name:"Mended-Edge Cardigan", price:138, oldPrice:null, category:"Knitwear", gender:"Women", image:"images/1610652492500-ded49ceeb378-800.jpg", desc:"A merino wool cardigan with a deliberately visible mended edge — a small reminder that repair is part of the design.", colors:["Slate","Midnight"] }
};
/* ===== KLO CART / WISHLIST DATA LAYER (localStorage) ===== */
function klo_getCart(){
  try { return JSON.parse(localStorage.getItem('klo_cart') || '[]'); }
  catch(e){ return []; }
}
function klo_setCart(cart){
  localStorage.setItem('klo_cart', JSON.stringify(cart));
  klo_updateCartBadge();
}
function klo_cartCount(){
  return klo_getCart().reduce((sum, item) => sum + item.qty, 0);
}
function klo_updateCartBadge(){
  const count = klo_cartCount();
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}
function klo_addToCart(product, color, size, qty){
  const cart = klo_getCart();
  const existing = cart.find(i => i.id === product.id && i.color === color && i.size === size);
  if (existing){
    existing.qty = Math.min(9, existing.qty + qty);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice || null,
      image: product.image,
      color: color,
      size: size,
      qty: qty
    });
  }
  klo_setCart(cart);
}
function klo_removeFromCart(index){
  const cart = klo_getCart();
  cart.splice(index, 1);
  klo_setCart(cart);
}
function klo_changeCartQty(index, delta){
  const cart = klo_getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, Math.min(9, cart[index].qty + delta));
  klo_setCart(cart);
}
function klo_clearCart(){
  klo_setCart([]);
}function klo_getWishlist(){
  try { return JSON.parse(localStorage.getItem('klo_wishlist') || '[]'); }
  catch(e){ return []; }
}
function klo_setWishlist(list){
  localStorage.setItem('klo_wishlist', JSON.stringify(list));
  klo_updateWishlistBadge();
}
function klo_updateWishlistBadge(){
  const count = klo_getWishlist().length;
  document.querySelectorAll('.wishlist-badge').forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}
function klo_isWished(id){
  return klo_getWishlist().some(i => i.id === id);
}
function klo_toggleWishlist(product){
  let list = klo_getWishlist();
  if (klo_isWished(product.id)){
    list = list.filter(i => i.id !== product.id);
  } else {
    list.push({ id: product.id, name: product.name, price: product.price, image: product.image });
  }
  klo_setWishlist(list);
  return klo_isWished(product.id);
}
function klo_removeFromWishlist(id){
  klo_setWishlist(klo_getWishlist().filter(i => i.id !== id));
}/* ===== KLO USER / AUTH / ORDER HISTORY (localStorage) ===== */
function klo_getUser(){
  try { return JSON.parse(localStorage.getItem('klo_user') || 'null'); }
  catch(e){ return null; }
}
function klo_setUser(user){
  localStorage.setItem('klo_user', JSON.stringify(user));
  klo_updateAccountIcon();
}
function klo_logout(){
  localStorage.removeItem('klo_user');
  klo_updateAccountIcon();
}
function klo_isLoggedIn(){
  return !!klo_getUser();
}
function klo_updateAccountIcon(){
  const user = klo_getUser();
  document.querySelectorAll('.account-icon-link').forEach(link => {
    const svgSlot = link.querySelector('.account-icon-default');
    const initialsSlot = link.querySelector('.account-icon-initials');
    if (!svgSlot || !initialsSlot) return;
    if (user){
      svgSlot.style.display = 'none';
      initialsSlot.style.display = 'flex';
      const initials = user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
      initialsSlot.textContent = initials;
      link.setAttribute('href', 'account.html');
    } else {
      svgSlot.style.display = 'flex';
      initialsSlot.style.display = 'none';
      link.setAttribute('href', 'auth.html');
    }
  });
}function klo_getOrders(){
  try { return JSON.parse(localStorage.getItem('klo_orders') || '[]'); }
  catch(e){ return []; }
}
function klo_addOrder(order){
  const orders = klo_getOrders();
  orders.unshift(order); // newest first
  localStorage.setItem('klo_orders', JSON.stringify(orders));
}function klo_getAddresses(){
  try { return JSON.parse(localStorage.getItem('klo_addresses') || '[]'); }
  catch(e){ return []; }
}
function klo_saveAddress(address){
  const list = klo_getAddresses();
  list.unshift(address);
  localStorage.setItem('klo_addresses', JSON.stringify(list.slice(0,5)));
}
function klo_removeAddress(index){
  const list = klo_getAddresses();
  list.splice(index, 1);
  localStorage.setItem('klo_addresses', JSON.stringify(list));
}/* Keep the registered-users "database" in sync when a profile is edited */
function klo_getRegisteredUsers(){
  try { return JSON.parse(localStorage.getItem('klo_registered_users') || '[]'); }
  catch(e){ return []; }
}
function klo_updateUserProfile(oldEmail, newData){
  const users = klo_getRegisteredUsers();
  const user = users.find(u => u.email.toLowerCase() === oldEmail.toLowerCase());
  if (user){
    user.name = newData.name;
    user.email = newData.email;
    user.phone = newData.phone;
    localStorage.setItem('klo_registered_users', JSON.stringify(users));
  }
}
function klo_registerUser(user){
    const users = klo_getRegisteredUsers();
    users.push(user);
    localStorage.setItem('klo_registered_users', JSON.stringify(users));
  }
  function klo_findUser(email, password){
    return klo_getRegisteredUsers().find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  }
  function klo_findUserByEmail(email){
    return klo_getRegisteredUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }
  function klo_updateUserPassword(email, newPassword){
    const users = klo_getRegisteredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) user.password = newPassword;
    localStorage.setItem('klo_registered_users', JSON.stringify(users));
  }

/* ---------- SHARED HEADER / FOOTER ---------- */
var KLO_ICONS = {"Instagram":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1\"/></svg>","Pinterest":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9 17c1-4 1-9 3-9s2 3 2 5-1 3-2 3\"/></svg>","TikTok":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\"><path d=\"M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5\"/><path d=\"M14 4c0 2.5 2 4.5 4.5 4.5\"/></svg>"};
function klo_headerHTML(active){
  var A = { men:'', women:'', story:'', wishlist:'', cart:'' };
  if (active === 'men' || active === 'women' || active === 'story') A[active] = ' class="active"';
  if (active === 'wishlist' || active === 'cart') A[active] = ' active-icon';
  return `<header class="navbar" id="navbar">
  <div class="container nav-inner">
    <a href="klo-homepage.html" class="logo">KLO <span class="tag">Keep Live Old</span></a>    <nav class="nav-links">
      <a href="klo-homepage.html">Home</a>
      <a href="men.html"${A.men}>Men</a>
      <a href="women.html"${A.women}>Women</a>
      <a href="our-story.html"${A.story}>Our Story</a>
    </nav>    <div class="nav-utils">
      <a href="search.html" class="icon-btn" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </a>
      <a href="wishlist.html" class="icon-btn${A.wishlist}" aria-label="Wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        <span class="cart-badge wishlist-badge" style="display:none;">0</span>
      </a>
      <a href="cart.html" class="icon-btn${A.cart}" aria-label="Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
        <span class="cart-badge" id="navCartBadge" style="display:none;">0</span>
      </a>
      <a href="auth.html" class="icon-btn account-icon-link" aria-label="Account">
        <span class="account-icon-default" style="display:flex;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </span>
        <span class="account-icon-initials"></span>
      </a>
      <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>  <div class="mobile-menu" id="mobileMenu">
    <ul>
      <li><a href="klo-homepage.html">Home</a></li>
      <li><a href="men.html"${A.men}>Men</a></li>
      <li><a href="women.html"${A.women}>Women</a></li>
      <li><a href="our-story.html"${A.story}>Our Story</a></li>
    </ul>
  </div>
</header>`;
}
function klo_footerHTML(){
  var social = Object.keys(KLO_CONFIG.social).filter(function(k){ return KLO_CONFIG.social[k]; }).map(function(k){
    return '<a href="' + KLO_CONFIG.social[k] + '" target="_blank" rel="noopener" aria-label="' + k + '">' + KLO_ICONS[k] + '</a>';
  }).join('');
  social = social ? '<div class="social-row">' + social + '</div>' : '';
  return `<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo-f">KLO</div>
        <p>Keep Live Old. Timeless clothing, built to be mended, not replaced.</p>
        ${social}
      </div>      <div class="footer-col">
        <h5>Shop</h5>
        <ul>
          <li><a href="men.html">Men</a></li>
          <li><a href="women.html">Women</a></li>
          <li><a href="men.html?category=outerwear">Outerwear</a></li>
          <li><a href="women.html?category=knitwear">Knitwear</a></li>
        </ul>
      </div>      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="our-story.html">Our Story</a></li>
          <li><a href="sustainability.html">Sustainability</a></li>
          <li><a href="repairs.html">Repairs</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>      <div class="footer-col">
        <h5>Newsletter</h5>
        <p style="font-size:13.5px; font-weight:300; color:rgba(255,255,255,0.55); margin-bottom:6px;">Get early access to new archives.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Your email address" aria-label="Email address for newsletter" required>
          <button type="submit">Sign up</button>
        </form>
        <div class="newsletter-note">One email a month. Unsubscribe anytime.</div>
      </div>
    </div>    <div class="footer-bottom">
      <span>© 2026 KLO — Keep Live Old. All rights reserved.</span>
      <div class="legal-links">
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="shipping.html">Shipping</a>
      </div>
    </div>
  </div>
</footer>`;
}
function klo_writeHeader(active){ document.write(klo_headerHTML(active)); }
function klo_writeFooter(){ document.write(klo_footerHTML()); }

/* ---------- NAV BEHAVIOUR (hamburger + scroll shadow) ---------- */
function klo_initNav(){
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var navbar = document.getElementById('navbar');
  if (hamburger && mobileMenu){
    hamburger.addEventListener('click', function(){
      var isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    document.querySelectorAll('.mobile-menu a').forEach(function(link){
      link.addEventListener('click', function(){
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  if (navbar){
    window.addEventListener('scroll', function(){
      navbar.style.boxShadow = window.scrollY > 12 ? '0 8px 24px rgba(1,20,37,0.06)' : 'none';
    });
  }
}

/* ---------- COOKIE BANNER ---------- */
function klo_initCookieBanner(){
  try { if (localStorage.getItem('klo_cookie_consent')) return; } catch(e){}
  var b = document.createElement('div');
  b.id = 'klo-cookie-banner';
  b.setAttribute('style', 'position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#011425;color:#fff;padding:14px 20px;font-size:13.5px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;font-family:inherit;');
  b.innerHTML = '<span style="max-width:640px;">We use cookies to improve your experience on this site. By continuing to browse, you agree to our use of cookies.</span>' +
    '<button id="klo-cookie-accept" style="background:#1f4959;color:#fff;border:none;padding:8px 18px;border-radius:4px;cursor:pointer;font-size:13.5px;">Accept</button>';
  document.body.appendChild(b);
  document.getElementById('klo-cookie-accept').addEventListener('click', function(){
    try { localStorage.setItem('klo_cookie_consent', '1'); } catch(e){}
    b.remove();
  });
}

/* ---------- FORMS: contact + newsletter ----------
   Every submission is saved to localStorage (klo_messages / klo_subscribers) so
   admin.html can list it. If KLO_CONFIG.formEndpoint is set it is ALSO posted
   there, which is what actually delivers it to you. Resolves true on success. */
function klo_readList(key){
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){ return []; }
}
function klo_sendToEndpoint(payload){
  if (!KLO_CONFIG.formEndpoint) return Promise.resolve(true);
  return fetch(KLO_CONFIG.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload)
  }).then(function(r){ return r.ok; }).catch(function(){ return false; });
}
function klo_submitContact(data){
  var list = klo_readList('klo_messages');
  list.unshift({ name: data.name, email: data.email, subject: data.subject || '', message: data.message, receivedAt: new Date().toISOString() });
  try { localStorage.setItem('klo_messages', JSON.stringify(list.slice(0, 200))); } catch(e){}
  return klo_sendToEndpoint({ _form: 'contact', name: data.name, email: data.email, subject: data.subject || '', message: data.message });
}
function klo_subscribe(email){
  var list = klo_readList('klo_subscribers');
  var exists = list.some(function(s){ return s.email.toLowerCase() === email.toLowerCase(); });
  if (exists) return Promise.resolve(true);
  list.unshift({ email: email, subscribedAt: new Date().toISOString() });
  try { localStorage.setItem('klo_subscribers', JSON.stringify(list.slice(0, 1000))); } catch(e){}
  return klo_sendToEndpoint({ _form: 'newsletter', email: email });
}
function klo_initNewsletter(){
  document.querySelectorAll('form.newsletter-form').forEach(function(form){
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var email = input ? input.value.trim() : '';
      var note = form.parentElement.querySelector('.newsletter-note');
      if (!note){
        note = document.createElement('div');
        note.className = 'newsletter-note';
        form.parentElement.appendChild(note);
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        note.textContent = 'Please enter a valid email address.';
        return;
      }
      note.textContent = 'Subscribing…';
      klo_subscribe(email).then(function(ok){
        note.textContent = ok ? 'Thanks for subscribing!' : 'Something went wrong. Please try again.';
        if (ok) form.reset();
      });
    });
  });
}

/* ---------- ADMIN ACCESS ---------- */
function klo_isAdminCredentials(email, password){
  return !!email && email.toLowerCase() === KLO_CONFIG.adminEmail.toLowerCase() && password === KLO_CONFIG.adminPassword;
}
function klo_isAdmin(){
  var u = klo_getUser();
  return !!(u && u.isAdmin && u.email && u.email.toLowerCase() === KLO_CONFIG.adminEmail.toLowerCase());
}
/* Adds an "Admin" button to the navbar (desktop links + mobile menu), admins only */
function klo_showAdminLink(){
  if (!klo_isAdmin()) return;
  var nav = document.querySelector('.nav-links');
  if (nav && !nav.querySelector('.admin-link')){
    var a = document.createElement('a');
    a.href = 'admin.html';
    a.className = 'admin-link';
    a.textContent = 'Admin';
    nav.appendChild(a);
  }
  var menu = document.querySelector('.mobile-menu ul');
  if (menu && !menu.querySelector('.admin-link')){
    var li = document.createElement('li');
    li.innerHTML = '<a href="admin.html" class="admin-link">Admin</a>';
    menu.appendChild(li);
  }
}

/* Fill any [data-klo] element from KLO_CONFIG (email, phone, address, ...) */
function klo_applyConfig(){
  document.querySelectorAll('[data-klo]').forEach(function(el){
    var v = KLO_CONFIG[el.getAttribute('data-klo')];
    if (v == null) return;
    el.textContent = v;
    if (el.tagName === 'A' && el.getAttribute('data-klo') === 'email') el.setAttribute('href', 'mailto:' + v);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  klo_applyConfig();
  klo_showAdminLink();
  klo_updateCartBadge();
  klo_updateWishlistBadge();
  klo_updateAccountIcon();
  klo_initNav();
  klo_initCookieBanner();
  klo_initNewsletter();
});

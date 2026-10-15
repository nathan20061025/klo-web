#!/usr/bin/env node
/*
  Point the whole site at your real domain in one step:

      node set-domain.js https://www.yourshop.com

  Updates: sitemap.xml, robots.txt, the product JSON-LD, KLO_CONFIG.siteUrl in
  klo.js, and the <link rel="canonical"> tag on every public page.
  Safe to run again with a different domain.
*/
const fs = require('fs');

const arg = process.argv[2];
if (!arg || !/^https?:\/\/[^\s/]+\.[^\s/]+/.test(arg)) {
  console.error('Usage: node set-domain.js https://www.yourshop.com');
  process.exit(1);
}
const site = arg.replace(/\/+$/, '');

// Pages that should not appear in search results (private or transactional).
const NOINDEX = ['account', 'auth', 'cart', 'checkout', 'confirmation', 'wishlist', 'search', 'admin', '404'];

function edit(file, fn) {
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (after !== before) { fs.writeFileSync(file, after); console.log('updated', file); }
}

const origin = /https?:\/\/(?:example\.com|[^\s"'<>/]+)(?=\/(?:klo-homepage|men|women|product|search|cart|checkout|confirmation|wishlist|account|auth|our-story|sustainability|repairs|shipping|contact|faq|privacy|terms|404|sitemap)\b)/g;

edit('sitemap.xml', t => t.replace(origin, site));
edit('robots.txt', t => t.replace(/^Sitemap:.*$/m, 'Sitemap: ' + site + '/sitemap.xml'));
edit('klo.js', t => t.replace(/(siteUrl:\s*')[^']*(')/, '$1' + site + '$2'));

for (const f of fs.readdirSync('.').filter(f => /\.(html|htm)$/.test(f))) {
  const name = f.replace(/\.(html|htm)$/, '');
  if (NOINDEX.includes(name)) continue;
  edit(f, t => {
    const href = site + '/' + f;
    if (/<link rel="canonical"/.test(t)) return t.replace(/(<link rel="canonical" href=")[^"]*(")/, '$1' + href + '$2');
    return t.replace('</head>', '<link rel="canonical" href="' + href + '">\n</head>');
  });
}
edit('product.html', t => t.replace(/("url":\s*")[^"]*(")/, '$1' + site + '/product.html$2'));
console.log('\nDone. Domain set to ' + site);

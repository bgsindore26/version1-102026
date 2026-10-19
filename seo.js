/* ============================================================
   MyPersonalCreditScore.com — Complete SEO Script
   Version: 1.0.0
   Description: Dynamically injects meta tags, Open Graph,
                Twitter Cards, canonical URLs, and JSON-LD
                structured data based on the current page.
   Usage: <script src="/seo.js"></script> in <head>
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     CONFIGURATION
     ========================================================== */
  var SITE = {
    name:        'MyPersonalCreditScore.com',
    domain:      'https://mypersonlcreditscore.com',
    logo:        'https://mypersonlcreditscore.com/logo.png',
    email:       'info@mypersonlcreditscore.com',
    twitter:     '@mypersonlcredit', // update if you have a Twitter handle
    description: 'An independent referral service connecting you with trusted credit monitoring, building, and protection tools.'
  };

  /* ==========================================================
     PAGE DEFINITIONS
     Each page key maps to a path (last segment of URL).
     Adjust paths to match your actual file names.
     ========================================================== */
  var PAGES = {
    home: {
      path:        '/',
      title:       'MyPersonalCreditScore.com — Check, Build & Protect Your Credit Score',
      description: 'One simple place to reach trusted credit tools and bureaus. Check, build and protect your credit score with our trusted partners.',
      keywords:    'credit score, credit monitoring, credit builder, credit repair, identity protection, free credit score, credit partners',
      ogType:      'website',
      priority:    '1.0',
      changefreq:  'weekly',
      index:       true
    },
    about: {
      path:        '/about',
      title:       'About Us — MyPersonalCreditScore.com',
      description: 'Learn who we are and how MyPersonalCreditScore.com operates as an independent referral service connecting you with trusted credit tools.',
      keywords:    'about mypersonalcreditscore, credit referral service, independent credit hub',
      ogType:      'website',
      priority:    '0.8',
      changefreq:  'monthly',
      index:       true
    },
    contact: {
      path:        '/contact',
      title:       'Contact Us — MyPersonalCreditScore.com',
      description: 'Have a question or need help? Contact MyPersonalCreditScore.com by email at info@mypersonlcreditscore.com or use our contact form.',
      keywords:    'contact mypersonalcreditscore, credit score help, customer support',
      ogType:      'website',
      priority:    '0.8',
      changefreq:  'monthly',
      index:       true
    },
    privacy: {
      path:        '/privacy',
      title:       'Privacy Policy — MyPersonalCreditScore.com',
      description: 'Read the Privacy Policy for MyPersonalCreditScore.com to understand how we collect, use, and protect your information.',
      keywords:    'privacy policy, data protection, information collection',
      ogType:      'article',
      priority:    '0.5',
      changefreq:  'yearly',
      index:       false
    },
    terms: {
      path:        '/terms',
      title:       'Terms of Service — MyPersonalCreditScore.com',
      description: 'Read the Terms of Service for MyPersonalCreditScore.com. We are an independent referral service, not a credit bureau.',
      keywords:    'terms of service, website terms, user agreement',
      ogType:      'article',
      priority:    '0.5',
      changefreq:  'yearly',
      index:       false
    },
    disclosures: {
      path:        '/disclosures',
      title:       'Disclosures — MyPersonalCreditScore.com',
      description: 'Important disclosures about MyPersonalCreditScore.com, including our role as a referral service, affiliate compensation, and third-party responsibilities.',
      keywords:    'disclosures, affiliate disclosure, FTC disclosure, credit referral',
      ogType:      'article',
      priority:    '0.5',
      changefreq:  'yearly',
      index:       false
    },
    sitemap: {
      path:        '/sitemap',
      title:       'Sitemap — MyPersonalCreditScore.com',
      description: 'Full sitemap of MyPersonalCreditScore.com. Find all pages, legal information, and partner links in one place.',
      keywords:    'sitemap, site navigation, all pages',
      ogType:      'website',
      priority:    '0.6',
      changefreq:  'monthly',
      index:       false
    }
  };

  /* ==========================================================
     HELPERS
     ========================================================== */
  function getCurrentPageKey() {
    var path = window.location.pathname.replace(/\/+$/, '') || '/';
    var base = path.split('/').pop().replace(/\.html?$/, '').toLowerCase();

    // Homepage
    if (base === '' || base === 'index' || path === '/') return 'home';

    // Match against known page keys
    var keys = Object.keys(PAGES);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === base) return key;
      if (PAGES[key].path.replace(/^\//, '') === base) return key;
    }

    // Fallback: try filename match
    if (PAGES[base]) return base;

    return 'home';
  }

  function getFullUrl(path) {
    return SITE.domain.replace(/\/+$/, '') + path;
  }

  function createMeta(attrName, attrValue, content) {
    if (!content) return;
    var el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }

  function createLink(rel, href, extra) {
    if (!href) return;
    var el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('href', href);
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        el.setAttribute(k, extra[k]);
      });
    }
    document.head.appendChild(el);
  }

  function createJSONLD(id, data) {
    var existing = document.getElementById(id);
    if (existing) existing.remove();
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  /* ==========================================================
     META TAG INJECTION
     ========================================================== */
  function injectMeta(page) {
    var fullUrl = getFullUrl(page.path);
    var fullTitle = page.title;

    // Basic meta
    document.title = fullTitle;
    createMeta('name', 'description', page.description);
    createMeta('name', 'keywords', page.keywords);
    createMeta('name', 'robots', (page.index ? 'index' : 'noindex') + ', follow');
    createMeta('name', 'author', SITE.name);
    createMeta('name', 'viewport', 'width=device-width, initial-scale=1.0');
    createMeta('http-equiv', 'X-UA-Compatible', 'IE=edge');
    createMeta('name', 'theme-color', '#0a1a4a');

    // Canonical
    createLink('canonical', fullUrl);

    // Open Graph
    createMeta('property', 'og:type', page.ogType || 'website');
    createMeta('property', 'og:title', fullTitle);
    createMeta('property', 'og:description', page.description);
    createMeta('property', 'og:url', fullUrl);
    createMeta('property', 'og:site_name', SITE.name);
    createMeta('property', 'og:locale', 'en_US');
    createMeta('property', 'og:image', SITE.logo);
    createMeta('property', 'og:image:alt', SITE.name + ' logo');

    // Twitter Card
    createMeta('name', 'twitter:card', 'summary_large_image');
    createMeta('name', 'twitter:title', fullTitle);
    createMeta('name', 'twitter:description', page.description);
    createMeta('name', 'twitter:image', SITE.logo);
    createMeta('name', 'twitter:site', SITE.twitter);
    createMeta('name', 'twitter:creator', SITE.twitter);

    // Extra
    createMeta('name', 'format-detection', 'telephone=no');
    createMeta('name', 'referrer', 'strict-origin-when-cross-origin');
  }

  /* ==========================================================
     JSON-LD STRUCTURED DATA
     ========================================================== */
  function injectStructuredData(pageKey, page) {
    var fullUrl = getFullUrl(page.path);

    // Organization — always
    createJSONLD('ld-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.domain,
      logo: SITE.logo,
      email: SITE.email,
      description: SITE.description,
      contactPoint: {
        '@type': 'ContactPoint',
        email: SITE.email,
        contactType: 'customer support',
        availableLanguage: 'English'
      }
    });

    // WebSite — always
    createJSONLD('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.domain,
      description: SITE.description,
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.domain
      }
    });

    // Page-specific
    if (pageKey === 'home') {
      createJSONLD('ld-webpage', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        url: fullUrl,
        description: page.description,
        isPartOf: { '@id': SITE.domain + '#website' },
        about: {
          '@type': 'Thing',
          name: 'Credit Scores and Credit Monitoring'
        },
        mainEntity: {
          '@type': 'ItemList',
          name: 'Trusted Credit Partners',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'IdentityIQ', url: 'https://www.identityiq.com' },
            { '@type': 'ListItem', position: 2, name: 'Credit Karma', url: 'https://www.creditkarma.com' },
            { '@type': 'ListItem', position: 3, name: 'Kikoff', url: 'https://www.kikoff.com' },
            { '@type': 'ListItem', position: 4, name: 'Self', url: 'https://www.self.inc' }
          ]
        }
      });
    } else if (pageKey === 'about') {
      createJSONLD('ld-about', {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: page.title,
        url: fullUrl,
        description: page.description,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.domain,
          email: SITE.email,
          description: SITE.description
        }
      });
    } else if (pageKey === 'contact') {
      createJSONLD('ld-contact', {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: page.title,
        url: fullUrl,
        description: page.description,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          email: SITE.email,
          contactPoint: {
            '@type': 'ContactPoint',
            email: SITE.email,
            contactType: 'customer support',
            availableLanguage: 'English'
          }
        }
      });
    } else if (pageKey === 'privacy' || pageKey === 'terms' || pageKey === 'disclosures') {
      createJSONLD('ld-legal', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        url: fullUrl,
        description: page.description,
        isPartOf: { '@id': SITE.domain + '#website' },
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.domain
        }
      });
    } else if (pageKey === 'sitemap') {
      createJSONLD('ld-sitemap', {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        url: fullUrl,
        description: page.description,
        isPartOf: { '@id': SITE.domain + '#website' }
      });
    }

    // BreadcrumbList — for non-home pages
    if (pageKey !== 'home') {
      createJSONLD('ld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE.domain + '/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.title.split(' — ')[0],
            item: fullUrl
          }
        ]
      });
    }
  }

  /* ==========================================================
     CLEAN EXISTING (avoid duplicates on re-runs)
     ========================================================== */
  function removeExistingMeta() {
    var selectors = [
      'meta[name="description"]',
      'meta[name="keywords"]',
      'meta[name="robots"]',
      'meta[name="author"]',
      'meta[name="viewport"]',
      'meta[name="theme-color"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:site"]',
      'meta[name="twitter:creator"]',
      'meta[property^="og:"]',
      'link[rel="canonical"]'
    ];
    selectors.forEach(function (sel) {
      var nodes = document.querySelectorAll(sel);
      for (var i = 0; i < nodes.length; i++) nodes[i].remove();
    });
  }

  /* ==========================================================
     PERFORMANCE / UX SEO BOOSTS
     ========================================================== */
  function applyPerformanceHints() {
    // Preconnect to external resources
    var preconnects = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.web3forms.com'
    ];
    preconnects.forEach(function (href) {
      var exists = document.querySelector('link[rel="preconnect"][href="' + href + '"]');
      if (!exists) {
        var el = document.createElement('link');
        el.rel = 'preconnect';
        el.href = href;
        el.crossOrigin = 'anonymous';
        document.head.appendChild(el);
      }
    });

    // Lazy-load images
    var imgs = document.querySelectorAll('img:not([loading])');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute('loading', 'lazy');
      if (!imgs[i].getAttribute('alt')) {
        imgs[i].setAttribute('alt', SITE.name);
      }
    }

    // Add rel="noopener noreferrer" to all target="_blank" links
    var links = document.querySelectorAll('a[target="_blank"]');
    for (var j = 0; j < links.length; j++) {
      if (links[j].rel.indexOf('noopener') === -1) {
        links[j].rel += ' noopener noreferrer';
      }
    }

    // Add aria-label to links with no text (icons)
    var iconLinks = document.querySelectorAll('a:not([aria-label])');
    for (var k = 0; k < iconLinks.length; k++) {
      var text = (iconLinks[k].textContent || '').trim();
      if (!text && iconLinks[k].querySelector('svg')) {
        var svg = iconLinks[k].querySelector('svg');
        var alt = svg.getAttribute('aria-label') || svg.getAttribute('data-label') || 'Link';
        iconLinks[k].setAttribute('aria-label', alt);
      }
    }
  }

  /* ==========================================================
     INIT
     ========================================================== */
  function init() {
    try {
      var pageKey = getCurrentPageKey();
      var page = PAGES[pageKey] || PAGES.home;

      removeExistingMeta();
      injectMeta(page);
      injectStructuredData(pageKey, page);
      applyPerformanceHints();

      // Debug (remove in production if desired)
      console.log('[SEO] Loaded:', pageKey, '—', page.title);
    } catch (err) {
      console.warn('[SEO] Error initializing SEO script:', err);
    }
  }

  // Run as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ==========================================================
     EXPOSE FOR DEBUGGING / MANUAL USE
     ========================================================== */
  window.MPCSEO = {
    config: SITE,
    pages: PAGES,
    refresh: init
  };
})();

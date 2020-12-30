workbox.routing.registerRoute(
  new RegExp('^https://blog.sa2taka.com/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'page-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14, // for 2 weeks
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp(
    '^https://cdn.contentful.com/spaces/xw0ljpdch9v4/environments/master/'
  ),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'entry-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14, // for 2 weeks
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('^https?://images.ctfassets.net/xw0ljpdch9v4/.*.(png|jpg|webp)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 14, // for 2 weeks
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('^https://fonts.googleapis.com/'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30, // for 1 month
      }),
    ],
  })
);

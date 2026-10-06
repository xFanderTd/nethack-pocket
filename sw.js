/* NetHack Pocket service worker: keeps the whole game on the device.
   Cache-first for everything in the bundle, so launches never wait on the network.
   A new build gets a new VERSION; the browser notices the changed sw.js on the next
   online launch, installs it in the background and the following launch uses it. */
const VERSION = "nhpocket-dd908bbf9d94";
const ASSETS = [
  "./",
  "index.html",
  "nethack.wasm",
  "manifest.webmanifest",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "fonts/alegreya-sans-cyrillic-400-normal.woff2",
  "fonts/alegreya-sans-cyrillic-500-normal.woff2",
  "fonts/alegreya-sans-cyrillic-700-normal.woff2",
  "fonts/alegreya-sans-latin-400-normal.woff2",
  "fonts/alegreya-sans-latin-500-normal.woff2",
  "fonts/alegreya-sans-latin-700-normal.woff2",
  "fonts/im-fell-english-sc-latin-400-normal.woff2",
  "fonts/jetbrains-mono-cyrillic-400-normal.woff2",
  "fonts/jetbrains-mono-cyrillic-500-normal.woff2",
  "fonts/jetbrains-mono-cyrillic-700-normal.woff2",
  "fonts/jetbrains-mono-latin-400-normal.woff2",
  "fonts/jetbrains-mono-latin-500-normal.woff2",
  "fonts/jetbrains-mono-latin-700-normal.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(ASSETS.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("nhpocket-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(
      caches.open(VERSION).then((cache) => cache.match("index.html").then((hit) => hit || fetch(req)))
    );
    return;
  }
  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req))
    )
  );
});

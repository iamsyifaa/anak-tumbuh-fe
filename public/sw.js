const VERSION = "v1";
const STATIC_CACHE = `anaktumbuh-static-${VERSION}`;
const RUNTIME_CACHE = `anaktumbuh-runtime-${VERSION}`;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  "/",
  "/dashboard/student",
  "/dashboard/student/recap",
  "/dashboard/student/leaderboard",
  "/dashboard/student/profile",
  OFFLINE_URL,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/assets/student/main-character.png",
  "/assets/student/girl-avatar.png",
  "/assets/student/boy-avatar.png",
  "/assets/student/wake-up.png",
  "/assets/student/prayer.png",
  "/assets/student/sports.png",
  "/assets/student/healthy-food.png",
  "/assets/student/reading.png",
  "/assets/student/community.png",
  "/assets/student/early-sleep.png",
  "/assets/student/star.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("anaktumbuh-") &&
                key !== STATIC_CACHE &&
                key !== RUNTIME_CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const isSameOrigin = (request) => {
  try {
    return new URL(request.url).origin === self.location.origin;
  } catch {
    return false;
  }
};

const putInCache = async (cacheName, request, response) => {
  if (!response || response.status !== 200 || response.type === "opaque") return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
};

const handleNavigation = async (request) => {
  try {
    const response = await fetch(request);
    await putInCache(RUNTIME_CACHE, request, response);
    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match(new URL(request.url).pathname)) ||
      (await caches.match(OFFLINE_URL))
    );
  }
};

const handleStaticAsset = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    await putInCache(RUNTIME_CACHE, request, response);
    return response;
  } catch {
    return Response.error();
  }
};

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !isSameOrigin(request)) return;

  const url = new URL(request.url);
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/data/")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  if (
    url.pathname.startsWith("/_next/static/") ||
    ["script", "style", "font", "image"].includes(request.destination)
  ) {
    event.respondWith(handleStaticAsset(request));
  }
});

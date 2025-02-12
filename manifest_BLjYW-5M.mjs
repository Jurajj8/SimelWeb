import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './resources/astro/server-C8ktlQBU.js';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/","cacheDir":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/node_modules/.astro/","outDir":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/dist/","srcDir":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/src/","publicDir":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/public/","buildClientDir":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/dist/client/","buildServerDir":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/dist/server/","adapterName":"","routes":[{"file":"file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/dist/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["F:/Stiahnuté/astrolus/astro-theme/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_BLjYW-5M.mjs","F:/Stiahnuté/astrolus/astro-theme/src/components/HeroSection.astro?astro&type=script&index=0&lang.ts":"resources/HeroSection.astro_astro_type_script_index_0_lang-B_xHgElH.js","F:/Stiahnuté/astrolus/astro-theme/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"resources/Layout.astro_astro_type_script_index_0_lang-7HEdnl7z.js","F:/Stiahnuté/astrolus/astro-theme/src/components/CallToAction.astro?astro&type=script&index=0&lang.ts":"resources/CallToAction.astro_astro_type_script_index_0_lang-CdDEByCL.js","F:/Stiahnuté/astrolus/astro-theme/src/components/AppHeader.astro?astro&type=script&index=0&lang.ts":"resources/AppHeader.astro_astro_type_script_index_0_lang-Bseyifur.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["F:/Stiahnuté/astrolus/astro-theme/src/components/CallToAction.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const d=document.getElementById(\"open-contact-modal\"),e=document.getElementById(\"contact-modal\"),n=document.getElementById(\"close-modal\");d&&e&&d.addEventListener(\"click\",t=>{t.preventDefault(),e.classList.remove(\"hidden\")}),n&&n.addEventListener(\"click\",()=>{e.classList.add(\"hidden\")}),window.addEventListener(\"click\",t=>{t.target===e&&e.classList.add(\"hidden\")})});"],["F:/Stiahnuté/astrolus/astro-theme/src/components/AppHeader.astro?astro&type=script&index=0&lang.ts","let e=!1;const t=document.querySelector(\"#nav\"),n=document.querySelector(\"#hamburger\"),r=[...t.querySelector(\"#links-group\").children];function s(){e?t.dataset.state=\"active\":t.dataset.state=\"\"}n.addEventListener(\"click\",()=>{e=!e,s()});r.forEach(a=>{a.addEventListener(\"click\",()=>{e=!e,s()})});window.addEventListener(\"scroll\",()=>{window.scrollY>0?t.classList.add(\"dark:bg-gray-900\"):t.classList.remove(\"dark:bg-gray-900\")});"]],"assets":["/file:///F:/Stiahnut%C3%A9/astrolus/astro-theme/dist/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"ruWA3NKV4ctQPPz8aY3Dfblrn3Aw6v15n9/IMdbU9Uk="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

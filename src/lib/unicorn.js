// Pinned to the SDK version returned by Unicorn Studio's publish guide.
const SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.4.3/dist/unicornStudio.umd.js";
let runtimePromise;

export function loadUnicorn() {
  if (window.UnicornStudio?.addScene)
    return Promise.resolve(window.UnicornStudio);
  if (runtimePromise) return runtimePromise;
  runtimePromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    const timeout = window.setTimeout(() => fail(), 12_000);
    function fail() {
      clearTimeout(timeout);
      script.remove();
      runtimePromise = undefined;
      reject(new Error("The scene runtime could not be loaded."));
    }
    script.onload = () => {
      clearTimeout(timeout);
      if (window.UnicornStudio?.addScene) resolve(window.UnicornStudio);
      else fail();
    };
    script.onerror = fail;
    document.head.append(script);
  });
  return runtimePromise;
}

export const portfolioScene = {
  projectId: "DosReY37TV4cLtWoFYsj",
  // This is the actual publish mode returned by the connected account.
  production: false,
  fps: 30,
  scale: 0.8,
  dpi: 1,
  lazyLoad: false,
};

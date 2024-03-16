import { link, template } from "./commons.js";

for (const noscript of document.getElementsByTagName("noscript")) {
    noscript.remove();
}

link.initialize({ source: "https://fonts.googleapis.com", isPreconnect: true });
link.initialize({ source: "https://fonts.gstatic.com", isPreconnect: true, isCrossOrigin: true });
link.initialize({ source: "https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap" });

const fontPromise = link.initialize({
    source: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
});

fontPromise.then(() => document.body.setAttribute("style", "font-family: 'Inter', sans-serif; font-size: 1rem;"));

const commonPromise = link.initialize({ source: "commons", isRaw: false });
commonPromise.then(() => {
    template.initialize({ source: "loader" });
    document.body.classList.add("m0", "w100vw", "max-w100vw", "min-h100vh");
});

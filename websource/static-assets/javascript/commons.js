export const link = {
    ext: ".css",
    home: "./static-assets/stylesheets/",
    load: (element = document.createElement("link")) => {
        const promise = new Promise((resolve, reject) => {
            element.onload = () => resolve(element);
            element.onerror = element.onabort = element.oncancel = () => reject(element);
        });
        document.head.appendChild(element);
        return promise;
    },
    create: ({ source = "", isRaw = true, isPreconnect = false, isCrossOrigin = false }) => {
        const element = document.createElement("link");
        element.href = isRaw ? source : link.home + source + link.ext;
        element.rel = isPreconnect ? "preconnect" : "stylesheet";
        if (isCrossOrigin) {
            element.toggleAttribute("crossorirgin");
        }
        return { element: element, load: () => link.load(element) };
    },
    initialize: ({ source = "", isRaw = true, isPreconnect = false, isCrossOrigin = false }) => {
        return link.create({ source, isRaw, isPreconnect, isCrossOrigin }).load();
    },
};

export const script = {
    ext: ".js",
    home: "./static-assets/javascript/",
    load: (element = document.createElement("script")) => {
        const promise = new Promise((resolve, reject) => {
            element.onload = () => resolve(element);
            element.onerror = element.onabort = element.oncancel = () => reject(element);
        });
        document.body.appendChild(element);
        return promise;
    },
    create: ({ source = "", isModule = true }) => {
        const element = document.createElement("script");
        element.src = script.home + source + script.ext;
        if (isModule) {
            element.type = "module";
        }
        return { element: element, load: () => script.load(element) };
    },
    initialize: ({ source = "", isModule = true }) => {
        return script.create({ source, isModule }).load();
    },
};

export const template = {
    ext: ".xhtml",
    home: "./static-assets/templates/",
    method: "GET",
    fetch: ({ source = "" }) => {
        const request = new XMLHttpRequest();
        const promise = new Promise((resolve, reject) => {
            request.onreadystatechange = () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status !== 200) {
                    return reject(request);
                }
                const temporary = document.createElement("section");
                temporary.innerHTML = request.responseText.trim();
                resolve([...temporary.childNodes]);
            };
        });
        request.open(template.method, template.home + source + template.ext);
        request.send();
        return promise;
    },
    append: (element = document.createElement("section"), before = document.getElementById("script")) => {
        const promise = new Promise((resolve, reject) => {
            element.onload = () => resolve(element);
            element.onerror = element.onabort = element.oncancel = () => reject(element);
        });
        document.body.insertBefore(element, before);
        return promise;
    },
    initialize: async ({ source = "" }) => {
        const elements = await template.fetch({ source });
        return Promise.all(elements.map(element => template.append(element)));
    },
};

script.initialize({ source: "initializer" });

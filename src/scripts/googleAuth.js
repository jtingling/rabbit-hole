
export const loadGoogleScript = () => {
    (function () {
        const id = 'google-js';
        const src = 'https://apis.google.com/js/api.js';
        const firstJs = document.getElementsByTagName('script')[0];
        // Prevent script from loading twice
        if (document.getElementById(id)) { return; }
        const js = document.createElement('script');
        js.id = id;
        js.src = src;
        js.defer = true;
        js.async = true;
        js.onreadystatechange="if (this.readyState === 'complete' this.onload()"
        js.onload = window.onGoogleScriptLoad;
        firstJs.parentNode.insertBefore(js, firstJs);
    }());
}

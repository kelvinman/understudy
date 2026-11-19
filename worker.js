// Sends www and plain http to https://understudyui.com so the site has one address, then serves the static site.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.understudyui.com" || url.protocol === "http:") {
      url.hostname = "understudyui.com";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};

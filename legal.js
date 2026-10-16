// Language switch for the privacy / permissions pages: ?lang=xx, else the browser language, else Dutch.
(function () {
  const langs = ["nl", "fr", "en"];
  const fromUrl = new URLSearchParams(location.search).get("lang");
  const fromBrowser = (navigator.language || "").slice(0, 2).toLowerCase();
  let lang = langs.includes(fromUrl) ? fromUrl : langs.includes(fromBrowser) ? fromBrowser : "nl";
  const titles = JSON.parse(document.body.dataset.titles || "{}");
  function apply(l) {
    lang = l;
    document.documentElement.lang = l;
    if (titles[l]) document.title = titles[l];
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.set === l)));
    const url = new URL(location.href);
    url.searchParams.set("lang", l);
    history.replaceState(null, "", url);
    document.querySelectorAll("a[data-keep-lang]").forEach((a) => {
      const u = new URL(a.href, location.href);
      u.searchParams.set("lang", l);
      a.href = u.toString();
    });
  }
  document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => apply(b.dataset.set)));
  apply(lang);
})();

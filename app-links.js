// Open the assessment app in the language chosen on the site
const appLinks = document.querySelectorAll("[data-app-link]");
function syncAppLinks() {
  appLinks.forEach((link) => {
    const url = new URL(link.href);
    url.searchParams.set("lang", languageSelect.value);
    link.href = url.toString();
  });
}
languageSelect.addEventListener("change", syncAppLinks);
syncAppLinks();

function getImgUrl(name) {
  return new URL(`../src/assets/book/${name}`, import.meta.url).href;
}

export { getImgUrl };

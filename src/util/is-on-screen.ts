// returns true if element, with offset level of extra padding, is slightly on screen
const isOnScreen = (element: Element, offset?: number[] | number) => {
  if (typeof window === "undefined") return false;
  const rect = element.getBoundingClientRect();
  const offsetX = !offset ? 0 : typeof offset === "number" ? offset : offset[0];
  const offsetY = !offset ? 0 : typeof offset === "number" ? offset : offset[1];
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top - offsetY <= windowHeight &&
    rect.bottom + offsetY >= 0 &&
    rect.left - offsetX <= windowWidth &&
    rect.right + offsetX >= 0
  );
};

export default isOnScreen;

export const safeQuerySelector = <E extends Element>(element: E | null) => {
  if (!element) {
    throw new Error('Element not found');
  }
  return element;
}

export default (
  elementId: string,
  callback: (event: Event, props?: any) => void,
  props?: object,
) => {
  document.addEventListener('click', (evn) => {
    const target = evn.target as HTMLInputElement;
    const targetIsMounted = target.closest(elementId);
    if (targetIsMounted) {
      callback(evn, props);
    }
  });
};

import { useEffect, useRef, useState } from 'react';

export const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce !== false) {
          observer.unobserve(el);
        }
      } else if (options.triggerOnce === false) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      ...options
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.triggerOnce, options.threshold]);

  return [ref, isInView];
};
export default useReveal;



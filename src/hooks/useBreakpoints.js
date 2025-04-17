import { useEffect, useState } from "react";

export function useBreakpoints() {
  const [downMd, setDownMd] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    const handler = (event) => {
      setDownMd(event.matches);
    };
    mediaQuery.addEventListener("change", handler);
    setDownMd(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return { downMd };
}

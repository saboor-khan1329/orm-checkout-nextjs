"use client";

import { useEffect, useState } from "react";

export default function useBreakpoint(breakpoint = 1199) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width:${breakpoint}px)`);

    const update = () => {
      setIsDesktop(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

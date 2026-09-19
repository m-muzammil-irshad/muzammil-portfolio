import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let hover = false;
    const cursor = cursorRef.current;
    if (!cursor) return;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    let animationFrame = 0;
    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      animationFrame = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMouseMove);
    const cursorElements = document.querySelectorAll("[data-cursor]");
    const mouseOverHandlers = new Map<HTMLElement, (event: MouseEvent) => void>();
    const mouseOutHandlers = new Map<HTMLElement, () => void>();

    cursorElements.forEach((item) => {
      const element = item as HTMLElement;
      const onMouseOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          //   cursor.style.transform = `translate(${rect.left}px,${rect.top}px)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };
      const onMouseOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };
      mouseOverHandlers.set(element, onMouseOver);
      mouseOutHandlers.set(element, onMouseOut);
      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);
    });

    animationFrame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", onMouseMove);
      cursorElements.forEach((item) => {
        const element = item as HTMLElement;
        const onMouseOver = mouseOverHandlers.get(element);
        const onMouseOut = mouseOutHandlers.get(element);
        if (onMouseOver) element.removeEventListener("mouseover", onMouseOver);
        if (onMouseOut) element.removeEventListener("mouseout", onMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;

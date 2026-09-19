import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      return;
    }

    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    const linkHandlers: Array<{
      element: HTMLAnchorElement;
      handler: (event: Event) => void;
    }> = [];
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handler = (e: Event) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const section = target.getAttribute("data-href");
          smoother?.scrollTo(section, true, "top top");
        }
      };
      element.addEventListener("click", handler);
      linkHandlers.push({ element, handler });
    });
    const onResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", onResize);

    return () => {
      linkHandlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", onResize);
      smoother?.kill();
      smoother = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          MMI
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

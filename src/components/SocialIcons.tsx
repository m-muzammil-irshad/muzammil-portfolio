import {
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiHuggingface } from "react-icons/si";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;
    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a");
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let animationFrame = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animationFrame = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      cleanups.push(() => {
        cancelAnimationFrame(animationFrame);
        document.removeEventListener("mousemove", onMouseMove);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/m-muzammil-irshad?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/muhammad-muzammil-irshad-05b863333/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://huggingface.co/mmuzammilirshad/spaces"
            target="_blank"
            rel="noreferrer"
          >
            <SiHuggingface />
          </a>
        </span>
        <span>
          <a
            href="https://youtube.com/@autoaiacademy?si=d9ABTXFdhr4ee1eN"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube />
          </a>
        </span>
        <span>
          <a
            href="https://wa.me/923292540897"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Muhammad_Muzammil_Irshad_CV.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;

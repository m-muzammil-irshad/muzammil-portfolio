import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const clickHandlersRef = useRef(new Map<HTMLDivElement, () => void>());
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    const containers = containerRef.current;
    const clickHandlers = clickHandlersRef.current;
    if (ScrollTrigger.isTouch) {
      containers.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          const handler = () => handleClick(container);
          container.addEventListener("click", handler);
          clickHandlers.set(container, handler);
        }
      });
    }
    return () => {
      containers.forEach((container) => {
        if (container) {
          const handler = clickHandlers.get(container);
          if (handler) container.removeEventListener("click", handler);
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>RESEARCH</h3>
              <h4>Machine Learning for Real-World Robustness &amp; Safety</h4>
              <p>
                I research how machine learning systems handle real-world
                complexity—from incremental learning for insider threat detection
                under concept drift, to deep learning models that distinguish
                genuinely harmful cyberbullying from non-harmful teasing.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Concept drift</div>
                <div className="what-tags">Incremental learning</div>
                <div className="what-tags">Insider threat detection</div>
                <div className="what-tags">Cyberbullying detection</div>
                <div className="what-tags">Deep learning</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>AI AGENTS &amp; AUTOMATION</h3>
              <h4>Turning Manual Workflows into Automated Systems</h4>
              <p>
                I build AI agents and automation pipelines that connect tools,
                data, and workflows—reducing manual effort and letting systems run
                with minimal human intervention—using n8n and LangChain.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">n8n</div>
                <div className="what-tags">LangChain</div>
                <div className="what-tags">RAG &amp; retrieval</div>
                <div className="what-tags">WhatsApp automation</div>
                <div className="what-tags">Workflow design</div>
                <div className="what-tags">Integrations</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>INSTRUCTOR</h3>
              <h4>Teaching Python &amp; Machine Learning</h4>
              <p>
                I teach Python and data analysis through YouTube tutorials,
                breaking down programming and ML concepts into practical,
                hands-on lessons.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">Data Analysis</div>
                <div className="what-tags">Machine Learning</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

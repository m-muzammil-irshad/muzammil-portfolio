import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Research Assistant</h4>
                <h5>Research in AI for Science and Engineering (RAISE) Lab</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              1.5+ years working on machine learning research — incremental
              learning for insider threat detection under concept drift, and deep
              learning models to distinguish harmful cyberbullying from non-harmful
              interactions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Instructor</h4>
                <h5>YouTube</h5>
              </div>
              <h3>ONGOING</h3>
            </div>
            <p>
              Teaching Python, data analysis, and machine learning through tutorial
              series — turning complex concepts into practical, hands-on lessons.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI &amp; Automation Intern</h4>
                <h5>IFFA Tech</h5>
              </div>
              <h3>COMPLETED</h3>
            </div>
            <p>
              Built a WhatsApp-based restaurant booking and ordering assistant
              using n8n — automating customer interactions end to end.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;

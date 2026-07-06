import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useState, useRef } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate,Link } from "react-router";
const Home = () => {





  const { loading, generateReport, reports } = useInterview();
  const { user } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = fileInputRef.current.files[0];
    if (!resumeFile) {
      alert("Please upload a resume file.");
      return;
    }
    if (!jobDescription) {
      alert("Please fill in all the required fields.");
      return;
    }
    try {
      // console.log("Generating interview report...");
      let data = await generateReport({ jobDescription, selfDescription, resumeFile });
      //             data={
      //               interviewReport:{
      //   "_id": {
      //     "$oid": "6a3cccf379a06595180025cf"
      //   },
      //   "jobDescription": "Job Title: Junior Software Developer\n\nCompany: Tech Solutions Ltd.\nLocation: Dhaka, Bangladesh\nEmployment Type: Full-time\n\nJob Description:\n\nWorked as a Junior Software Developer responsible for designing,\ndeveloping, and maintaining web applications. Collaborated with\ncross-functional teams to deliver scalable and user-friendly\nsoftware solutions while following modern development practices.\n\nKey Responsibilities:\n\n- Developed responsive web applications using HTML, CSS,\n  JavaScript, React.js, Node.js, and Express.js.\n- Built and integrated RESTful APIs for seamless communication\n  between frontend and backend systems.\n- Designed and managed MongoDB databases for efficient data storage.\n- Wrote clean, reusable, and maintainable code following industry\n  standards.\n- Debugged applications and resolved software issues to improve\n  performance and reliability.\n- Participated in code reviews and collaborated with team members\n  using Git and GitHub.\n- Worked closely with UI/UX designers to implement responsive and\n  accessible user interfaces.\n- Tested applications and optimized them for different browsers\n  and devices.\n\nTechnologies Used:\n\nJavaScript, React.js, Node.js, Express.js, MongoDB, HTML5, CSS3,\nGit, GitHub, Postman\n\nSkills Demonstrated:\n\n- Full Stack Web Development\n- REST API Development\n- Database Management\n- Problem Solving\n- Team Collaboration\n- Version Control\n- Software Testing and Debugging",
      //   "resume": "John Doe\nComputer Science Student & Aspiring Software\nEngineer\nNew York, USA\nMOBILE-ALT +1 (234) 567-8901\nEnvelope johndoe@gmail.com\nGithub johndoe\nLINKEDIN-IN johndoe\nObjective\nMotivated Computer Science student with a strong foundation in web development,\ndata structures, and software engineering. Seeking an internship or entry-level\nsoftware developer position to apply technical skills and gain industry experience.\nEducation\n2022–2026 Bachelor of Science in Computer Science, ABC University, New York, USA,\nCGPA: 3.75 / 4.00\nRelevant Coursework:\n○ Data Structures & Algorithms\n○ Database Systems\n○ Operating Systems\n○ Software Engineering\nTechnical Skills\nLanguages Java, JavaScript, Python, C++\nFrontend HTML, CSS, React, Bootstrap\nBackend Node.js, Express.js\nDatabase MongoDB, MySQL\nTools Git, GitHub, VS Code, Postman\nExperience\n06/2025–08/2025\tFrontend Developer Intern, XYZ Technologies, New York, USA\n○ Developed responsive React components and improved overall frontend architecture.\n○ Integrated backend REST APIs seamlessly to fetch and update application data.\n○ Diagnosed and resolved UI bugs, enhancing system rendering and UX performance.\n○ Collaborated closely with backend developers and designers to ship new features.\nProjects\nMERN Blog Application, Full-Stack Personal Project\n○ Developed a full-stack blog platform using React, Node.js, Express.js, and MongoDB.\n○ Implemented robust user authentication and full CRUD (Create, Read, Update, Delete)\nfeatures.\n○ Designed an elegant and fully responsive user interface utilizing modern CSS techniques.\n1/2\n\n-- 1 of 2 --\n\nWeather Application, Front-End Web Project\n○ Built an interactive weather tracking app using native JavaScript and an external REST\nAPI.\n○ Dynamically displays current weather info, temperature trends, and conditions based on\ncity search.\n○ Designed a responsive, mobile-first layouts for dynamic user navigation.\nStudent Management System, Object-Oriented Desktop App\n○ Programmed a console-based management platform built entirely on Java.\n○ Supported full record lifecycle workflows (create, update, delete, search entries).\n○ Applied robust Object-Oriented Programming (OOP) concepts such as inheritance and\nencapsulation.\nCertifications\n2025 Responsive Web Design — FreeCodeCamp\n2024 JavaScript Algorithms and Data Structures — FreeCodeCamp\n2024 Introduction to Cloud Computing — Coursera\nAchievements\n○ Successfully solved over 300+ competitive programming questions across LeetCode\nand HackerRank.\n○ Active competitor in the University Programming Contest 2025.\n○ Designed and constructed multiple end-to-end full-stack personal web utilities.\nSoft Skills\nProblem Solving, Teamwork, Communication, Time Management, Adaptability\nLanguages\nEnglish Professional Working Proficiency\nBengali Native Speaker\nInterests\nWeb Development, Artificial Intelligence, Open Source Contributions, Competitive\nProgramming\n2/2\n\n-- 2 of 2 --\n\n",
      //   "selfDescription": "Hello, my name is John Doe. I am a Computer Science student with a strong interest in software development and web technologies. I enjoy building full-stack applications using JavaScript, React, Node.js, and MongoDB, and I am always eager to learn new technologies and improve my problem-solving skills. I have worked on several academic and personal projects that have helped me develop teamwork, communication, and analytical thinking. I am a quick learner, adaptable, and passionate about creating practical solutions through code. My goal is to start my career as a software developer, contribute to meaningful projects, and continue growing both technically and professionally.",
      //   "matchScore": 90,
      //   "technicalQuestions": [
      //     {
      //       "question": "You mentioned developing responsive React components. Can you explain your approach to ensuring responsiveness across different devices and browsers?",
      //       "intention": "To assess the candidate's practical experience with responsive design, understanding of CSS techniques (Flexbox/Grid, media queries), and cross-browser compatibility considerations beyond just using a framework like Bootstrap.",
      //       "answer": "Candidate should discuss using media queries, flexible units (em, rem, vw, vh), CSS Flexbox and Grid, and potentially a mobile-first design approach. Mentioning testing on various devices or using browser developer tools for different viewports would be a strong point. Discussing how CSS frameworks (like Bootstrap) aid in responsiveness, but also how custom solutions are implemented for specific design needs."
      //     },
      //     {
      //       "question": "In your MERN Blog Application, you implemented robust user authentication. Can you describe the authentication mechanism you used and discuss any security considerations you took into account?",
      //       "intention": "To evaluate the candidate's understanding of authentication principles (e.g., JWT, session-based), secure storage of credentials, and awareness of common web vulnerabilities related to authentication.",
      //       "answer": "Candidate should ideally discuss using JSON Web Tokens (JWT) for stateless authentication or session-based authentication. Key points to cover include hashing passwords (e.g., bcrypt), protecting JWTs (e.g., HttpOnly cookies, storing in memory for SPAs), implementing refresh tokens, preventing common attacks like XSS/CSRF, and handling authorization (roles/permissions)."
      //     },
      //     {
      //       "question": "You integrated backend REST APIs seamlessly. Could you explain what 'RESTful' means to you and describe the key principles you adhere to when designing or interacting with a REST API?",
      //       "intention": "To gauge the candidate's foundational knowledge of REST architecture, its constraints (statelessness, client-server, cacheable, uniform interface), and common HTTP methods (GET, POST, PUT, DELETE) for resource manipulation.",
      //       "answer": "Candidate should define REST as Representational State Transfer, emphasizing its architectural style for networked applications. Key principles include client-server separation, statelessness (no server-side context of the client session between requests), cacheability, a uniform interface (resource-based URLs, standard HTTP methods), and a layered system. Discussing idempotence of PUT/DELETE methods and appropriate use of HTTP status codes would be beneficial."
      //     },
      //     {
      //       "question": "Discuss a challenging technical bug you encountered during your internship or a project, how you approached debugging it, and what you learned from the experience.",
      //       "intention": "To assess the candidate's problem-solving methodology, debugging skills, ability to learn from mistakes, and resilience when faced with technical difficulties.",
      //       "answer": "Candidate should describe a specific bug (e.g., an elusive UI bug, an API integration issue, a database query problem). Explain the steps taken to diagnose the problem (e.g., logging, debugger tools, isolated testing, reviewing documentation). Emphasize the systematic approach, collaboration if applicable, and the ultimate solution. Conclude with a learning outcome, such as the importance of thorough testing, understanding error messages, or specific debugging tools."
      //     },
      //     {
      //       "question": "The job involves designing and managing MongoDB databases. Can you explain the concept of document-oriented databases and how you approach data modeling in MongoDB, especially considering its schema-less nature?",
      //       "intention": "To assess the candidate's understanding of NoSQL databases, specifically MongoDB, and their ability to design effective data structures for document stores, considering embedded vs. referenced documents.",
      //       "answer": "Candidate should explain that document-oriented databases store data in flexible, JSON-like documents, often nested. For data modeling in MongoDB, they should discuss considering the application's access patterns and typical queries. Key points include: embedding documents when data is frequently accessed together and one-to-one/one-to-few relationships; referencing documents when data is frequently accessed independently, one-to-many relationships, or large arrays. Mention denormalization for read performance and indexing for query optimization."
      //     }
      //   ],
      //   "behavioralQuestions": [
      //     {
      //       "question": "Tell me about a time you had to collaborate closely with backend developers and designers to ship new features. What was your role, and how did you ensure smooth communication and integration?",
      //       "intention": "To understand the candidate's experience in cross-functional teamwork, communication skills, and ability to coordinate tasks and resolve potential conflicts in a development cycle.",
      //       "answer": "Candidate should use the STAR method. Describe the Situation (e.g., a specific feature from the internship or MERN app requiring collaboration). Explain the Task (what needed to be achieved). Describe the Actions taken (e.g., participating in daily stand-ups, using communication tools, creating shared documentation, proactively communicating API requirements or UI constraints, conducting regular integration testing). Explain the Result (successful feature delivery, improved workflow, lessons learned). Focus on active listening, clear articulation of technical needs, and adaptability."
      //     },
      //     {
      //       "question": "The job description mentions writing clean, reusable, and maintainable code. Can you share an example of a project or task where you specifically focused on code quality, and what practices did you follow?",
      //       "intention": "To assess the candidate's understanding of good coding practices, attention to detail, and commitment to producing high-quality, sustainable code, which is crucial for team environments.",
      //       "answer": "Candidate should describe a situation where they intentionally applied principles of clean code. This could involve refactoring an existing codebase, designing a new module with reusability in mind, or adhering to coding standards (e.g., naming conventions, linting). Practices to mention include: writing clear comments/documentation, breaking down complex functions, using design patterns, unit testing, following DRY (Don't Repeat Yourself) principle, and considering future maintainability for others."
      //     },
      //     {
      //       "question": "You mentioned being eager to learn new technologies. Can you give an example of a new technology or skill you had to learn quickly for a project or job, and how you approached the learning process?",
      //       "intention": "To evaluate the candidate's self-learning capabilities, adaptability, and proactiveness in acquiring new skills, which is vital in a rapidly evolving tech industry.",
      //       "answer": "Candidate should identify a specific technology or skill (e.g., React hooks, a specific database feature, a new API). Describe the challenge or project that necessitated learning it. Explain the learning process: official documentation, online tutorials, courses (e.g., FreeCodeCamp certifications), hands-on practice, asking questions to mentors/peers, building small prototypes. Emphasize the outcome and how quickly they became proficient enough to contribute effectively."
      //     },
      //     {
      //       "question": "Tell me about a time you received constructive feedback on your code or work. How did you react to it, and what did you do with that feedback?",
      //       "intention": "To assess the candidate's openness to feedback, ability to learn and improve, and maturity in a professional setting, especially relevant for participating in code reviews.",
      //       "answer": "Candidate should provide an example of constructive feedback, ideally from their internship, a project, or even an academic setting. Describe the specific feedback. Explain their reaction (e.g., initially surprised but then understood the value). Most importantly, detail the actions taken as a result of the feedback (e.g., refactored code, adopted a new coding practice, improved documentation, sought clarification). The emphasis should be on growth and improvement, not defensiveness."
      //     }
      //   ],
      //   "skillGaps": [
      //     {
      //       "skill": "Automated Testing Frameworks (e.g., Jest, React Testing Library, Mocha, Cypress)",
      //       "severity": "medium"
      //     },
      //     {
      //       "skill": "Advanced Scalability and Performance Optimization Techniques for Web Applications",
      //       "severity": "medium"
      //     },
      //     {
      //       "skill": "Experience with CI/CD Pipelines and Deployment Automation",
      //       "severity": "medium"
      //     }
      //   ],
      //   "preparationPlan": [
      //     {
      //       "day": 1,
      //       "focus": "JavaScript Fundamentals & Asynchronous Programming",
      //       "tasks": [
      //         "Review ES6+ features (arrow functions, destructuring, spread/rest, promises, async/await).",
      //         "Deep dive into JavaScript's Event Loop, Call Stack, and Callback Queue.",
      //         "Practice solving 3-5 LeetCode medium-level problems focusing on array manipulation and string processing using modern JS."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d0"
      //       }
      //     },
      //     {
      //       "day": 2,
      //       "focus": "React.js Core Concepts & Hooks",
      //       "tasks": [
      //         "Review React component lifecycle and functional components with Hooks (useState, useEffect, useContext, useRef).",
      //         "Understand state management in React, including Context API and prop drilling vs. global state solutions.",
      //         "Build a small React component demonstrating data fetching, state updates, and error handling."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d1"
      //       }
      //     },
      //     {
      //       "day": 3,
      //       "focus": "Node.js & Express.js - APIs and Middleware",
      //       "tasks": [
      //         "Review building RESTful APIs with Express.js (routing, request/response cycle, middleware).",
      //         "Understand error handling strategies in Express.js and securing API endpoints.",
      //         "Implement a simple Express.js server with a few routes, middleware for logging, and basic authentication."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d2"
      //       }
      //     },
      //     {
      //       "day": 4,
      //       "focus": "MongoDB & Database Design",
      //       "tasks": [
      //         "Review MongoDB's document model, CRUD operations, and Mongoose ORM.",
      //         "Study best practices for data modeling in MongoDB (embedding vs. referencing, indexing strategies).",
      //         "Design a schema for a new feature in the MERN blog application and justify your choices."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d3"
      //       }
      //     },
      //     {
      //       "day": 5,
      //       "focus": "REST API Design Principles & Security",
      //       "tasks": [
      //         "Revisit REST principles (statelessness, idempotence, HTTP methods, status codes).",
      //         "Understand common API security practices (JWT, OAuth, HTTPS, input validation).",
      //         "Practice designing an API for a new use case, focusing on resource naming and method usage."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d4"
      //       }
      //     },
      //     {
      //       "day": 6,
      //       "focus": "System Design Basics & Scalability",
      //       "tasks": [
      //         "Read introductory articles on system design for web applications (load balancing, caching, CDN, database scaling).",
      //         "Review basic concepts of microservices vs. monolithic architectures.",
      //         "Think through how your MERN blog application could be scaled to support more users."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d5"
      //       }
      //     },
      //     {
      //       "day": 7,
      //       "focus": "Behavioral Questions & Project Review",
      //       "tasks": [
      //         "Prepare answers for common behavioral questions using the STAR method, drawing from internship and project experiences.",
      //         "Practice articulating your MERN Blog Application and Frontend Developer Intern experience clearly, focusing on technical challenges and solutions.",
      //         "Review your resume and self-description, ensuring you can speak to every point confidently."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d6"
      //       }
      //     },
      //     {
      //       "day": 8,
      //       "focus": "Mock Interview & Feedback",
      //       "tasks": [
      //         "Conduct a full mock interview (technical and behavioral) with a peer or mentor.",
      //         "Focus on clarity of thought, problem-solving approach, and effective communication.",
      //         "Review feedback carefully and identify areas for immediate improvement."
      //       ],
      //       "_id": {
      //         "$oid": "6a3cccf379a06595180025d7"
      //       }
      //     }
      //   ],
      //   "user": {
      //     "$oid": "6a3cbbf26ec278494679780b"
      //   },
      //   "createdAt": {
      //     "$date": "2026-06-25T06:38:43.197Z"
      //   },
      //   "updatedAt": {
      //     "$date": "2026-06-25T06:38:43.197Z"
      //   },
      //   "__v": 0,
      //   "title": "software engnr"
      // }
      //             }
      // console.log(data,"   ---------from home page");
      // alert("Interview report generated successfully!");
      navigate(`/interview/${data.interviewReport._id}`);

    } catch (error) {
      console.error("Error generating interview report:", error);
      alert("Failed to generate interview report. Please try again.");
    }

  }

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-card">
          <div className="spinner"></div>
          <h3 style={{ color: "black" }}>Logging in...</h3>
          <p style={{ color: "black" }}>Please wait</p>
        </div>
      </div>
    )
  }


  return (

    <main className="home">
      {/* <div className="welcome-card">
      
        <h1>Welcome {user?.username || "User"} to the Interview Prep App</h1>
        <p>Get ready to ace your next interview!</p>
      </div> */}
      <section className="application-shell">
        <header className="topbar">
          <div className="welcome-card">
            <h1>Welcome {user?.username || "User"} to the Interview Prep App</h1>
            <p>Get ready to ace your next interview!</p>
          </div>
          <div className="topbar__content">
            <div className="topbar__title">
              <span className="back-icon" aria-hidden="true">&larr;</span>
              <div>
                <p className="eyebrow">Application Details</p>
              </div>
            </div>
            <button className="icon-button" type="button" aria-label="More options">...</button>
          </div>
        </header>

        {/* <div className="progress-card">
          <div className="progress-card__row">
            <span className="section-label">Current Progress</span>
            <span className="step-count">Step 1 of 1</span>
          </div>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-track__fill" />
          </div>
        </div> */}

        <div className="content-grid">
          <section className="panel panel--wide">
            <div className="panel__header">
              <h1>Submit Your Profile</h1>
              <p>Please fill in the details below to tailor your application.</p>
            </div>

            <div className="field-group">
              <label htmlFor="jobDescription">Job Description</label>
              <textarea
                onChange={(e) => setJobDescription(e.target.value)}
                name="jobDescription"
                id="jobDescription"
                placeholder="Upload your job advertisements, skills, and what makes you a great fit for the particular role..."
              />
            </div>
          </section>

          <aside className="panel panel--side">
            <div className="field-group">
              <label htmlFor="selfDescription">Tell Us About Yourself</label>
              <textarea
                onChange={(e) => setSelfDescription(e.target.value)}
                name="selfDescription"
                id="selfDescription"
                placeholder="Provide a few lines about your background, strengths, and the kind of role you want."
              />
            </div>

            <div className="upload-card">
              <div className="upload-card__icon" aria-hidden="true">PDF</div>
              <h2>Upload Resume (PDF)</h2>
              <p>Drag and drop or tap to browse files</p>
              <label className="upload-button" htmlFor="resume"  >Browse File</label>
              <input hidden ref={fileInputRef} type="file" name="resume" id="resume" accept=".pdf" />
            </div>
          </aside>
        </div>

        <footer className="footer-action">
          <button
            onClick={handleGenerateReport}
            className="button primary-button" type="button">Generate Interview Report</button>
        </footer>

        <section className="reports-section" aria-labelledby="saved-reports-title">
          <div className="reports-section__header">
            <div>
              <p className="eyebrow">Saved Reports</p>
              <h2 id="saved-reports-title">Your generated interview reports</h2>
            </div>
            <span className="reports-section__count">{reports.length} {reports.length === 1 ? "report" : "reports"}</span>
          </div>

          {reports.length === 0 ? (
            <div className="reports-empty">
              <p>No reports yet.</p>
              <span>Generate your first interview report to see it here.</span>
            </div>
          ) : (
            <div className="reports-list">
              {reports.map((item, index) => {
                const reportData = item?.interviewReport || item;
                const title = reportData?.title || reportData?.jobDescription?.split("\n")[0] || `Report ${index + 1}`;
                const summary = reportData?.jobDescription
                  ? `${reportData.jobDescription.replace(/\s+/g, " ").slice(0, 110)}...`
                  : "A generated interview analysis is ready to review.";
                const badge = reportData?.matchScore ? `${reportData.matchScore}% match` : "Interview report";
                const dateText = reportData?.createdAt
                  ? new Date(reportData.createdAt).toLocaleDateString()
                  : "Recently created";

                return (
                  <article className="report-card" key={reportData?._id || index}>
                    <div className="report-card__top">
                      <h3>{title}</h3>
                      <span className="report-card__badge">{badge}</span>
                    </div>
                    <p>{summary}</p>
                    <div className="report-card__meta">
                      <span>{dateText}</span>
                      <span><Link to={`/interview/${reportData?._id}`}>View details</Link></span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default Home

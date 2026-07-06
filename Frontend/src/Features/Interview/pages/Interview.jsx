import { useState,useEffect  } from "react"
import "../style/interview.scss"
import { useInterview } from "../hooks/useInterview"
import { useParams } from "react-router"

// Mock interview page data. Use this object during UI development,
// // then swap it for real API data when the backend is ready.
// const mockInterviewData = {
//   report: {
//     matchScore: 90,
//     technicalQuestions: [
//       {
//         question:
//           "You mentioned developing responsive React components. Can you explain your approach to ensuring responsiveness across different devices and browsers?",
//         intention:
//           "To assess the candidate's practical experience with responsive design, understanding of CSS techniques (Flexbox/Grid, media queries), and cross-browser compatibility considerations beyond just using a framework like Bootstrap.",
//         answer:
//           "Candidate should discuss using media queries, flexible units (em, rem, vw, vh), CSS Flexbox and Grid, and potentially a mobile-first design approach. Mentioning testing on various devices or using browser developer tools for different viewports would be a strong point. Discussing how CSS frameworks (like Bootstrap) aid in responsiveness, but also how custom solutions are implemented for specific design needs."
//       },
//       {
//         question:
//           "In your MERN Blog Application, you implemented robust user authentication. Can you describe the authentication mechanism you used and discuss any security considerations you took into account?",
//         intention:
//           "To evaluate the candidate's understanding of authentication principles (e.g., JWT, session-based), secure storage of credentials, and awareness of common web vulnerabilities related to authentication.",
//         answer:
//           "Candidate should ideally discuss using JSON Web Tokens (JWT) for stateless authentication or session-based authentication. Key points to cover include hashing passwords (e.g., bcrypt), protecting JWTs (e.g., HttpOnly cookies, storing in memory for SPAs), implementing refresh tokens, preventing common attacks like XSS/CSRF, and handling authorization (roles/permissions)."
//       },
//       {
//         question:
//           "You integrated backend REST APIs seamlessly. Could you explain what 'RESTful' means to you and describe the key principles you adhere to when designing or interacting with a REST API?",
//         intention:
//           "To gauge the candidate's foundational knowledge of REST architecture, its constraints (statelessness, client-server, cacheable, uniform interface), and common HTTP methods (GET, POST, PUT, DELETE) for resource manipulation.",
//         answer:
//           "Candidate should define REST as Representational State Transfer, emphasizing its architectural style for networked applications. Key principles include client-server separation, statelessness (no server-side context of the client session between requests), cacheability, a uniform interface (resource-based URLs, standard HTTP methods), and a layered system. Discussing idempotence of PUT/DELETE methods and appropriate use of HTTP status codes would be beneficial."
//       },
//       {
//         question:
//           "Discuss a challenging technical bug you encountered during your internship or a project, how you approached debugging it, and what you learned from the experience.",
//         intention:
//           "To assess the candidate's problem-solving methodology, debugging skills, ability to learn from mistakes, and resilience when faced with technical difficulties.",
//         answer:
//           "Candidate should describe a specific bug (e.g., an elusive UI bug, an API integration issue, a database query problem). Explain the steps taken to diagnose the problem (e.g., logging, debugger tools, isolated testing, reviewing documentation). Emphasize the systematic approach, collaboration if applicable, and the ultimate solution. Conclude with a learning outcome, such as the importance of thorough testing, understanding error messages, or specific debugging tools."
//       },
//       {
//         question:
//           "The job involves designing and managing MongoDB databases. Can you explain the concept of document-oriented databases and how you approach data modeling in MongoDB, especially considering its schema-less nature?",
//         intention:
//           "To assess the candidate's understanding of NoSQL databases, specifically MongoDB, and their ability to design effective data structures for document stores, considering embedded vs. referenced documents.",
//         answer:
//           "Candidate should explain that document-oriented databases store data in flexible, JSON-like documents, often nested. For data modeling in MongoDB, they should discuss considering the application's access patterns and typical queries. Key points include: embedding documents when data is frequently accessed together and one-to-one/one-to-few relationships; referencing documents when data is frequently accessed independently, one-to-many relationships, or large arrays. Mention denormalization for read performance and indexing for query optimization."
//       }
//     ],
//     behavioralQuestions: [
//       {
//         question:
//           "Tell me about a time you had to collaborate closely with backend developers and designers to ship new features. What was your role, and how did you ensure smooth communication and integration?",
//         intention:
//           "To understand the candidate's experience in cross-functional teamwork, communication skills, and ability to coordinate tasks and resolve potential conflicts in a development cycle.",
//         answer:
//           "Candidate should use the STAR method. Describe the Situation (e.g., a specific feature from the internship or MERN app requiring collaboration). Explain the Task (what needed to be achieved). Describe the Actions taken (e.g., participating in daily stand-ups, using communication tools, creating shared documentation, proactively communicating API requirements or UI constraints, conducting regular integration testing). Explain the Result (successful feature delivery, improved workflow, lessons learned). Focus on active listening, clear articulation of technical needs, and adaptability."
//       },
//       {
//         question:
//           "The job description mentions writing clean, reusable, and maintainable code. Can you share an example of a project or task where you specifically focused on code quality, and what practices did you follow?",
//         intention:
//           "To assess the candidate's understanding of good coding practices, attention to detail, and commitment to producing high-quality, sustainable code, which is crucial for team environments.",
//         answer:
//           "Candidate should describe a situation where they intentionally applied principles of clean code. This could involve refactoring an existing codebase, designing a new module with reusability in mind, or adhering to coding standards (e.g., naming conventions, linting). Practices to mention include: writing clear comments/documentation, breaking down complex functions, using design patterns, unit testing, following DRY (Don't Repeat Yourself) principle, and considering future maintainability for others."
//       },
//       {
//         question:
//           "You mentioned being eager to learn new technologies. Can you give an example of a new technology or skill you had to learn quickly for a project or job, and how you approached the learning process?",
//         intention:
//           "To evaluate the candidate's self-learning capabilities, adaptability, and proactiveness in acquiring new skills, which is vital in a rapidly evolving tech industry.",
//         answer:
//           "Candidate should identify a specific technology or skill (e.g., React hooks, a specific database feature, a new API). Describe the challenge or project that necessitated learning it. Explain the learning process: official documentation, online tutorials, courses (e.g., FreeCodeCamp certifications), hands-on practice, asking questions to mentors/peers, building small prototypes. Emphasize the outcome and how quickly they became proficient enough to contribute effectively."
//       },
//       {
//         question:
//           "Tell me about a time you received constructive feedback on your code or work. How did you react to it, and what did you do with that feedback?",
//         intention:
//           "To assess the candidate's openness to feedback, ability to learn and improve, and maturity in a professional setting, especially relevant for participating in code reviews.",
//         answer:
//           "Candidate should provide an example of constructive feedback, ideally from their internship, a project, or even an academic setting. Describe the specific feedback. Explain their reaction (e.g., initially surprised but then understood the value). Most importantly, detail the actions taken as a result of the feedback (e.g., refactored code, adopted a new coding practice, improved documentation, sought clarification). The emphasis should be on growth and improvement, not defensiveness."
//       }
//     ],
//     skillGaps: [
//       {
//         skill: "Automated Testing Frameworks (e.g., Jest, React Testing Library, Mocha, Cypress)",
//         severity: "medium"
//       },
//       {
//         skill: "Advanced Scalability and Performance Optimization Techniques for Web Applications",
//         severity: "medium"
//       },
//       {
//         skill: "Experience with CI/CD Pipelines and Deployment Automation",
//         severity: "medium"
//       }
//     ],
//     preparationPlan: [
//       {
//         day: 1,
//         focus: "JavaScript Fundamentals & Asynchronous Programming",
//         tasks: [
//           "Review ES6+ features (arrow functions, destructuring, spread/rest, promises, async/await).",
//           "Deep dive into JavaScript's Event Loop, Call Stack, and Callback Queue.",
//           "Practice solving 3-5 LeetCode medium-level problems focusing on array manipulation and string processing using modern JS."
//         ]
//       },
//       {
//         day: 2,
//         focus: "React.js Core Concepts & Hooks",
//         tasks: [
//           "Review React component lifecycle and functional components with Hooks (useState, useEffect, useContext, useRef).",
//           "Understand state management in React, including Context API and prop drilling vs. global state solutions.",
//           "Build a small React component demonstrating data fetching, state updates, and error handling."
//         ]
//       },
//       {
//         day: 3,
//         focus: "Node.js & Express.js - APIs and Middleware",
//         tasks: [
//           "Review building RESTful APIs with Express.js (routing, request/response cycle, middleware).",
//           "Understand error handling strategies in Express.js and securing API endpoints.",
//           "Implement a simple Express.js server with a few routes, middleware for logging, and basic authentication."
//         ]
//       },
//       {
//         day: 4,
//         focus: "MongoDB & Database Design",
//         tasks: [
//           "Review MongoDB's document model, CRUD operations, and Mongoose ORM.",
//           "Study best practices for data modeling in MongoDB (embedding vs. referencing, indexing strategies).",
//           "Design a schema for a new feature in the MERN blog application and justify your choices."
//         ]
//       },
//       {
//         day: 5,
//         focus: "REST API Design Principles & Security",
//         tasks: [
//           "Revisit REST principles (statelessness, idempotence, HTTP methods, status codes).",
//           "Understand common API security practices (JWT, OAuth, HTTPS, input validation).",
//           "Practice designing an API for a new use case, focusing on resource naming and method usage."
//         ]
//       },
//       {
//         day: 6,
//         focus: "System Design Basics & Scalability",
//         tasks: [
//           "Read introductory articles on system design for web applications (load balancing, caching, CDN, database scaling).",
//           "Review basic concepts of microservices vs. monolithic architectures.",
//           "Think through how your MERN blog application could be scaled to support more users."
//         ]
//       },
//       {
//         day: 7,
//         focus: "Behavioral Questions & Project Review",
//         tasks: [
//           "Prepare answers for common behavioral questions using the STAR method, drawing from internship and project experiences.",
//           "Practice articulating your MERN Blog Application and Frontend Developer Intern experience clearly, focusing on technical challenges and solutions.",
//           "Review your resume and self-description, ensuring you can speak to every point confidently."
//         ]
//       },
//       {
//         day: 8,
//         focus: "Mock Interview & Feedback",
//         tasks: [
//           "Conduct a full mock interview (technical and behavioral) with a peer or mentor.",
//           "Focus on clarity of thought, problem-solving approach, and effective communication.",
//           "Review feedback carefully and identify areas for immediate improvement."
//         ]
//       }
//     ]
//   }
// }

const Interview = () => {
  const [selectedSection, setSelectedSection] = useState("technical")
  const {report,loading,getResumePdf,getReportById,setReport} = useInterview();
  const interviewId = useParams().interviewId;


  // useEffect(async () => {
  //   //6a47699af1f32c16d2d959a2
  //   console.log("this is useEffect in interview page")
  //   console.log(interviewId,"from interview page")
  //   if (interviewId) {
  //     try{
  //       const data=await getReportById({ interviewId });
  //       setReport(data);
  //       console.log(data,"from interview page");
  //     }
  //     catch(error){
  //       console.error("Error fetching interview report:", error);
  //     }

  //   }
  // }, [interviewId]);

//   useEffect(() => {
//     const fetchReport = async () => {
//         if (!interviewId) return;
//         console.log("helloe mamsma")
//         try {
//             const data = await getReportById({ interviewId });
//             // setReport(data.interviewReport);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     fetchReport();
// }, [interviewId]);
//    console.log(report,"from interview page");
  const formatCount = (count, unit) => `${count ?? 0} ${unit}${count === 1 ? "" : "s"}`

  const sidebarItems = [
    {
      key: "technical",
      title: "Technical questions",
      subtitle: formatCount(report?.technicalQuestions?.length ?? 0, "item")
    },
    {
      key: "behavioral",
      title: "Behavioral questions",
      subtitle: formatCount(report?.behavioralQuestions?.length ?? 0, "item")
    },
    {
      key: "roadmap",
      title: "Road Map",
      subtitle: formatCount(report?.preparationPlan?.length ?? 0, "day")
    }
  ]

  const renderSection = () => {
    if (!report) return null
    if (selectedSection === "technical") {
      return (
        <section className="question-group">
          <div className="question-group__header">
            <h2>Technical questions</h2>
          </div>
          {report.technicalQuestions.map((item, index) => (
            <article key={index} className="question-card">
              <p className="question-label">Q{index + 1}</p>
              <h3>{item.question}</h3>
              <div className="question-meta">
                <span>Intention</span>
              </div>
              <p className="question-intention">{item.intention}</p>
              <p className="question-answer">{item.answer}</p>
            </article>
          ))}
        </section>
      )
    }

    if (selectedSection === "behavioral") {
      return (
        <section className="question-group">
          <div className="question-group__header">
            <h2>Behavioral questions</h2>
          </div>
          {report.behavioralQuestions.map((item, index) => (
            <article key={index} className="question-card">
              <p className="question-label">B{index + 1}</p>
              <h3>{item.question}</h3>
              <div className="question-meta">
                <span>Intention</span>
              </div>
              <p className="question-intention">{item.intention}</p>
              <p className="question-answer">{item.answer}</p>
            </article>
          ))}
        </section>
      )
    }

    return (
      <section className="question-group">
        <div className="question-group__header">
          <h2>Road Map</h2>
        </div>
        <div className="roadmap-grid">
          {report.preparationPlan.map((item) => (
            <article key={item.day} className="question-card roadmap-card">
              <div className="roadmap-card__header">
                <p className="question-label">Day {item.day}</p>
                <h3>{item.focus}</h3>
              </div>
              <ul className="roadmap-tasks">
                {item.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    )
  }


  if(loading || !report){

    return (
      <div className="loading-overlay">
        <div className="loading-card">
          <div className="spinner"></div>
          <h3 style={{color:"black"}}>Preparing report...</h3>
          <p style={{color:"black"}}>Please wait while we load the interview report.</p>
        </div>
      </div>
    )

  }

  return (
    <>
    {/* {(loading || !report) && (
      <div className="loading-overlay">
        <div className="loading-card">
          <div className="spinner"></div>
          <h3 style={{color:"black"}}>Preparing report...</h3>
          <p style={{color:"black"}}>Please wait while we load the interview report.</p>
        </div>
      </div>
    )}
     */}
   
    <main className="interview-page">
      <section className="interview-shell">
        <aside className="sidebar sidebar--left">
          <div className="sidebar__top">

            <p className="eyebrow">Interview summary</p>
            <h2>Candidate report</h2>
          </div>

          <nav className="nav-cards">
            {sidebarItems.map((item) => {
              const isActive = selectedSection === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`nav-card ${isActive ? "nav-card--active" : ""}`}
                  onClick={() => setSelectedSection(item.key)}
                >
                  <span>{item.title}</span>
                  <small>{item.subtitle}</small>
                </button>
              )
            })}
          </nav>

          <div className="sidebar__note">
            <p className="note-title">Next action</p>
            <p>
              Review technical depth and behavior answers, then share the report with the hiring team.
            </p>
          </div>

          <div>
              <button className="download-btn button primary-button" onClick={() => getResumePdf(interviewId)}>
                <svg height={'0.8rem'} style={{marginRight:'0.8rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4004 21H14.2461L12.2461 16H5.75391L3.75391 21H1.59961L8 4.99996H10L16.4004 21ZM21 12V21H19V12H21ZM6.55371 14H11.4463L9 7.88473L6.55371 14ZM19.5293 2.3193C19.7058 1.89351 20.2942 1.8935 20.4707 2.3193L20.7236 2.93063C21.1555 3.97343 21.9615 4.80613 22.9746 5.2568L23.6914 5.57613C24.1022 5.75881 24.1022 6.35634 23.6914 6.53902L22.9326 6.87691C21.945 7.31619 21.1534 8.11942 20.7139 9.12789L20.4668 9.69332C20.2863 10.1075 19.7136 10.1075 19.5332 9.69332L19.2861 9.12789C18.8466 8.11941 18.0551 7.31619 17.0674 6.87691L16.3076 6.53902C15.8974 6.35617 15.8974 5.75894 16.3076 5.57613L17.0254 5.2568C18.0384 4.80613 18.8445 3.97343 19.2764 2.93063L19.5293 2.3193Z"></path></svg>
                Download Resume</button>
          </div>
        </aside>

        <section className="interview-content">
          <header className="report-header">
            <div>
              <p className="eyebrow">Application match</p>
              <h1>Interview readiness</h1>
            </div>
            {/* {console.log(report,"__-__")} */}

            <div className="score-badge">{report.matchScore}%</div>
          </header>

          <section className="summary-card">
            <div className="summary-card__row">
              <p className="summary-title">Overall match score</p>
              <span className="summary-value">{report.matchScore}%</span>
            </div>
            <p className="summary-text">
              This report highlights areas of strength and growth for the candidate. Focus on tailored interview preparation and roadmap improvements.
            </p>
          </section>

          {renderSection()}
        </section>

        <aside className="sidebar sidebar--right">
          <div className="sidebar__top">
            <p className="eyebrow">Skill gaps</p>
            <h2>Focus areas</h2>
          </div>

          <div className="gaps-list">
            {report.skillGaps.map((gap, index) => (
              <div key={index} className="gap-pill">
                <span>{gap.skill}</span>
                <span className={`gap-severity gap-severity--${gap.severity}`}>{gap.severity}</span>
              </div>
            ))}
          </div>

          <div className="sidebar__note sidebar__note--secondary">
            <p className="note-title">How to improve</p>
            <p>
              Prioritize testing practice, performance optimization, and automated deployment. Document your learning progress and apply it to your next project.
            </p>
          </div>
        </aside>
      </section>
    </main>
     </>
  )
}

export default Interview;
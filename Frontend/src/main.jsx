import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style.scss"
import App from './App.jsx'
import { AuthProvider } from './Features/auth/auth.context.jsx'
import { InterviewProvider } from './Features/Interview/interview.context.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InterviewProvider>
    <AuthProvider>
       <App />
    </AuthProvider>
    </InterviewProvider>
   
  </StrictMode>,
)

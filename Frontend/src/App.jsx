

import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./Features/auth/pages/Login";
import Register from "./Features/auth/pages/Register";
import Protected from "./Features/auth/components/Protected";
import Home from "./Features/Interview/pages/Home";
import Interview from "./Features/Interview/pages/Interview";
const App= ()=>{


  return (<>
     
     <BrowserRouter>
        <Routes>
         
          <Route path="/"
          element={
          <Protected>
            <Home/>
          </Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/interview/:interviewId"  element={<Protected><Interview/></Protected>} ></Route>
        </Routes>
      </BrowserRouter>


  </>)
}

export default App;
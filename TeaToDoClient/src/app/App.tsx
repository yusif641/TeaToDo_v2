import type React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages/not-found";
import { Verify } from "@/pages/verify";
import { Activate } from "@/pages/activate";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";

const App: React.FC = () => {
  return (
    <div className="wrap">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <ReactQueryDevtools />
    </div>
  )
}

export default App;

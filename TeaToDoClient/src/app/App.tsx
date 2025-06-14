import type React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; 

const App: React.FC = () => {
  return (
    <div className="">
      <ReactQueryDevtools />
    </div>
  )
}

export default App;

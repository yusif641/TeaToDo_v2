import type React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages/not-found";
import { Verify } from "@/pages/verify";
import { Activate } from "@/pages/activate";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import Home from "@/pages/home/ui/home-ui";
import { Welocome } from "@/pages/welcome";
import { authApi, useAuthStore } from "@/features/auth";
import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import { refresh } from "@/shared/api/api";
import { useEffect } from "react";
import Loader from "@/shared/components/loader/ui/loader";

const App: React.FC = () => {
  const setIsAuth = useAuthStore(useShallow(state => state.setIsAuth));
  const setIsActivated = useAuthStore(useShallow(state => state.setIsActivated));

  const { data } = useQuery({
    queryKey: [authApi.baseKey, "user"],
    queryFn: refresh,
    staleTime: Infinity,
    retry: false,
    select: data => data.data
  });

  useEffect(() => {
    if (data) {
      setIsAuth(true);
      setIsActivated(data.user.is_activated);

      localStorage.setItem("token", data.accessToken);
    }
  }, [data]);

  if (!data) {
    return <Loader />
  }

  return (
    <div className="wrap">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welocome />} />
      </Routes>
      <ReactQueryDevtools />
    </div>
  )
}

export default App;

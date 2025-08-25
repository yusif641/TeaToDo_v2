import type React from "react"
import { Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages/not-found";
import { PrivateVerify } from "@/pages/verify";
import { PrivateActivate } from "@/pages/activate";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { Welocome } from "@/pages/welcome";
import { authApi, PrivateAuth, useAuthStore } from "@/features/auth";
import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Loader from "@/shared/components/loader/ui/loader";
import { PrivateHome } from "@/pages/home";

const App: React.FC = () => {
  const setIsAuth = useAuthStore(useShallow(state => state.setIsAuth));
  const setIsActivated = useAuthStore(useShallow(state => state.setIsActivated));

  const { data, isPending, isSuccess } = useQuery({
    queryKey: [authApi.baseKey, "user"],
    queryFn: authApi.checkAuth,
    staleTime: Infinity,
    retry: 2,
    select: data => data.data
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuth(true);
      setIsActivated(data.user.is_activated);

      localStorage.setItem("token", data.accessToken);
    }
  }, [data]);

  if (isPending) {
    return <Loader />
  }

  return (
    <div className="wrap">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/verify" element={<PrivateVerify />} />
        <Route path="/activate" element={<PrivateActivate />} />
        <Route path="/sign-in" element={<PrivateAuth><SignIn /></PrivateAuth>} />
        <Route path="/sign-up" element={<PrivateAuth><SignUp /></PrivateAuth>} />
        <Route path="/home" element={<PrivateHome />} />
        <Route path="/" element={<Welocome />} />
      </Routes>
    </div>
  )
}

export default App;

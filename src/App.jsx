import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import MedicalRecord from './pages/records/index';
import { Home, OnBoarding, Profile } from "./pages";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";
import SingleRecordDetails from "./pages/records/single-record-details";
import ScreeningSchedule from "./pages/ScreeningSchedule";

const App = () => {
  const { currentUser } = useStateContext();
  const { user, authenticated, ready, login } = usePrivy();
  const navigate = useNavigate();

  // Add state for theme, defaulting to dark mode
  const [theme, setTheme] = useState('dark');

  // Effect to apply the theme class to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      navigate('/');
    }
  }, [ready, navigate, currentUser]);

  return (
    <div className={`relative flex min-h-screen flex-row p-4 ${theme === 'dark' ? 'bg-[#13131a]' : 'bg-[#f0f0f0]'}`}>
      <div className="relative mr-10 hidden sm:flex">
        <SideBar theme={theme} setTheme={setTheme} />
      </div>

      <div className="mx-auto max-w-full flex-1 max-sm:w-full sm:pr-5">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/medical-records" element={<MedicalRecord />} />
          <Route path="/medical-records/:id" element={<SingleRecordDetails />} />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

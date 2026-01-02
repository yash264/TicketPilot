import React from 'react';
import BoxesCore from "../components/boxesCore";
import { Design } from '../assets/design';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard"); 
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-white px-6 py-12">
      {/* Animated background */}
      <BoxesCore />

      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Image - LEFT */}
        <div className="flex justify-center lg:justify-center">
          <Design />
        </div>

        {/* Text - RIGHT */}
        <div className="mx-auto max-w-prose text-center pt-12 lg:text-left">
          <h1 className="text-4xl font-bold text-center sm:text-5xl">
            <span className="text-indigo-600">Ticket Pilot</span>
          </h1>

          <p className="mt-4 text-base text-gray-300 sm:text-lg sm:leading-relaxed">
            A smart, centralized support ticket management system designed to streamline issue tracking and resolution.
          </p>

          <p className="mt-4 text-base text-gray-300 sm:text-lg sm:leading-relaxed">
            It helps teams efficiently organize, prioritize, and monitor customer requests from a single dashboard.
          </p>

          <p className="mt-4 text-base text-gray-300 sm:text-lg sm:leading-relaxed">
            With real-time insights, intuitive workflows, and analytics-driven metrics, TicketPilot enables faster decisions and better support outcomes.
          </p>

          <div className="mt-6 flex gap-4 justify-center lg:justify-center relative z-10">
            <button
              onClick={handleGetStarted}
              className="inline-block rounded border border-green-600 bg-green-600 px-5 py-3 font-medium text-white shadow-md transition-colors hover:bg-rose-600"
            >
              Get Started
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;






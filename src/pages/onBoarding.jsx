import React, { useState } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import { redirect, useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");

  const { user } = usePrivy();
  
  const { createUser } = useStateContext();
  const navigate = useNavigate();
  const handleOnboarding = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      age: parseInt(age, 10),
      location,
      createdBy: user.email.address,
    };
    const newUser = await createUser(userData);
    if (newUser) {
      navigate("/profile");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#13131a]">
      <div className="w-full max-w-xl rounded-xl bg-[#1c1c24] p-8 shadow-lg">
        <h2 className="mb-2 text-center text-5xl font-bold">👋</h2>
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          {" "}
          Welcome, Le't Get Started
        </h2>

        <form onSubmit={handleOnboarding}>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm text-gray-300"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-300" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              required
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm text-gray-300"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-neutral-900 bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;

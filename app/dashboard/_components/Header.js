"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  const { user } = useUser();

  // Function to determine greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get the greeting once to avoid redundant calls
  const greeting = getGreeting();
  const userName = user?.fullName || "Guest";

  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <div className="text-lg font-semibold">
        {greeting}, {userName}! Stay productive this {greeting.split(" ")[1]}.
      </div>
      <UserButton />
    </div>
  );
};

export default Header;

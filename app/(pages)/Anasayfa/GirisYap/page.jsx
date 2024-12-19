"use client";

import LoginForm from "@/app/components/LoginForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center h-max">
      <LoginForm className="min-w-[40%]" />
    </div>
  );
};

export default page;

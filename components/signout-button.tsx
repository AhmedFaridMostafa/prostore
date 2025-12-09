"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

export const SignOutButton = () => {
  return (
    <Button
      className="w-full py-4 px-2 h-4 justify-start"
      variant="ghost"
      onClick={async () => {
        await signOutUser();
      }}
    >
      Sign Out
    </Button>
  );
};

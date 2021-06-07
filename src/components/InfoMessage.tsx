import React from "react";

interface InfoProps {
  message?: string | null;
  type?: "error" | "success";
}

export default function InfoMessage({ message, type }: InfoProps) {
  if (message === null || message === "") {
    return null;
  }
  return (
    <p style={{ color: type === "success" ? "green" : "red" }}>{message}</p>
  );
}

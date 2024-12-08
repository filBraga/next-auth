"use client";

import { useSession } from "next-auth/react";
import React from "react";

const Client = () => {
  const { data: session } = useSession();

  return (
    <div className="centered" style={{ flexDirection: "column" }}>
      <h1>Client Component</h1>
      <pre
        style={{
          padding: "10px",
          borderRadius: "5px",
          overflow: "auto",
          whiteSpace: "pre-wrap", // Corrected to pre-wrap
          maxWidth: "100%", // Ensures the pre element does not exceed the container width
          wordWrap: "break-word", // Breaks long words to fit within the container
        }}
      >
        {JSON.stringify(session, null, 2)}
      </pre>
      <br />
      <br />
      <a href="http://localhost:3001/" rel="noopener noreferrer">
        Go back
      </a>
      <a href="http://localhost:3001/server" rel="noopener noreferrer">
        Server Component
      </a>
    </div>
  );
};

export default Client;

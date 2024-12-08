import { auth } from "@/app/_auth";
import React from "react";

const Server = async () => {
  const session = await auth();

  return (
    <div className="centered" style={{ flexDirection: "column" }}>
      <h1>Server Component</h1>
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
      <a href="http://localhost:3001/" rel="noopener noreferrer">
        Go back
      </a>
      <a href="http://localhost:3001/client" rel="noopener noreferrer">
        Client Component
      </a>
    </div>
  );
};

export default Server;

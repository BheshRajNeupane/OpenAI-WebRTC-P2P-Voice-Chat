const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.get("/api/session", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(`OPENAI_API_KEY is not set`);
    }
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "alloy",
          modalities: ["audio", "text"],
          instructions:
            "Start conversation with the user by saying 'Hi I am Palm Mind Voice Agent, how can I help you today?'",
          tool_choice: "auto",
          //RAG
          tools=[
            {

          }
        ]
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${JSON.stringify(response)}`
      );
    }

    const data = await response.json();

 
    
    // Return the JSON response to the client
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching session data:", error);
    return res.status(500).json({ error: "Failed to fetch session data" },);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

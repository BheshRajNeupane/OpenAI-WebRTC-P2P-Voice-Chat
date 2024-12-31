import { useEffect, useRef } from "react";
import "./App.css";
import useWebRTCAudioSession from "./hooks/useWebrtc";
import {
  backgroundFunction,
  copyToClipboard,
  launchWebsite,
  takeScreenshot,
  timeFunction,
} from "./utils/toolsFunctions";
import { tools } from "./utils/tools";

function App() {
  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    stopSession,
    msgs,
    conversation,
  } = useWebRTCAudioSession("ash", tools);

  // Timer reference for inactivity detection
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset the inactivity timer on any message or mic activity
  function resetInactivityTimer() {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (isSessionActive) {
        alert("Session has been inactive for 10 seconds. Stopping session.");
        stopSession();
      }
    }, 30000);
  }

  useEffect(() => {
    // Register all functions
    registerFunction("getCurrentTime", timeFunction);
    registerFunction("changeBackgroundColor", backgroundFunction);
    registerFunction("launchWebsite", launchWebsite);
    registerFunction("takeScreenshot", takeScreenshot);
    registerFunction("copyToClipboard", copyToClipboard);
  }, [registerFunction]);

  useEffect(() => {
    if (isSessionActive) {
      resetInactivityTimer();
    }
  }, [msgs, isSessionActive]);

  // Stop the session if the user says "bye"
  conversation.map((msg) => {
    if (msg?.text.includes("bye") || msg?.text.includes("have a great day"))
      handleStartStopClick();
  });

  return (
    <div>
      <h1>Talk to ai agent</h1>
      <p>Your status: {status}</p>
      <button onClick={handleStartStopClick}>
        {isSessionActive ? "Stop" : "Start"}
      </button>
      <p>User Query:</p>
      <ol>
        {conversation.map((msg) => {
          if (msg?.role === "user" && msg?.text) {
            return <li key={msg.id}>{msg.text}</li>;
          }
        })}
      </ol>
    </div>
  );
}

export default App;

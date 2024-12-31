import { useEffect } from "react";
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
    conversation,
  } = useWebRTCAudioSession("ash", tools);

  useEffect(() => {
    // Register all functions
    registerFunction("getCurrentTime", timeFunction);
    registerFunction("changeBackgroundColor", backgroundFunction);
    registerFunction("launchWebsite", launchWebsite);
    registerFunction("takeScreenshot", takeScreenshot);
    registerFunction("copyToClipboard", copyToClipboard);
  }, [registerFunction]);

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

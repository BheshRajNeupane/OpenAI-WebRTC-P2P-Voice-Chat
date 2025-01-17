
import React, { useState } from "react";

function VoiceCommunicationApp() {

  const [peerConnection, setPeerConnection] = useState(null); // Stores the PeerConnection instance
  const [dataChannel, setDataChannel] = useState(null); // Stores the data channel for communication
  const [isConnected, setIsConnected] = useState(false); // Tracks connection status
 

  // Function to set up the WebRTC connection
  const setupConnection = async () => {

    try {
      //  Fetch ephemeral token from the backend
      const tokenResponse = await fetch("http://localhost:3000/api/session");
      const { client_secret: { value: EPHEMERAL_KEY } } = await tokenResponse.json();

      // Create a new WebRTC peer connection
      const pc = new RTCPeerConnection();

      //  Handle incoming audio stream
      const audioElement = document.createElement("audio");
      audioElement.autoplay = true; // Automatically play incoming audio
      pc.ontrack = (e) => {
        audioElement.srcObject = e.streams[0]; // Set the source of the audio element
      };

      //  Add local microphone audio track
      // const localStream =  await navigator.mediaDevices.getUserMedia({
      //   audio: {
      //     noiseSuppression: true,
      //     echoCancellation: true
      //   }
      // });;
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(localStream.getTracks()[0]); // Attach the local audio track to the connection

      // Create a data channel for  communication
      const dc = pc.createDataChannel("oai-events");
      dc.addEventListener("open", () => {
        console.log("Data channel is open");
      });
      dc.addEventListener("close", () => {
        console.log("Data channel is closed");
      });
      dc.addEventListener("message", (e) => {
        console.log("Server Event:>>>>>>>>>>>>", JSON.parse(e.data)); 
      });

      setDataChannel(dc); 

      // Create an SDP offer to initiate the connection
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer); 

      // Send the offer to OpenAI's Realtime API and get the answer
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp, // Send the SDP offer
      });

      //  Set the remote description with the SDP answer
      const answer = { type: "answer", sdp: await sdpResponse.text() };
      await pc.setRemoteDescription(answer);

      // Save the peer connection in state and mark as connected
      setPeerConnection(pc);
      setIsConnected(true);
    } catch (error) {
      console.error("Error setting up connection:", error); 
    } 
  };

  // Function to stop the WebRTC connection
  const stopConnection = () => {
    if (peerConnection) {
      peerConnection.close(); // Close the peer connection
      setPeerConnection(null); // Reset the peer connection state
      setDataChannel(null); // Reset the data channel state
      setIsConnected(false); // Update connection status
      console.log("Connection stopped.");
    }
  };

  return (
    <div>
      <h1>Palm Mind Voice Agent</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={ !isConnected ? setupConnection : stopConnection } >
         { !isConnected ? "Talk" : "Stop" }
      </button>
      {/* <button onClick={stopConnection} disabled={!isConnected}>
        Stop
      </button> */}
    </div>
  );
}

export default VoiceCommunicationApp;

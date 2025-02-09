# AI-Powered Voice Communication with WebRTC

This project enables real-time voice-to-voice communication with OpenAI using OpenAI's real-time WebRTC API. It establishes direct peer-to-peer voice streaming by creating an SDP (Session Description Protocol) offer, ensuring low-latency interaction.

## Features

- **Real-time Voice Communication**: Direct peer-to-peer voice streaming.
- **AI-Powered Voice Interaction**: Uses OpenAI's real-time API for intelligent voice response.
- **WebRTC-Based**: No need for WebSockets or external speech-to-text processing.
- **Low Latency**: Instantaneous communication without noticeable delay.

## Technologies Used

- **React** for frontend UI
- **Node.js** for backend logic
- **WebRTC** for voice streaming
- **OpenAI API** for AI voice processing

## Backend Implementation

The backend is built using **Node.js**, where an ephemeral key is generated using OpenAI's standard API key. This key is used for secure authentication and ensuring controlled access to OpenAI services.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git](https://github.com/BheshRajNeupane/OpenAI-WebRTC-P2P-Voice-Chat/
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the backend directory.
   - Add the following variables:
     ```sh
     PORT=3000
     OPENAI_API_KEY=your_paid_openai_api_key
     ```

## Running the Project

### Start the Frontend

```sh
npm start
```

### Start the Backend

```sh
node server.js
```

Ensure the backend generates ephemeral keys securely before making OpenAI API calls.

## Usage

1. **Start Communication**:
   - Initiates a WebRTC connection by creating an SDP offer.
2. **Start Speaking**:
   - Your voice is transmitted in real-time.
   - The AI processes and responds with voice output.
3. **Listen to the AI Voice Response**:
   - The AI generates and streams voice responses directly.
4. **Stop Communication**:
   - Click **Stop** to end the voice session.

## Future Improvements

- Improve UI with better real-time feedback.
- Support multiple voice models and accents.
- Implement error handling and retries for better stability.
- RAG tool



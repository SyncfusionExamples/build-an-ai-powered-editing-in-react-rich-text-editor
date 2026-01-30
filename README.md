# Build AI Powered Editing in React with Syncfusion RTE
A quick start project that shows how to configure AI services, integrate the Rich Text Editor with the AI Assistant, and enable streaming responses.

Refer to the following documentation to learn about the React Rich Text Editor component:

https://ej2.syncfusion.com/react/documentation/rich-text-editor/ai-assistant/integration

Check out this online example of the React Smart Rich Text Editor Component:

https://ej2.syncfusion.com/react/demos/#/fluent2/ai-rich-text-editor/ai-assistant

Make sure that you have the latest versions of NodeJS and Visual Studio Code in your machine before starting to work on this project.

## Congfigure AI Streaming Assistant Service

A lightweight Node.js + Express service that streams AI-generated responses using the **OpenAI** SDK.
To run this AI Backend service , you need to clone the `richtexteditor-ai-assistant-service` repository and then open it in Visual Studio Code.

### Tech Stack

* **Node.js:** v24
* **Framework:** Express
* **AI SDK:** `openai`
* **Language:** TypeScript

### What It Does

* Exposes a `POST /api/stream` endpoint
* Accepts a user message
* Streams AI-generated text back to the client in real time

---

## Setup & Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenAI API Key

Replace `YOUR_API_KEY` in `server.ts` with your OpenAI API key
*(or preferably load it from an environment variable)*

### 3. Build & Run for Production

```bash
npm run serve
```

### 4. Test the API

Send a `POST` request to:

```
http://localhost:3000/api/stream
```

**Request Body:**

```json
{
  "message": "Hello, how can you help me?"
}
```

### How to run this application?
To run this application, you need to clone the `build-ai-powered-editing-in-react-with-syncfusion-rte` repository and then open it in Visual Studio Code. Now, simply install all the necessary React packages into your current project using the `npm install` command and run your project using the `npm start` command.
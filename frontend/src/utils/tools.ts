import { Tool } from "../types";

const toolDefinitions = {
  getCurrentTime: {
    description: "Gets the current time in the user's timezone",
    parameters: {},
  },
  changeBackgroundColor: {
    description: "Changes the background color of the page",
    parameters: {
      color: {
        type: "string",
        description: "Color value (hex, rgb, or color name)",
      },
    },
  },
  launchWebsite: {
    description: "Launches a website in the user's browser",
    parameters: {
      url: {
        type: "string",
        description: "The URL to launch",
      },
    },
  },
  copyToClipboard: {
    description: "Copies text to the user's clipboard",
    parameters: {
      text: {
        type: "string",
        description: "The text to copy",
      },
    },
  },
  takeScreenshot: {
    description: "Takes a screenshot of the current page",
    parameters: {},
  },
};

const tools: Tool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
  type: "function",
  name,
  description: config.description,
  parameters: {
    type: "object",
    properties: config.parameters,
  },
}));

export { tools };

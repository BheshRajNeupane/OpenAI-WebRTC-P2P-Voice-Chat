// define your functions here

const timeFunction = () => {
  const now = new Date();
  return {
    success: true,
    time: now.toLocaleTimeString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    message:
      "Announce to user: The current time is " +
      now.toLocaleTimeString() +
      " in " +
      Intl.DateTimeFormat().resolvedOptions().timeZone +
      " timezone.",
  };
};

const backgroundFunction = () => {
  try {
    const html = document.documentElement;
    const currentTheme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.classList.remove(currentTheme);
    html.classList.add(newTheme);

    alert(`Switched to ${newTheme} mode! 🌓`);

    return {
      success: true,
      theme: newTheme,
      message: `Switched to ${newTheme} mode`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to switch theme: ${error}`,
    };
  }
};

const launchWebsite = ({ url }: { url: string }) => {
  window.open(url, "_blank");
  alert(`Launched the site ${url}, tell the user it's been launched.`);
  return {
    success: true,
    message: `Launched the site${url}, tell the user it's been launched.`,
  };
};

const takeScreenshot = () => {
  const screenshot = document.querySelector("main");

  return {
    success: true,
    screenshot,
    message: "Screenshot taken. Ask the user to paste it somewhere.",
  };
};

const copyToClipboard = ({ text }: { text: string }) => {
  navigator.clipboard.writeText(text);
  alert("Text copied to clipboard! 📋");
  return {
    success: true,
    text,
    message: "Text copied to clipboard. Ask the user to paste it somewhere.",
  };
};

export {
  timeFunction,
  backgroundFunction,
  launchWebsite,
  takeScreenshot,
  copyToClipboard,
};

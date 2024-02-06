document.addEventListener("DOMContentLoaded", function () {
  const terminalInput = document.getElementById("terminal-input");
  const terminalText = document.getElementById("terminal-text");
  const terminalLoginInfo = document.getElementById("terminal-login-info");
  const terminalHints = document.getElementById("terminal-hints");
  const customCommands = {
    hello: {
      msg: "Hello :)",
    },
    goodbye: {
      msg: "Goodbye! Have a great day.",
    },
    joke: {
      msg: "What does the IT guy say when he gets a flash drive for his birthday? -Thanks for the memory.",
    },
    otherjoke: {
      msg: "What is the object-oriented way to make a fortune? - Inheritance",
    },
  };
  const history = [];
  let historyIndex = 0;

  // handle commands
  function handleCommand(command) {
    history.push(command);
    historyIndex = history.length;

    const commandInput = document.createElement("div");
    commandInput.classList.add("command-input");
    commandInput.textContent = `you: ${command}`;
    terminalText.appendChild(commandInput);

    const commandOutput = document.createElement("div");
    commandOutput.classList.add("command-output");

    if (command === "clear") {
      terminalText.innerHTML = "";
    } else if (command === "help") {
      displayCommands(commandOutput);
    } else if (command === "quote") {
      fetchQuote(commandOutput);
    } else if (command.startsWith("double")) {
      const number = parseFloat(command.split(" ")[1]);
      if (!isNaN(number)) {
        commandOutput.textContent = `terminal: Result: ${number * 2}`;
      } else {
        commandOutput.textContent =
          "terminal: Invalid input for double command";
      }
    } else if (customCommands.hasOwnProperty(command)) {
      commandOutput.textContent = `terminal: ${customCommands[command].msg}`;
    } else {
      commandOutput.textContent = `terminal: Command not found: ${command}`;
    }

    terminalText.appendChild(commandOutput);

    terminalInput.value = "";
    terminalInput.focus();
    terminalText.scrollTop = terminalText.scrollHeight;
  }

  // display available commands
  function displayCommands(outputContainer) {
    const commandsList = document.createElement("div");
    commandsList.innerHTML = "<strong>Available commands:</strong><br>";
    const commands = ["clear", "help", "quote", "double X"];

    commands.forEach((cmd) => {
      const commandItem = document.createElement("div");
      commandItem.textContent = `- ${cmd}`;
      commandsList.appendChild(commandItem);
    });

    const customCommandsList = document.createElement("div");
    customCommandsList.innerHTML = "<strong>Custom Commands:</strong><br>";
    for (const key in customCommands) {
      const customCommandItem = document.createElement("div");
      customCommandItem.textContent = `- ${key}: ${customCommands[key].msg}`;
      customCommandsList.appendChild(customCommandItem);
    }

    outputContainer.appendChild(commandsList);
    outputContainer.appendChild(customCommandsList);
  }

  // fetch random quote
  function fetchQuote(outputContainer) {
    fetch("https://dummyjson.com/quotes/random")
      .then((response) => response.json())
      .then((data) => {
        const quoteOutput = document.createElement("div");
        quoteOutput.textContent = `terminal: Random Quote: ${data.quote}`;
        outputContainer.appendChild(quoteOutput);
      })
      .catch((error) => {
        const errorOutput = document.createElement("div");
        errorOutput.textContent = "terminal: Error fetching quote";
        outputContainer.appendChild(errorOutput);
      });
  }

  // display command hints based on user input
  function displayCommandHints(input) {
    const availableCommands = ["clear", "help", "quote", "double"];
    const customCommandHints = Object.keys(customCommands);

    const matchingCommands = [
      ...availableCommands,
      ...customCommandHints,
    ].filter((cmd) => cmd.startsWith(input));

    const hintsText = matchingCommands.length
      ? `Available commands: ${matchingCommands.join(", ")}`
      : "No matching commands";

    terminalHints.textContent = hintsText;
  }

  // update hints
  terminalInput.addEventListener("input", function () {
    const userInput = terminalInput.value.trim();
    displayCommandHints(userInput);
  });

  // arrows
  terminalInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        terminalInput.value = "";
        historyIndex = history.length;
      }
    }
  });

  // handling the entered commands after pressing Enter
  terminalInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      const command = terminalInput.value.trim();
      if (command !== "") {
        handleCommand(command);
      }
    }
  });

  // terminal initialization
  const lastLoginTime = localStorage.getItem("lastLoginTime");
  if (lastLoginTime) {
    terminalLoginInfo.innerHTML = `Last login: ${lastLoginTime}`;
  } else {
    terminalLoginInfo.innerHTML = "Last login: This is your first visit!";
  }

  // update last login
  const currentLoginTime = new Date().toLocaleString();
  localStorage.setItem("lastLoginTime", currentLoginTime);

  terminalInput.focus();
});

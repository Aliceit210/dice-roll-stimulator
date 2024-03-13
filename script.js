const setRollButton = () => {
  const dicesElements = document.querySelectorAll(".dice");
  const rollButton = document.getElementById("roll-button");

  rollButton.addEventListener("click", () => {
    setDice(dicesElements);
  });
};

const setDice = (elements) => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  elements.forEach((dice) => {
    dice.classList.remove("active");
    handleDice(randomNumber, dice);
  });
};

const handleDice = (number, dice) => {
  if (dice.id === `dice-${number}`) {
    setDots(dice);
    addToHistory(dice);
  }
};

const setDots = (dice) => {
  const dots = Array.from(dice.children);
  const audio = new Audio((src = "https://bit.ly/dice-sound"));

  audio.play();
  displayDots(dots, dice);
};

const displayDots = (dots, dice) => {
  dots.forEach((dot) => {
    dot.classList.add("hide");

    setTimeout(() => {
      dot.classList.remove("hide");
    }, 1000);
  });
  setTimeout(() => {
    dice.classList.add("active");
  });
};

const addToHistory = (dice) => {
  const listItem = document.createElement("li");
  const diceCopy = dice.cloneNode(true);

  setDiceHistory(listItem, diceCopy);
};

const setDiceHistory = (item, dice) => {
  dice.style.display = "block";
  dice.querySelectorAll("span").forEach((dot) => {
    dot.classList.remove("hide");
  });

  displayDiceHistory(item, dice);
  setClearButton();
};

const displayDiceHistory = (item, dice) => {
  setTimeout(() => {
    item.classList.add("history__item");
    item.append(`You rolled`);
    item.append(dice);

    addDiceToTop(item);
  }, 1300);
};

const addDiceToTop = (item) => {
  const historyElements = getHistoryElements();
  const fistChild = historyElements.list.firstChild;

  historyElements.list.insertBefore(item, fistChild);
  historyElements.header.classList.add("switch-display");
  historyElements.button.classList.remove("hide");
};

const getHistoryElements = () => {
  const historyElements = {
    header: document.querySelector(".history__header"),
    list: document.querySelector("#history-list"),
    button: document.querySelector("#clear-button")
  };

  return historyElements;
};

const setClearButton = () => {
  const clearButton = getHistoryElements().button;

  clearButton.addEventListener("click", clearHistory);
};

const clearHistory = () => {
  const historyElements = getHistoryElements();

  historyElements.button.classList.add("hide");
  historyElements.header.classList.remove("switch-display");

  while (historyElements.list.firstChild) {
    historyElements.list.removeChild(historyElements.list.firstChild);
  }
};

const setChangeTheme = () => {
  const themeButton = document.getElementById("theme-button");

  themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-theme");
  });
};

window.addEventListener("DOMContentLoaded", () => {
  setChangeTheme();
  setRollButton();
});

let inc = document.querySelector("#inc");
let dec = document.querySelector("#dec");
let reset = document.querySelector("#reset");
let count = document.querySelector("#count");

chrome.storage.sync.get("count", (data) => {
  console.log(data, ", initial");
  if (data.count) {
    count.textContent = `${data.count}`;
  } else {
    saveToStorage(0);
    count.textContent = "0";
  }
});

function saveToStorage(value) {
  chrome.storage.sync.set({ count: value });
}
document.body.tabIndex = -1;
document.body.focus();

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    e.stopPropagation();
    incrementTally();
  }
  if (e.code === "ArrowUp" || e.code === "ArrowRight") {
    e.preventDefault();
    e.stopPropagation();
    incrementTally();
  }
  if (e.code === "ArrowDown" || e.code === "ArrowLeft") {
    e.preventDefault();
    e.stopPropagation();
    decrementTally();
  }
  if (e.code === "Escape") {
    e.preventDefault();
    e.stopPropagation();
    resetTally();
  }
});

inc.addEventListener("click", incrementTally);
dec.addEventListener("click", decrementTally);
reset.addEventListener("click", resetTally);

function incrementTally() {
  count.textContent = `${parseInt(count.textContent) + 1}`;
  saveToStorage(parseInt(count.textContent));
}

function decrementTally() {
  count.textContent = `${parseInt(count.textContent) - 1}`;
  saveToStorage(parseInt(count.textContent));
}

function resetTally() {
  count.textContent = "0";
  saveToStorage(parseInt(count.textContent));
}

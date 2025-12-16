let inc = document.querySelector("#inc");
let dec = document.querySelector("#dec");
let reset = document.querySelector("#reset");
let count = document.querySelector("#count");

let currentCount = 0;

function render() {
  count.textContent = currentCount;
}
function save() {
  chrome.storage.local.set({ count: currentCount });
}

chrome.storage.local.get("count", (data) => {
  console.log(data, ", initial");
  if ("count" in data) {
    currentCount = data.count;
  }
  render();
});

document.body.tabIndex = -1;
document.body.focus();

document.addEventListener("keydown", (e) => {
  if (["Space", "ArrowUp", "ArrowRight", "KeyK"].includes(e.code)) {
    e.preventDefault();
    e.stopPropagation();
    currentCount++;
  }

  if (["ArrowDown", "ArrowLeft", "KeyJ"].includes(e.code)) {
    e.preventDefault();
    currentCount--;
  }
  if (e.code === "KeyR") {
    e.preventDefault();
    currentCount = 0;
  }
  if (e.code === "Escape") {
    e.preventDefault();
    window.close();
  }
  render();
  save();
});

inc.onclick = () => {
  currentCount++;
  render();
  save();
};
dec.onclick = () => {
  currentCount--;
  render();
  save();
};
reset.onclick = () => {
  currentCount = 0;
  render();
  save();
};

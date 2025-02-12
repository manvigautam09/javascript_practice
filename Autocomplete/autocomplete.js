const sampleData = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
];

const history = [];

const handleInputOnChange = (val) => {
  const updatedItems = sampleData.filter((item) => val.contains(item));
  console.log(updatedItems);
};

const createInputList = (inputRef) => {
  const inputSection = document.getElementById("input-list-container");

  if (!inputSection) {
    const inputListContainer = document.createElement("div");

    inputListContainer.id = "input-list-container";
    inputListContainer.classList.add("input-list");
    sampleData.slice(0, 5).map((item) => {
      const listItem = document.createElement("div");
      listItem.textContent = item;
      listItem.classList.add("list-item");
      inputListContainer.appendChild(listItem);

      listItem.addEventListener("click", (e) => {
        inputRef.value = e.target.textContent;
      });
    });
    return inputListContainer;
  }

  inputSection.style.display = "block";
  return inputSection;
};

const updateListForInput = (value) => {
  console.log(value);
  const inputListContainer = document.getElementById("input-list-container");
};

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("auto-complete");
  input.classList.add("custom-input-style");

  // Listen for click events on the entire document
  document.addEventListener("click", (event) => {
    const inputSection = document.getElementById("input-list-container");
    // Check if the click is outside of the autocomplete input and dropdown
    if (
      inputSection &&
      !input.contains(event.target) &&
      !inputSection.contains(event.target)
    ) {
      inputSection.style.display = "none"; // Hide the dropdown
    }
  });

  input.addEventListener("focus", () => {
    const listContainer = createInputList(input);
    const parent = document.getElementById("app");
    parent.appendChild(listContainer);
  });

  input.addEventListener("input", (e) => {
    updateListForInput(e.target.value);
  });
});

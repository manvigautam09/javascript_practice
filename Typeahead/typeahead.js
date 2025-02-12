const sampleData = [
  { label: "New York", value: "New York" },
  { label: "Chicago", value: "Chicago" },
  { label: "Houston", value: "Houston" },
  { label: "Phoenix", value: "Phoenix" },
  { label: "Philadelphia", value: "Philadelphia" },
  { label: "San Antonio", value: "San Antonio" },
  { label: "San Diego", value: "San Diego" },
  { label: "Dallas", value: "Dallas" },
  { label: "San Jose", value: "San Jose" },
  { label: "Los Angeles", value: "Los Angeles" },
];

const debounce = (fn, delay) => {
  let id;
  return function (...args) {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const createInputList = async (inputRef) => {
  const inputSection = document.getElementById("input-list-container");
  if (!inputSection) {
    const inputListContainer = document.createElement("div");

    inputListContainer.id = "input-list-container";
    inputListContainer.classList.add("input-list");
    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    sampleData.slice(0, 5).map((item) => {
      const listItem = document.createElement("div");
      listItem.textContent = item.label;
      listItem.classList.add("list-item");
      inputListContainer.appendChild(listItem);

      listItem.addEventListener("click", (e) => {
        inputRef.value = e.target.textContent;
        const container = document.getElementById("input-list-container");
        container.style.display = "none";
      });
    });
    return inputListContainer;
  }

  inputSection.style.display = "block";
  return inputSection;
};

const updateListForInput = async (value, inputRef) => {
  if (!value.length) {
    const parent = document.getElementById("app");
    parent.removeChild(document.getElementById("input-list-container"));
    const newList = await createInputList(
      document.getElementById("auto-complete")
    );
    parent.appendChild(newList);
  } else {
    const inputListContainer = document.getElementById("input-list-container");
    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    const filteredData = sampleData.filter((item) =>
      item.value.includes(value)
    );
    inputListContainer.innerHTML = "";
    filteredData.map((item) => {
      const listItem = document.createElement("div");
      listItem.textContent = item.label;
      listItem.classList.add("list-item");
      inputListContainer.appendChild(listItem);

      listItem.addEventListener("click", (e) => {
        inputRef.value = e.target.textContent;
        inputListContainer.style.display = "none";
      });
    });
  }
};

const debounced = debounce(updateListForInput, 500);

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("auto-complete");
  input.classList.add("custom-input-style");

  document.addEventListener("click", (event) => {
    const inputSection = document.getElementById("input-list-container");
    if (
      inputSection &&
      !input.contains(event.target) &&
      !inputSection.contains(event.target)
    ) {
      inputSection.style.display = "none";
    }
  });

  input.addEventListener("focus", async () => {
    const listContainer = await createInputList(input);
    const parent = document.getElementById("app");
    parent.appendChild(listContainer);
  });

  input.addEventListener("input", (e) => {
    debounced(e.target.value, input);
  });
});

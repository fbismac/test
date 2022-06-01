import "regenerator-runtime/runtime";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

const form = document.querySelector("form");
const tvOptions = ["LED", "LCD", "OLED"];
const laptopOptions = ["Intel", "AMD"];
const shoeOptions = ["Piel", "Plástico"];

var optionsDD = document.querySelector("#optionsDD");
var labelValueTag = document.querySelector("#labelValueTag");
var labelOptionTag = document.querySelector("#labelOptionTag");
const resultsDiv = document.querySelector("#results");

document
  .getElementById("categorySelector")
  .addEventListener("change", async (event) => {
    event.preventDefault();

    removeOptions();

    var selectedCategory = document.getElementById("categorySelector").value;

    let array = [];
    if (selectedCategory == "tv") {
      array = tvOptions;

      labelOptionTag.innerHTML = "Tipo de Pantalla:";
      labelValueTag.innerHTML = "Tamaño de Pantalla:";
    }
    if (selectedCategory == "laptop") {
      array = laptopOptions;

      labelOptionTag.innerHTML = "Procesador:";
      labelValueTag.innerHTML = "Memoria RAM:";
    }
    if (selectedCategory == "shoe") {
      array = shoeOptions;

      labelOptionTag.innerHTML = "Material:";
      labelValueTag.innerHTML = "Número/Tamaño:";
    }

    for (var i = 0; i < array.length; i++) {
      let newOption = new Option(array[i], array[i]);
      optionsDD.add(newOption, undefined);
    }
  });

const removeOptions = () => {
  let index = optionsDD.options.length;
  while (index--) {
    optionsDD.remove(index);
  }
};

const getAllItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllItems`);

    const items = response.data;
    console.log("items = ", items);

    return items;
  } catch (errors) {
    console.error(errors);
  }
};

const refreshItems = (items) => {
  console.log("adding item = ", items);
  if (Array.isArray(items) && items.length > 0) {
    items.map((item) => {
      resultsDiv.appendChild(createElement(item));
    });
  } else if (!Array.isArray(items)) {
    resultsDiv.appendChild(createElement(items));
  }
};

const createElement = (item) => {
  const row = document.createElement("div");
  row.className = "row";
  row.id = item._id;

  const cellClassName = "col py-2 cell";

  const divEl1 = document.createElement("div");
  divEl1.className = cellClassName;
  divEl1.appendChild(document.createTextNode(item.name));

  const divEl2 = document.createElement("div");
  divEl2.className = cellClassName;
  divEl2.appendChild(document.createTextNode(item.sku));

  const divEl3 = document.createElement("div");
  divEl3.className = cellClassName;
  divEl3.appendChild(document.createTextNode(item.brand));

  let cost = 0;
  if (item.cost && !isNaN(item.cost)) {
    cost = getCostByCategory(item.category, item.cost);
  }

  const divEl4 = document.createElement("div");
  divEl4.className = cellClassName;
  divEl4.appendChild(document.createTextNode(cost));

  const divEl5 = document.createElement("div");
  divEl5.className = cellClassName;
  divEl5.appendChild(document.createTextNode(item.category));

  const divEl6 = document.createElement("div");
  divEl6.className = cellClassName;
  divEl6.appendChild(document.createTextNode(item.item_type));

  const divEl7 = document.createElement("div");
  divEl7.className = cellClassName;
  divEl7.appendChild(document.createTextNode(item.item_value));

  const deleteButton = document.createElement("button");
  deleteButton.value = item._id;
  deleteButton.innerHTML = "Borrar";
  deleteButton.onclick = async (event) => {
    await deleteItem(event.target.value);
  };
  const divEl8 = document.createElement("div");
  divEl8.className = cellClassName;
  divEl8.appendChild(deleteButton);

  row.appendChild(divEl1);
  row.appendChild(divEl2);
  row.appendChild(divEl3);
  row.appendChild(divEl4);
  row.appendChild(divEl5);
  row.appendChild(divEl6);
  row.appendChild(divEl7);
  row.appendChild(divEl8);

  return row;
};

const getCostByCategory = (category, cost) => {
  let percentage = 0;

  switch (category) {
    case "tv":
      percentage = 35;
      break;
    case "laptop":
      percentage = 40;
      break;
    case "shoe":
      percentage = 30;
      break;
    default:
      break;
  }

  if (!isNaN(cost)) {
    return parseFloat(cost) + parseFloat((cost * percentage) / 100);
  }

  return cost;
};

const main = async () => {
  refreshItems(await getAllItems());
};

main();

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const sku = document.querySelector("#sku").value;
  const brand = document.querySelector("#brand").value;
  const cost = document.querySelector("#cost").value;
  const category = document.querySelector("#categorySelector").value;
  const item_type = document.querySelector("#optionsDD").value;
  const item_value = document.querySelector("#itemValue").value;

  const item = {
    name,
    sku,
    brand,
    cost,
    category,
    item_type,
    item_value,
  };

  const submitItem = await addItem(item);
  refreshItems(submitItem);
});

export const addItem = async (item) => {
  try {
    const response = await axios.post(`${BASE_URL}/addNewItem`, item);
    const newItem = response.data;

    return newItem;
  } catch (errors) {
    console.error(errors);
  }
};

const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deleteItem/${itemId}`);
    const deleteResponse = response.data;

    const row = document.getElementById(deleteResponse._id);
    row.remove();
  } catch (error) {
    console.error(error);
  }
};

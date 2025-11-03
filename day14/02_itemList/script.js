const itemInput = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const itemList = document.getElementById("item-list");

addBtn.addEventListener("click", addItem);

function addItem() {
  const text = itemInput.value.trim();

  if (text === "") {
    alert("Please enter a valid item");
    return;
  }

  const li = document.createElement("li");

  li.appendChild(document.createTextNode(text));

  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "x";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", function () {
    itemList.removeChild(li);
  });

  li.appendChild(deleteBtn);

  itemList.appendChild(li);

  itemInput.value = "";
  itemInput.focus();
}

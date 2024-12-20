// Array of products with colors, labels, and associated images
const products = [
  {
    bgColor: "#816BFF",
    borderColor: "#816BFF",
    colorName: "Light Blue",
    imageSrc: "./assets/images/light-blue-watch.png",
  },
  {
    bgColor: "#1FCEC9",
    borderColor: "#1FCEC9",
    colorName: "Cyan",
    imageSrc: "./assets/images/cyan-watch.png",
  },
  {
    bgColor: "#4B97D3",
    borderColor: "#4B97D3",
    colorName: "Blue",
    imageSrc: "./assets/images/blue-watch.png",
  },
  {
    bgColor: "#3B4747",
    borderColor: "#3B4747",
    colorName: "Black",
    imageSrc: "./assets/images/black-watch.png",
  },
];

// initialize selected products
let selectedProducts = {
  name: " Classy Modern Smart watch",
  bandColor: [],
  imageSrc: [],
  size: [],
  price: [],
  total: [],
};

// initialize current selected product
let currentProduct = {
  name: " Classy Modern Smart watch",
  bandColor: "Light Blue",
  imageSrc: "./assets/images/light-blue-watch.png",
  size: "S",
  price: "69",
  total: 0,
};

let total = 0;
const checkoutText = document.getElementById("total-count");

// radio button,image,checkoutbutton declararion
const radio_btn = document.getElementById("radio-container");
const image = document.getElementById("image");
const checkoutButton = document.getElementById("checkout-btn");
const count_value = document.getElementById("count-total");
const buttons = document.querySelectorAll(".btn");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
// products
products.forEach((option, index) => {
  const label = document.createElement("label");
  label.className = "relative flex items-center";

  const input = document.createElement("input");
  input.type = "radio";
  input.name = "colorChoice";
  input.className = "peer hidden";

  const outerDiv = document.createElement("div");
  outerDiv.className = `w-6 h-6 rounded-full flex items-center justify-center border-2`;

  const innerDiv = document.createElement("div");
  innerDiv.className = `w-4 h-4 rounded-full`;

  // Apply dynamic styles
  outerDiv.style.borderColor = "transparent";
  innerDiv.style.backgroundColor = option.bgColor;

  // Preselect the first option
  if (index === 0) {
    input.checked = true;
    outerDiv.style.borderColor = option.borderColor;
    image.src = option.imageSrc; // Set initial image

    // Update the global object with the initial selection
    currentProduct.bandColor = option.colorName;
    currentProduct.imageSrc = option.imageSrc;
  }

  // input radio button
  input.addEventListener("change", () => {
    count_value.textContent = 0;
    total = 0;
    const allLabels = radio_btn.querySelectorAll("label");
    allLabels.forEach((l) => {
      l.querySelector("div").style.borderColor = "transparent";
    });
    outerDiv.style.borderColor = option.borderColor;
    image.src = option.imageSrc; // Update the image

    //set bandcolor and image src
    currentProduct.bandColor = option.colorName;
    currentProduct.imageSrc = option.imageSrc;
  });

  const span = document.createElement("span");

  label.appendChild(input);
  label.appendChild(outerDiv);
  outerDiv.appendChild(innerDiv);
  label.appendChild(span);
  radio_btn.appendChild(label);
});

// Update the counter value
function updateCount(value) {
  // count_value.textContent = 0;
  let currentValue = parseInt(count_value.textContent);
  console.log("update value2", currentValue);
  console.log("value", value);
  currentValue += value;
  if (currentValue < 0) {
    currentValue = 0;
    return;
  }

  count_value.textContent = currentValue;
  currentProduct.total = currentValue;
}

//product pricing
function handleButtonClick(button, size, price) {
  count_value.textContent = 0;
  total = 0;

  // Reset border colors and text color of size for all buttons
  buttons.forEach((btn) => {
    btn.classList.replace("border-[#6576FF]", "border-[#DBDFEA]");
    const sizeTxt = btn.querySelector(".size-txt");
    sizeTxt.classList.replace("text-[#6576FF]", "text-[#364A63]");
  });

  // Set border color and text color of size for the clicked button
  button.classList.replace("border-[#DBDFEA]", "border-[#6576FF]");
  const clickedSizeTxt = button.querySelector(".size-txt");
  clickedSizeTxt.classList.replace("text-[#364A63]", "text-[#6576FF]");
  currentProduct.size = size;
  currentProduct.price = price;
}

// add to cart button
function addToCartBtn() {
  //validation
  const value = parseInt(count_value.textContent);
  if (value <= 0) {
    alert("Please select at least one item");
    return;
  } else {
    checkoutButton.style.display = "flex";
    selectedProducts.size.push(currentProduct.size);
    selectedProducts.price.push(currentProduct.price);
    selectedProducts.bandColor.push(currentProduct.bandColor);
    selectedProducts.imageSrc.push(currentProduct.imageSrc);
    selectedProducts.total.push(currentProduct.total);
    console.log("details from add to cart", selectedProducts);
    total = selectedProducts.total.reduce(
      (total, currentValue) => total + currentValue
    );
    checkoutText.innerText = total;
  }
}

//checkout button
function checkoutBtn() {
  console.log("checkout from add to cart", selectedProducts);

  modalContent.innerHTML = "";

  let totalQuantity = 0;
  let totalPrice = 0;

  // table row
  const itemRows = selectedProducts.bandColor
    .map((color, i) => {
      totalQuantity += selectedProducts.total[i];
      totalPrice +=
        parseFloat(selectedProducts.price[i].replace("$", "")) *
        selectedProducts.total[i];

      return `
    <tr class="border-b">
      <td class="py-4 flex items-center">
        <img
          alt="${selectedProducts.name}"
          class="w-9 h-9 rounded mr-4"
          height="50"
          src="${selectedProducts.imageSrc[i]}"
        />
        <span class="text-[#364A63]">${selectedProducts.name}</span>
      </td>
      <td class="py-4 text-left text-[#364A63]">${color}</td>
      <td class="py-4 pr-6 font-semibold text-sm	 text-[#364A63]">${
        selectedProducts.size[i]
      }</td>
      <td class="py-4 font-semibold text-sm	 text-[#364A63]">${
        selectedProducts.total[i]
      }</td>
      <td class="py-4 font-semibold text-sm	 text-right text-[#364A63]">$${Number(
        selectedProducts.price[i]
      ).toFixed(2)}</td>
    </tr>
  `;
    })
    .join("");

  // table
  const tableHTML = `
   <div class="fixed inset-0 flex items-center justify-center">
        <div class=" bg-white overflow-y-auto rounded-lg shadow-lg p-6 w-full max-w-2xl">
  <h1 class="text-2xl font-bold mb-4 text-[#364A63]">Your Cart</h1>
  <table class="w-full text-left">
    <thead>
        <tr class="border-b text-[#8091A7] text-sm">
          <th class="py-2 font-normal">Item</th>
          <th class="py-2 font-normal">Color</th>
          <th class="py-2 font-normal pr-6">Size</th>
          <th class="py-2 font-normal">Qnt</th>
          <th class="py-2 font-normal text-right">Price</th>
        </tr>
      </thead>
    <tbody>
      ${itemRows}
    </tbody>
    <tfoot>
      <tr>
        <td class="py-4 font-semibold text-[#373737]" colspan="3">Total</td>
        <td class="py-4 font-bold text-[#364A63]">${totalQuantity}</td>
        <td class="py-4 font-bold text-right text-[#364A63]">$${totalPrice.toFixed(
          2
        )}</td>
      </tr>
    </tfoot>
  </table>
  <div class="flex justify-end gap-6 mt-6">
    <button
      class="bg-white text-[#364A63] font-bold text-sm border border-[#DBDFEA] px-4 py-2 rounded"
    >
      Continue Shopping
    </button>
    <button class="bg-[#6576FF] font-bold text-sm text-white px-[18px] py-2 rounded">
      Checkout
    </button>
  </div>
  </div>
  </div>
`;

  // Add table HTML to the modalContent
  modalContent.innerHTML = tableHTML;
  modal.classList.remove("hidden");
}

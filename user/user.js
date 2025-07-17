const menuContainer = document.getElementById('menuContainer');

async function fetchMenuItems() {
  try {
    const response = await fetch('http://localhost:5000/api/menu');
    const items = await response.json();
    displayMenuItems(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
  }
}

function displayMenuItems(items) {
  menuContainer.innerHTML = ''; // clear previous items

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <p>Category: ${item.category}</p>
      <img src="${item.imageUrl}" alt="${item.name}" width="120">
      <hr/>
    `;
    menuContainer.appendChild(itemDiv);
  });
}

// Call on page load
fetchMenuItems();

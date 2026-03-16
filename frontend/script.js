const API_BASE = "http://minirent.info";

async function loadProducts() {
  const list = document.getElementById("products-list");
  list.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE}/products`);
    const products = await response.json();

    products.forEach(product => {
      const li = document.createElement("li");
      li.textContent = `#${product.id} - ${product.name} - ${product.price} €`;
      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = "<li>Erreur lors du chargement des produits</li>";
  }
}

async function loadReservations() {
  const list = document.getElementById("reservations-list");
  list.innerHTML = "";

  try {
    const response = await fetch(`${API_BASE}/reservations`);
    const reservations = await response.json();

    reservations.forEach(reservation => {
      const li = document.createElement("li");
      li.textContent = `#${reservation.id} - ${reservation.customer_name} - produit ${reservation.product_id}`;
      list.appendChild(li);
    });
  } catch (error) {
    list.innerHTML = "<li>Erreur lors du chargement des réservations</li>";
  }
}

document.getElementById("reservation-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const customer_name = document.getElementById("customer_name").value;
  const product_id = parseInt(document.getElementById("product_id").value, 10);
  const message = document.getElementById("message");

  try {
    const response = await fetch(`${API_BASE}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ customer_name, product_id })
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = `Réservation créée : #${data.id}`;
      document.getElementById("reservation-form").reset();
      loadReservations();
    } else {
      message.textContent = `Erreur : ${data.error || "échec de création"}`;
    }
  } catch (error) {
    message.textContent = "Erreur réseau";
  }
});
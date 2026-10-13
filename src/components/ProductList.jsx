import React, { useState } from "react";

const categories = {
  "Air Purifying Plants": [
    ["Snake Plant", 15],
    ["Spider Plant", 12],
    ["Peace Lily", 18],
    ["Aloe Vera", 10],
    ["Boston Fern", 16],
    ["Areca Palm", 25],
  ],
  "Aromatic Plants": [
    ["Lavender", 14],
    ["Rosemary", 9],
    ["Mint", 8],
    ["Basil", 7],
    ["Jasmine", 20],
    ["Lemon Balm", 11],
  ],
  "Decorative Plants": [
    ["Monstera", 30],
    ["Pothos", 13],
    ["ZZ Plant", 22],
    ["Rubber Plant", 27],
    ["Calathea", 24],
    ["Fiddle Leaf Fig", 35],
  ],
};

const plants = Object.entries(categories).flatMap(
  ([category, items]) =>
    items.map(([name, price]) => ({
      name,
      price,
      category,
      image: `https://loremflickr.com/320/240/houseplant?lock=${
        name.length * 13 + price
      }`,
    }))
);

function ProductList({ onHome, onCart, addToCart, cartItems }) {
  const [localCart, setLocalCart] = useState([]);
  const [page, setPage] = useState("plants");

  const usingExternalCart =
    typeof addToCart === "function" && Array.isArray(cartItems);

  const currentCart = usingExternalCart ? cartItems : localCart;

  const cartCount = currentCart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const isAdded = (name) =>
    currentCart.some((item) => item.name === name);

  const handleAdd = (plant) => {
    if (isAdded(plant.name)) return;

    if (usingExternalCart) {
      addToCart(plant);
    } else {
      setLocalCart((prev) => [
        ...prev,
        { ...plant, quantity: 1 },
      ]);
    }
  };

  return (
    <div style={{ padding: "24px", fontFamily: "Arial" }}>
      <nav style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => onHome ? onHome() : setPage("home")}>
          Home
        </button>
        <button onClick={() => setPage("plants")}>
          Plants
        </button>
        <button onClick={() => onCart ? onCart() : setPage("cart")}>
          Cart ({cartCount})
        </button>
      </nav>

      {page === "home" && <h2>Welcome to Paradise Nursery!</h2>}

      {page === "cart" && (
        <div>
          <h2>Shopping Cart</h2>
          <p>Total items: {cartCount}</p>
        </div>
      )}

      {page === "plants" && (
        <>
          <h1>Paradise Nursery</h1>
          <h2>Our Houseplants</h2>

          {Object.keys(categories).map((category) => (
            <section key={category}>
              <h2>{category}</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "20px",
                }}
              >
                {plants
                  .filter((plant) => plant.category === category)
                  .map((plant) => (
                    <div
                      key={plant.name}
                      style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />

                      <h3>{plant.name}</h3>
                      <p>${plant.price.toFixed(2)}</p>

                      <button
                        onClick={() => handleAdd(plant)}
                        disabled={isAdded(plant.name)}
                      >
                        {isAdded(plant.name)
                          ? "Added to Cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

export default ProductList;

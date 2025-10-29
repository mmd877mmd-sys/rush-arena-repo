"use client";

import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = async () => {
    try {
      const res = await axios.post("/api/matches", {
        name,
        price: Number(price),
      });
      console.log("Inserted:", res.data);
      alert("Product added!");
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

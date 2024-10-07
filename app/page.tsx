"use client";
import { useState } from "react";

export default function ShoppingCart() {
  // Use a string array to store item names
  const [items, setItems] = useState<string[]>([]); 

  // Add a new item to the cart
  const addItem = (): void => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]); // Add the new item to the array
  };

  // Remove the last item from the cart
  const removeItem = (): void => {
    if (items.length > 0) {
      setItems(items.slice(0, -1)); // Remove the last item in the array
    }
  };

  // Clear the cart by emptying the array
  const clearCart = (): void => {
    setItems([]);
  };

  return (
    <div className="container mx-auto py-3">
      <h1>Shopping Cart</h1>
      <p>Total Items: {items.length}</p>

      {/* Display list of items */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li> // Render each item in the array
        ))}
      </ul>

      <div className="flex gap-3">
        <button onClick={addItem} className="p-2 bg-green-500 text-white rounded">Add Item</button>
        <button onClick={removeItem} className="p-2 bg-red-500 text-white rounded">Remove Last Item</button>
        <button onClick={clearCart} className="p-2 bg-gray-500 text-white rounded">Clear Cart</button>
      </div>
    </div>
  );
}

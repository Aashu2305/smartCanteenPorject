import React from "react";
import "./About.css"; // custom styles for About section

function About() {
  return (
    <section id="about" className="about-section">
      <h2>About KIIT Smart Canteen</h2>
      <p>
        KIIT Smart Canteen is your one-stop solution to order delicious meals, snacks, 
        beverages, and bakery items right from your phone or laptop. No more waiting in long queues — 
        order online, pay digitally, and just pick up your food when it’s ready.
      </p>

      <h3>Facilities We Provide 🚀</h3>
      <ul>
        <li>📱 Easy online ordering from anywhere on campus</li>
        <li>💳 Multiple payment options (UPI, Cards, Wallets)</li>
        <li>⏳ Real-time order tracking</li>
        <li>🍱 Multiple food categories – snacks, fast food, beverages, bakery</li>
        <li>⚡ Fast and hygienic service</li>
      </ul>

      <h3>How to Use This Website 🛠️</h3>
      <ol>
        <li>Browse the <strong>Menu</strong> and pick your favorite items</li>
        <li>Click <strong>Add to Cart</strong> for each item</li>
        <li>Go to the <strong>Cart</strong> icon to review your order</li>
        <li>Proceed to checkout and choose your payment method</li>
        <li>Collect your food at the pick-up counter once it’s ready</li>
      </ol>
    </section>
  );
}

export default About;

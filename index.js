const express = require('express');
const app = express();
const cors = require('cors'); 
const port = 3000;

const corsOptions = {
    origin: "*", // Allow all origins 
    credentials: true, // Allow credentials like cookies
    allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
  };
  
  // Use CORS middleware with custom options
  app.use(cors(corsOptions));

  app.use(express.json())

  const products = {
    "Hair Growth": [
      { id: 1, name: "Shampoo", price: "Rs.10" },
      { id: 2, name: "Hair Oil", price: "Rs.15" },
      { id: 3, name: "Conditioner", price: "Rs.12" },
      { id: 4, name: "Hair Mask", price: "Rs.20" },
    ],
    "Face Wash": [
      { id: 5, name: "Gentle Cleanser", price: "Rs.8" },
      { id: 6, name: "Foaming Face Wash", price: "Rs.10" },
      { id: 7, name: "Exfoliating Face Wash", price: "Rs.12" },
      { id: 8, name: "Hydrating Face Wash", price: "Rs.14" },
    ],
  };
// endpoint 1: Tips for Shopify Store Owners
app.get('/api/tips', (req, res) => {
    res.json({
        tips: [
            "Optimize your store's SEO.",
            "Provide detailed product descriptions.",
            "Offer free shipping for orders above Rs.50."
        ]
    });
});

// endpoint 2: List of Recommended Products
app.get("/api/products", (req, res) => {
    const category = req.query.category;
  
    if (category && products[category]) {
      res.json(products[category]);
    } else {
      res.json({ error: "Category not found or not provided" });
    }
  });


// endpoint 3: Shopify Store Announcements
app.get('/api/announcements', (req, res) => {
    res.json({
        announcements: [
            "End-of-Season Sale starts next week!",
            "New arrivals launching tomorrow.",
            "Free shipping on all orders over Rs.100."
        ]
    });
});


// Start server
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});

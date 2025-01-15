const express = require('express');
const app = express();
const cors = require('cors'); 
const port = 3000;

const corsOptions = {
    origin: "*", // Allow all origins or specify a domain like 'http://example.com'
    credentials: true, // Allow credentials like cookies
    allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
  };
  
  // Use CORS middleware with custom options
  app.use(cors(corsOptions));


// endpoint 1: Tips for Shopify Store Owners
app.get('/api/tips', (req, res) => {
    res.json({
        tips: [
            "Optimize your store's SEO.",
            "Provide detailed product descriptions.",
            "Offer free shipping for orders above $50."
        ]
    });
});

// endpoint 2: List of Recommended Products
app.get('/api/products', (req, res) => {
    res.json({
        products: [
            { id: 1, name: 'Wireless Mouse', price: '$25' },
            { id: 2, name: 'Mechanical Keyboard', price: '$75' },
            { id: 3, name: 'Gaming Headset', price: '$45' }
        ]
    });
});

// endpoint 3: Shopify Store Announcements
app.get('/api/announcements', (req, res) => {
    res.json({
        announcements: [
            "End-of-Season Sale starts next week!",
            "New arrivals launching tomorrow.",
            "Free shipping on all orders over $100."
        ]
    });
});


// Start server
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});

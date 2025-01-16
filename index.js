const express = require('express');
const path = require('path'); 
const cors = require('cors'); 

const app = express();

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
  app.use('/images',express.static(path.join(__dirname, 'public/images')))

  const products = {
    "Hair Growth": [
      { id: 1, name: "Shampoo", price: "Rs.10", image: 'https://shopidy-api.vercel.app/images/shampoo.webp' },
      { id: 2, name: "Hair Oil", price: "Rs.15", image: 'https://shopidy-api.vercel.app/images/hairoil.webp' },
      { id: 3, name: "Conditioner", price: "Rs.12", image: 'https://shopidy-api.vercel.app/images/conditioner.webp' },
      { id: 4, name: "Hair Mask", price: "Rs.20", image: 'https://shopidy-api.vercel.app/images/mask.webp' },
    ],
    "Face Wash": [
      { id: 5, name: "Gentle Cleanser", price: "Rs.8", image: 'https://shopidy-api.vercel.app/images/celanser.webp' },
      { id: 6, name: "Foaming Face Wash", price: "Rs.10", image: 'https://shopidy-api.vercel.app/images/foamingfacewash.webp' },
      { id: 7, name: "Exfoliating Face Wash", price: "Rs.12", image: 'https://shopidy-api.vercel.app/images/facewash.webp' },
      { id: 8, name: "Hydrating Face Wash", price: "Rs.14", image: 'https://shopidy-api.vercel.app/images/hydratingfacewash.webp' },
    ],
  };
  
  console.log(path.join(__dirname, 'public/images'));

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

const deliveryEstimates = {
  "400001": "3-5 days", // Mumbai
  "400059": "3-5 days", // Mumbai
  "400080": "3-5 days", // Mumbai
  "110001": "5-7 days", // Delhi
  "110085": "5-7 days", // Delhi
  "110092": "5-7 days", // Delhi
  "560001": "7-10 days", // Bangalore
  "560034": "7-10 days", // Bangalore
  "560100": "7-10 days", // Bangalore
  "411001": "4-6 days", // Pune
  "411038": "4-6 days", // Pune
  "411057": "4-6 days"  // Pune
};
// Endpoint for estimated delivery time
app.get('/api/delivery-estimate', (req, res) => {
  const pincode = req.query.pincode; // Extract pincode from query parameters

  if (!pincode) {
    return res.status(400).json({ error: "Pincode is required" });
  }

  const deliveryTime = deliveryEstimates[pincode];

  if (!deliveryTime) {
    return res
      .status(404)
      .json({ error: "Delivery information not available for this pincode" });
  }

  res.json({
    pincode,
    estimatedDeliveryTime: deliveryTime,
  });
});


// Start server
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});

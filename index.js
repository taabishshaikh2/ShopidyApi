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
      { id: 1, name: "Shampoo", price: "₹599", image: 'https://shopidy-api.vercel.app/images/shampoo.webp' },
      { id: 2, name: "Hair Oil", price: "₹299", image: 'https://shopidy-api.vercel.app/images/hairoil.webp' },
      { id: 3, name: "Conditioner", price: "₹549", image: 'https://shopidy-api.vercel.app/images/conditioner.webp' },
      { id: 4, name: "Hair Mask", price: "₹249", image: 'https://shopidy-api.vercel.app/images/mask.webp' },
    ],
    "Face Wash": [
      { id: 5, name: "Gentle Cleanser", price: "₹399", image: 'https://shopidy-api.vercel.app/images/celanser.webp' },
      { id: 6, name: "Foaming Face Wash", price: "₹349", image: 'https://shopidy-api.vercel.app/images/foamingfacewash.webp' },
      { id: 7, name: "Exfoliating Face Wash", price: "₹699", image: 'https://shopidy-api.vercel.app/images/facewash.webp' },
      { id: 8, name: "Hydrating Face Wash", price: "₹749", image: 'https://shopidy-api.vercel.app/images/hydratingfacewash.webp' },
    ],
  };
  
  console.log(path.join(__dirname, 'public/images'));


// endpoint 1: List of Recommended Products
app.get("/api/products", (req, res) => {
    const category = req.query.category;
  
    if (category && products[category]) {
      res.json(products[category]);
    } else {
      res.json({ error: "Category not found or not provided" });
    }
  });


// endpoint 2: Shopify Store Announcements
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
// endpoint 3: estimated delivery time
app.get('/api/delivery-estimate', (req, res) => {
  const pincode = req.query.pincode; 

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

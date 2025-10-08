const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const contactRoutes= require("./routes/contact");

dotenv.config();
const app= express();

app.use(cors());



app.use(express.json());
//Routers
app.use('/api/contact', contactRoutes);
//Start server
const PORT= process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 server running on port  ${PORT}`)); 
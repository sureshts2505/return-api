require("./db")
const express = require("express")
const cors = require("cors")
const path = require("path");

const lostRoutes = require("./routes/lostRoutes");
const foundRoutes = require("./routes/foundRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express();
app.use(cors());
app.use(express.json());


app.use("/uploads/lost", express.static(path.join(__dirname, "uploads/lost")));
app.use("/uploads/found", express.static(path.join(__dirname, "uploads/found")));


app.use("/lost", lostRoutes);
app.use("/found" , foundRoutes)
app.use("/auth" , authRoutes)


app.listen(5000, () => console.log("Server Started"))
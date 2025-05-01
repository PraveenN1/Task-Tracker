const dotenv=require("dotenv");
dotenv.config();

const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const taskRoutes=require("./routes/taskRoutes");
const projectRoutes=require("./routes/projectRoutes");
const { authenticateRoute } = require("./middleware/authenticate");


const app=express();
const PORT=process.env.PORT||3000;

app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: ["GET","POST","PUT", "PATCH", "DELETE"],
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log('MongoDB Connected'));
    })
    .catch((err) => console.error(err));

// Apply auth middleware to ALL routes (only if needed globally)
app.use((req, res, next) => {
  const token = req.headers.cookie?.split("=")[1];
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }
  next();
});

// Optionally attach user to res.locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use('/api/auth',authRoutes);
app.use('/api/projects',projectRoutes);
app.use('/api/tasks',taskRoutes);

app.get('/',authenticateRoute,(req,res)=>{
  res.json(req.user);
})

app.listen(PORT,()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
})
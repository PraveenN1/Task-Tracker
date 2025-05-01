const express=require("express");
const router=express.Router();
const {signupUser,loginUser,logOutUser}=require("../controllers/authController");

router.post('/login',loginUser);
router.post('/signup',signupUser);
router.post("/logout",logOutUser);

module.exports=router;
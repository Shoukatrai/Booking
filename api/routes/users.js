import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const usersRoute = express.Router()

// usersRoute.get("/check" , verifyToken , (req , res)=>{
//     res.send("Hello user you are logged in .....")
// })

// usersRoute.get("/checkUser/:id" , verifyUser,(req , res)=>{
//     res.send("Hello user you are logged in and can delete your account")
// })
// usersRoute.get("/checkadmin/:id" , verifyAdmin,(req , res)=>{
//     res.send("Hello admin you are logged in and can delete all accounts")
// })
//UPDATE
usersRoute.put("/:id" ,verifyUser, updateUser)
//DELETE
usersRoute.delete("/:id" ,verifyUser, deleteUser)
//GET
usersRoute.get("/:id" , verifyUser , getUser)
//GET ALL
usersRoute.get("/" , verifyAdmin , getUsers)

export default usersRoute 
import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user , you are loged in!")
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     console.log("user" , req)
//     res.send("hello user , you are loged in and you can delete your account!")
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     console.log("user" , req)
//     res.send("hello admin , you are loged in and you can delete all account!")
// });

//DELETE
router.delete("/:id",verifyUser ,deleteUser);
//UPDATE
router.put("/:id",verifyUser ,updateUser);
//GET
router.get("/:id", verifyUser,getUser);
//GET ALL
router.get("/", verifyAdmin,getUsers);
export default router;

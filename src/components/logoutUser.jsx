import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ToastContainer } from "react-toastify";

const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
  <ToastContainer/>
};

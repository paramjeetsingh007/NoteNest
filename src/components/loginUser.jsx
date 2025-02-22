import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    toast.success("Login successful!", { autoClose: 1000 });
  } catch (error) {
    console.error("Login Error:", error.message);
    toast.error(`Login failed: ${error.message}`, { autoClose: 1000 });
  }

};

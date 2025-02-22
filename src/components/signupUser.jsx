import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const signupUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
  } catch (error) {
    console.error("Signup Error:", error.message);
  }
 
};

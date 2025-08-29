import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const API_URL = "http://localhost:5000/api/auth"; // Backend URL

// Email/Password Signup
export async function registerWithEmail(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUid = userCredential.user.uid;

    // Send to backend
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid, email, name })
    });
    return await res.json();
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}

// Google Signup
export async function registerWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUid = result.user.uid;
    const email = result.user.email;
    const name = result.user.displayName;

    // Send to backend
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid, email, name })
    });
    return await res.json();
  } catch (err) {
    console.error("Google registration error:", err);
    throw err;
  }
}

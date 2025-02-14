"use client";
import { auth } from "@/lib/firebase/config";
import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { IAuthContext } from "@/lib/types";

const AuthContext = createContext<IAuthContext>({
  user: "loading",
  googleSignIn: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<IAuthContext["user"]>("loading");

  // login function
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: "vitstudent.ac.in",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user?.email || "";

      // Enforce VIT email restriction
      if (!email.endsWith("@vitstudent.ac.in")) {
        await signOut(auth); // Immediately sign out if not a VIT email
        setUser(null); // Reset user state

        throw new Error("Only VIT student emails are allowed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // logout function
  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email?.endsWith("@vitstudent.ac.in")) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};


// AuthProvider.js

import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import app from '../Firebase/Firebase'; // Ensure this path is correct

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once authentication is complete
    });
    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
      // Handle error or provide feedback to the user
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
      // Handle error or provide feedback to the user
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleSignInWithGoogle, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

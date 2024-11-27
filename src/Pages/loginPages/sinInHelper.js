// signUpHelpers.js

import { onAuthStateChanged } from "firebase/auth";

export const handleSignInGoogle = async (signInGoogle, auth, nav, error) => {
    try {
        await signInGoogle().unwrap();
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                nav("/myBooks/allBooks", { replace: true });
            }
        });
    } catch {
        console.error('Failed to sign in:', error);
    }
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import "./loginPages.css";
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { useSignInFacebookMutation, useSignInGoogleMutation } from '../../api/authApiSlice';

function SignInPage() {
    const nav = useNavigate();
    const [signInGoogle, { error }] = useSignInGoogleMutation();
    const [signInFacebook, { error: err }] = useSignInFacebookMutation();
    async function handleSignInGoogle() {
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
    }
    async function handleSignInFacebook() {
        try {
            await signInFacebook().unwrap();
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    nav("/myBooks/allBooks", { replace: true });
                }
            });
        } catch {
            console.error('Failed to sign in:', err);
        }
    }
    const schema = z.object({
        email: z
            .string()
            .email({ message: 'Please enter a valid email address' }),
        password: z
            .string()
            .min(5, { message: 'Password must be at least 5 characters long' })
        ,
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        // await new Promise((res) => setTimeout(res, 3000)); 
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    nav("/myBooks/allBooks", { replace: true });
                }
            });
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                setError("password", {
                    type: "server",
                    message: "Incorrect password. Please try again.",
                });
            } else if (error.code === "auth/user-not-found") {
                setError("email", {
                    type: "server",
                    message: "No account found with this email.",
                });
            } else {
                setError("root", {
                    type: "server",
                    message: "An error occurred. Please try again."
                });
            }
        }
    };

    return (
        <div className='signIn-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign In</h1>
                <div className='signIn-inputs'>
                    <div className='signIn-input'>
                        <label htmlFor="email">Email</label>
                        <input id="email" {...register("email")} />
                        {errors.email && <p className="errorMessage">{errors.email?.message}</p>}
                    </div>
                    <div className='signIn-input'>
                        <label htmlFor="password">Password</label>
                        <input id="password" type='password' {...register("password")} />
                        {errors.password && <p className="errorMessage">{errors.password?.message}</p>}
                    </div>
                </div>
                {errors.root && <p style={{ color: "red" }}>{errors.root.message}</p>}
                <button type='submit' disabled={isSubmitting} >{isSubmitting ? "Submitting..." : "Submit"}</button>

            </form>
            <Link to={"/signUp"}>Create new account</Link>
            <div className='signIn-links'>
                <button type='button' onClick={handleSignInGoogle} >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt style={{ width: "20px" }} />
                    <i className="fab fa-google"></i> Sign In with Google
                </button>
                <button type='button' onClick={handleSignInFacebook} >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt style={{ width: "20px" }} />
                    <i className="fab fa-facebook-f"></i> Sign In with Facebook
                </button>
            </div>
        </div>
    );
}

export default SignInPage;

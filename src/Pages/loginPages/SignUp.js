import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInFacebookMutation, useSignInGoogleMutation } from '../../api/authApiSlice';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { handleSignInGoogle } from './sinInHelper';
function SignUp() {
    const nav = useNavigate();
    const [signInGoogle, { error }] = useSignInGoogleMutation();
    const [signInFacebook, { error: err }] = useSignInFacebookMutation();

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
    const schema = z.object(
        {
            email: z.string().email(),
            password: z.string().min(5),
            confirm: z.string()
        }
    ).refine(d => d.password === d.confirm, {
        message: 'passwords should matches',
        path: ["confirm"]
    });

    const {
        register,
        handleSubmit,
        setError, // dealing with errors that is thrown from server for example
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });
    const onSubmit = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    nav("/myBooks/allBooks", { replace: true });
                }
            });
        } catch (error) {
            if (error.code === "auth/weak-password") {
                setError("password", {
                    type: "server",
                    message: "Password should be at least 6 characters.",
                });
            } else if (error.code === "auth/email-already-in-use") {
                setError("email", {
                    type: "server",
                    message: "This email is already in use.",
                });
            } else {
                // Handle other types of errors
                setError("root", {
                    type: "server",
                    message: "An unknown error occurred. Please try again.",
                });
            }
        }
    };
    console.log(errors);

    return (
        <div className='signUp-container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign Up</h1>
                <div className='signUp-inputs'>

                    <div className='signUp-input'>
                        <label htmlFor='Email'>Email</label>
                        <input id='Email' {...register("email")} />
                        {errors.email && <p className='errorMessage'>{errors.email?.message}</p>}

                    </div>
                    <div className='signUp-input'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' {...register("password")} />
                        {errors.password && <p className='errorMessage'>{errors.password?.message}</p>}

                    </div>
                    <div className='signUp-input'>
                        <label htmlFor='confirm'>Confirm password</label>
                        <input id='confirm' type='password' {...register("confirm")} />
                        {errors.confirm && <p className='errorMessage'>{errors.confirm?.message}</p>}

                    </div>
                </div>
                <button type='submit' disabled={isSubmitting} >{isSubmitting ? "Submitting..." : "Submit"}</button>
                <Link to={"/signIn"}>Already have an account</Link>
                <div className='signUp-links'>
                    <button type='button' onClick={() => handleSignInGoogle(signInGoogle, auth, nav, error)}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt style={{ width: "20px" }} />
                        <i className="fab fa-google"></i> Sign up with Google
                    </button>
                    <button type='button' onClick={handleSignInFacebook}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt style={{ width: "20px" }} />
                        <i className="fab fa-facebook-f"></i> Sign up with Facebook
                    </button>
                </div>
                {errors.root && <p>{errors.root.message}</p>} {/* Show general error */}
            </form>
        </div>
    );
};

export default SignUp;

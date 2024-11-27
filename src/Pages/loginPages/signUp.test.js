import { render, screen } from "@testing-library/react";
import SignUp from "./SignUp";
import userEvent from "@testing-library/user-event";
import TestWrapper from "../../Components/TestWrapper";
import { handleSignInGoogle } from './sinInHelper'; // Import the helper function


// Mock the firebase/auth module
jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(),
        GoogleAuthProvider: jest.fn(),
        FacebookAuthProvider: jest.fn(),
        // signInWithPopup: jest.fn(),
    };
});

// Spy on handleSignInGoogle
jest.mock('./sinInHelper.js', () => ({
    handleSignInGoogle: jest.fn(),
}));


describe("test elements render correctly", () => {
    test("renders all inputs correctly", () => {

        render(
            <TestWrapper>
                <SignUp />
            </TestWrapper>
        );
        expect(screen.getByLabelText("Email", { selector: "input" })).toBeInTheDocument();
        expect(screen.getByLabelText("Password", { selector: "input" })).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm password", { selector: "input" })).toBeInTheDocument();
    });

    test("renders all links correctly", () => {
        render(
            <TestWrapper>
                <SignUp />
            </TestWrapper>
        );
        expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign up with Google/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign up with Facebook/i)).toBeInTheDocument();
    });
});

describe("test user interaction", () => {
    // beforeEach(()=>{})
    const user = userEvent;


    test("error message renders correctly for email input", async () => {
        render(
            <TestWrapper>
                <SignUp />
            </TestWrapper>
        );
        const emailInput = screen.getByLabelText("Email", { selector: "input" });
        const submitBtn = screen.getByRole("button", { name: "Submit" });

        user.type(emailInput, "asd");
        user.click(submitBtn);

        expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
    });

    test("error message renders correctly for password input", async () => {
        render(
            <TestWrapper>
                <SignUp />
            </TestWrapper>
        );;
        const passwordInput = screen.getByLabelText("Password", { selector: "input" });
        const submitBtn = screen.getByRole("button", { name: "Submit" });

        user.type(passwordInput, "asd");
        user.click(submitBtn);

        expect(await screen.findByText(/string must contain at least 5 character\(s\)/i)).toBeInTheDocument();
    });

    test("error message renders correctly for confirm password input", async () => {
        render(
            <TestWrapper>
                <SignUp />
            </TestWrapper>
        );

        const passwordInput = screen.getByLabelText("Password", { selector: "input" });
        const confirmInput = screen.getByLabelText("Confirm password", { selector: "input" });
        const submitBtn = screen.getByRole("button", { name: "Submit" });

        user.type(passwordInput, "asd1223");
        user.type(confirmInput, "asd123");

        user.click(submitBtn);

        expect(await screen.findByText(/passwords should matches/i)).toBeInTheDocument();
    });

    test("user authentication process", async () => {
        // Mock onAuthStateChanged to simulate a user signing in
        render(
            <TestWrapper>
                <SignUp />
            </TestWrapper>
        );
        const googleBtn = screen.getByRole('button', { name: /sign up with google/i });
        user.click(googleBtn);
        expect(handleSignInGoogle).toHaveBeenCalled();
        // Check that the function is passed
    });
});

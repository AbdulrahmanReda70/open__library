import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1>Oops! Something went wrong.</h1>
            <p>The page you are looking for does not exist or an error occurred.</p>
            <Link to=".." className="home-link">Go Back</Link>
        </div>
    );
};

export default ErrorPage;

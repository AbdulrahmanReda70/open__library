import React from 'react';
import Container from '../../Components/Container';
import img from "../../images/_a247031f-af2c-4075-9473-18a3b8fb4d6b.jfif";
import img2 from "../../images/fiction.webp";
import gImg from "../../images/Google search interface with prominent buttons for notes, delete book, and review.png";
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
function BookStore() {
    return (
        <Container>
            <h1 className='storeHeader'>Stores</h1>
            <div className="bookStore">
                <Link to={"/bookStores/googleBooks"} >
                    <div className="store" style={{ "margin": "10px auto" }}>
                        <div className="img">
                            <img src={gImg} alt="Google Books" />
                        </div>
                        <div className="text">
                            <h2>Google Books</h2>
                            <p>Explore a vast collection of books across genres, all at your fingertips with Google Books.</p>
                        </div>
                    </div>
                </Link>

                <div className="store comingSoon">
                    <div className="img">
                        <img src={img2} alt="Fiction" />
                    </div>
                    <div className="text">
                        <h2>Fiction World</h2>
                        <p>Journey into fictional realms with upcoming novels and stories that captivate the imagination.</p>
                    </div>
                </div>

                <div className="store comingSoon" style={{ "transform": 'unset' }}>
                    <div className="img">
                        <img src={img} alt="Panda Books" />
                    </div>
                    <div className="text">
                        <h2>Panda Books</h2>
                        <p>Dive into a unique selection of children’s books, stories, and learning adventures.</p>
                    </div>
                </div>
            </div>


            <Outlet />
        </Container>
    );
}

export default BookStore;
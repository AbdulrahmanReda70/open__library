import React, { useEffect, useState } from 'react';
import img from '../images/connect.png';
import { useAddBookMutation, useGetAllBooksQuery, useGetBookQuery } from '../api/authApiSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Outlet, useParams } from 'react-router';
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { API_KEY } from '../utility/utils';

const buttonStyle = {
    backgroundColor: '#cccccc',
    color: '#666666',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    opacity: 0.6,
};

function BookInfo() {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [userId, setUserId] = useState("");
    const { data: allBooks, refetch } = useGetAllBooksQuery(userId);
    const [addBook, { isLoading, }] = useAddBookMutation();
    const [addBtn, setAddBtn] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserId(currentUser.uid);
        });
    }, []);

    useEffect(() => {
        const searchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
                );
                setBook(response.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        };
        searchBooks();
    }, [id]);

    useEffect(() => {

        if (allBooks) {
            const res = allBooks.find(b => b.id === book.id);

            if (res) setAddBtn(true);
        }
    }, [book, allBooks]);

    function display() {
        if (loading) {
            return <h1>Loading...</h1>;
        }

        if (book.length === 0) {
            return <h1 style={{ color: 'red' }}>SOME THING WENT WRONG "go back"</h1>;
        } else {
            return popup();
        }
    }

    function popup() {
        return (
            <>
                <div className='info-side'>
                    <img src={book?.volumeInfo?.imageLinks?.thumbnail || book?.volumeInfo?.imageLinks?.thumbnail || img} alt="" />
                    <div className='buttons'>
                        {
                            addBtn ?
                                <button disabled style={buttonStyle}>Added ✔</button> :
                                <button
                                    onClick={() => {
                                        setAddBtn(true);
                                        addBook({ data: book, userId });
                                        refetch();
                                    }}> MY Books ➕</button>
                        }

                        <button onClick={() => window.open(book.accessInfo.webReaderLink, '_blank')}>Read</button>
                    </div>
                </div>

                <div className='info-side2'>
                    <Link to={".."} replace>
                        <div className='goBack'><IoMdArrowRoundBack /></div>
                    </Link>
                    <h4>{book?.volumeInfo?.title}</h4>
                    <b>By</b>{` ${book?.volumeInfo?.authors?.join("") || book?.volumeInfo?.publisher || "Un known"}`}
                    <hr style={{ marginTop: "40px" }} />
                    <div className='title' dangerouslySetInnerHTML={{ __html: book?.volumeInfo?.description }} />
                </div>
            </>
        );
    }
    return (
        <div className='bookInfo-container'>
            <Outlet />
            <div className='info'>
                {display()}
            </div>
        </div>
    );
}

export default BookInfo;
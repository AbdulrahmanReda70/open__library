import React, { useEffect, useState } from 'react';
import BooksGrid from '../../Components/BooksGrid';
import { useGetSavedBookQuery, useRemoveSavedBookMutation, useSignOutMutation } from '../../api/authApiSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import img from "../../images/fiction.webp";
import { IoBookmarkSharp } from 'react-icons/io5';
import { Outlet, useParams } from 'react-router';
function Saved() {
    const [userId, setUserId] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserId(currentUser.uid);
        });
    }, []);
    const [signOut] = useSignOutMutation();

    const { data: savedBooks, isLoading: load, refetch } = useGetSavedBookQuery({ userId });
    const [books, setBooks] = useState();
    const [removeSavedBook] = useRemoveSavedBookMutation();
    const { id: bookId } = useParams();


    useEffect(() => {
        setBooks(savedBooks);
    }, [savedBooks]);

    function handleSavedBook(book, e, index) {
        e.stopPropagation();
        const userConfirmed = window.confirm("Are you sure you want to continue🎯?");
        if (userConfirmed) {
            let copy = [...books];
            copy.splice(index, 1);
            setBooks(copy);
            const bookId = book.id;
            removeSavedBook({ userId, bookId });
            refetch();
        }
    }

    function handleSavedIcon() {
        if (books) {
            return <IoBookmarkSharp className='bookmarkSharp' />;
        }
    }
    if (bookId) {
        return <Outlet />;
    } else {
        return (
            <>
                <div className='myBooks'>
                    <div className='header'>
                        <div className='c1'>
                        </div>
                    </div>
                    <h1>Saved</h1>
                    <BooksGrid
                        books={books}
                        loading={load}
                        cover={img}
                        handleSavedBook={handleSavedBook}
                        handleSavedIcon={handleSavedIcon}
                    />

                </div>
            </>
        );
    }

}

export default Saved;


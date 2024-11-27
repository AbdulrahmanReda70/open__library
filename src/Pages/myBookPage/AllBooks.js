import React, { useEffect, useRef, useState } from 'react';
import img from "../../images/fiction.webp";
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { useAddFavoriteBookMutation, useGetAllBooksQuery, useGetBookQuery, useGetFavoriteBookQuery, useRemoveFavoriteBookMutation, useSignOutMutation } from '../../api/authApiSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import 'draft-js/dist/Draft.css';

// Set the worker source

import BooksGrid from '../../Components/BooksGrid';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';



function AllBooks() {
    const [userId, setUserId] = useState("");
    const [allBooks, setAllBooks] = useState();
    const { data, isLoading: load, refetch: refAllBooks } = useGetAllBooksQuery(userId);
    const { data: allFavBooksId, refetch } = useGetFavoriteBookQuery(userId);
    const [addFavBook] = useAddFavoriteBookMutation();
    const [removeBook] = useRemoveFavoriteBookMutation();
    let flag = useRef(true);
    const { id: bookId } = useParams();
    const { data: book, refetch: refBook } = useGetBookQuery({ userId, bookId });

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserId(currentUser.uid);
        });
    }, []);

    useEffect(() => {
        setAllBooks(data);
    }, [data]);

    useEffect(() => {
        if (allFavBooksId && allBooks) {
            let copy = [...allBooks];
            for (let i = 0; i < allBooks.length; i++) {
                for (let j = 0; j < allFavBooksId.length; j++) {
                    if (allBooks[i].id === allFavBooksId[j].id && allBooks[i]) {
                        copy[i] = { ...copy[i], fav: true };
                    }
                }
            }
            if (flag.current) {
                setAllBooks(copy);
                flag.current = false;
            }
        }
        console.log(allBooks);

    }, [allBooks, allFavBooksId]);



    function handleSavedBook(book, e, index) {
        e.stopPropagation();
        if (!book.fav) {
            let copy = [...allBooks];
            copy[index] = { ...book, fav: true };
            setAllBooks(copy);
            addFavBook({ userId, book });
            refetch();
        }
        if (book.fav) {
            let copy = [...allBooks];
            copy[index] = { ...book, fav: false };
            setAllBooks(copy);
            const bookId = book.id;
            removeBook({ userId, bookId });
            refetch();
        }
    }

    function handleSavedIcon(ele, index) {

        if (allBooks[index].fav) {
            return <GoHeartFill style={{ color: "#be6464" }} />;
        } else {
            return <GoHeart style={{ color: "#be6464" }} />;
        }
    }

    function overlay() {
        if (bookId) return (
            <div className='progress-overlay'></div>
        );
    }

    if (bookId) {
        return (
            <Outlet context={{
                book: book,
                bookId: bookId,
                userId: userId,
                refBook: () => refBook,
                refAllBooks: () => refAllBooks,
                setAllBooks: () => setAllBooks,
                allBooks: allBooks,
                path: "/myBooks/allBooks"
            }}
            />

        );
    } else {
        return (
            <div className='myBooks'>

                {overlay()}
                <div className='header'>
                    <div className='c1'>
                    </div>
                </div>
                <div className="s-header">
                    <h1>All Books</h1>

                </div>

                <BooksGrid
                    data={data}
                    books={allBooks}
                    loading={load}
                    cover={img}
                    icon={GoHeart()}
                    handleSavedBook={handleSavedBook}
                    handleSavedIcon={handleSavedIcon}
                />


            </div>
        );
    }

}

export default AllBooks;
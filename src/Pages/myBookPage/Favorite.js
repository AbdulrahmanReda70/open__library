import React, { useEffect, useRef, useState } from 'react';
import { GoHeartFill } from "react-icons/go";
import { useAddFavoriteBookMutation, useGetBookQuery, useGetFavoriteBookQuery, useRemoveFavoriteBookMutation, useSignOutMutation } from '../../api/authApiSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import BooksGrid from '../../Components/BooksGrid';
import img from "../../images/fiction.webp";
import Progress from '../../Components/Progress';
import { Outlet, useParams, useSearchParams } from 'react-router-dom';

function Favorite() {
    const [searchParam] = useSearchParams();

    const { id: bookId } = useParams();
    const [userId, setUserId] = useState("");
    const [allBooks, setAllBooks] = useState();
    const { data: book, refetch: refBook } = useGetBookQuery({ userId, bookId });
    const { data, isLoading: load, refetch: refAllBooks } = useGetFavoriteBookQuery(userId);
    const nSParam = searchParam.get("n");
    const { data: favBooks, isLoading, refetch } = useGetFavoriteBookQuery(userId);
    const [signOut] = useSignOutMutation();

    const [removeFavBook] = useRemoveFavoriteBookMutation();
    const [allFavBooks, setAllFavBooks] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserId(currentUser.uid);
        });
    }, []);
    async function handleSavedBook(book, e, index) {
        e.stopPropagation();
        const userConfirmed = window.confirm("Are you sure you want to continue🎯?");
        if (allFavBooks.length === 1) {
            let copy = [...allFavBooks];
            copy.splice(index, 1);
            setAllFavBooks(copy);
            const bookId = book.id;
            removeFavBook({ userId, bookId });
            refetch();
        }
        if (userConfirmed) {
            let copy = [...allFavBooks];
            copy.splice(index, 1);
            setAllFavBooks(copy);
            const bookId = book.id;
            removeFavBook({ userId, bookId });
            refetch();

        }
    }



    function handleSavedIcon() {
        if (allFavBooks) {
            return <GoHeartFill style={{ color: "#be6464" }} className='bookmarkSharp' />;
        }
    }

    useEffect(() => {
        setAllFavBooks(favBooks);
    }, [favBooks]);


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
            <>
                {overlay()}
                <div className='myBooks'>
                    <div className='header'>
                        <div className='c1'>
                        </div>
                    </div>
                    <h1>Favorite</h1>
                    <BooksGrid
                        books={allFavBooks}
                        cover={img}
                        handleSavedBook={handleSavedBook}
                        handleSavedIcon={handleSavedIcon}
                        loading={isLoading}
                    />
                </div>

            </>
        );
    }
}

export default Favorite;
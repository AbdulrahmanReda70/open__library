import React, { useEffect, useState } from 'react';
import { useAddSavedBookMutation, useGetSavedBookQuery, useRemoveSavedBookMutation, useSignOutMutation } from '../../api/authApiSlice';
import Container from '../../Components/Container';
import { IoBookmarkSharp, IoSearch } from "react-icons/io5";
import axios from 'axios';
import fictionImg from "../../images/fiction.webp";
import { IoBookmarkOutline } from "react-icons/io5";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { Outlet } from 'react-router';
import BooksGrid from '../../Components/BooksGrid';
import { useOutletContext } from 'react-router';
import { API_KEY } from '../../utility/utils';
const GoogleStore = () => {
    const { setSearch, search } = useOutletContext();
    const [userId, setUserId] = useState("");
    const { data: savedBooks, refetch } = useGetSavedBookQuery({ userId });
    const [signOut] = useSignOutMutation();
    const [removeSavedBook, { isLoading }] = useRemoveSavedBookMutation();
    const [inpStyle, setInpStyle] = useState({});
    const [loading, setLoading] = useState(false);
    const [addSavedBook] = useAddSavedBookMutation();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUserId(currentUser.uid);
        });
    }, []);

    useEffect(() => {
        search && setQuery(search);
        const searchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${API_KEY}`
                );
                setBooks(response.data.items);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        };
        if (query.length > 0) searchBooks();
    }, [query, setSearch]);

    useEffect(() => {
        if (books && savedBooks) {
            let flag = false;
            let copy = [...books];
            for (let i = 0; i < books.length; i++) {
                for (let j = 0; j < savedBooks.length; j++) {
                    if (books[i].id === savedBooks[j].id && !books[i].saved && !isLoading) {
                        console.log("fire");
                        copy[i] = { ...copy[i], saved: true };
                        flag = true;
                    }
                }
            }
            if (flag) {
                setBooks(copy);
                flag = false;
            }
        }
    }, [query, books, savedBooks]);
    //


    function handleOnFocus() {
        setInpStyle({
            width: "260px"
        });
    }

    function handleSavedBook(book, e, index) {
        e.stopPropagation();
        if (!book.saved) {
            let copy = [...books];
            copy[index] = { ...copy[index], saved: true };
            setBooks(copy);
            addSavedBook({ data: book, userId });
            refetch();
        }
        if (book.saved) {
            let copy = [...books];
            copy[index] = { ...copy[index], saved: false };
            setBooks(copy);
            const bookId = book.id;
            removeSavedBook({ userId, bookId });
            refetch();
        }
    }

    function handleSavedIcon(_, index) {
        if (savedBooks) {
            return books[index].saved ? <IoBookmarkSharp className='bookmarkSharp' /> : <IoBookmarkOutline className='bookmarkOutline' />;
        } else {
            return <IoBookmarkOutline className='bookmarkOutline' />;
        }
    }
    return (
        <div className='store-layout'>
            <Container>
                <div className='header'>
                    <div className='c1'>
                    </div>
                </div>
                <div className="s-header">
                    <h1>Google Books</h1>
                </div>
                <div className='googleSearch' style={inpStyle} onFocus={handleOnFocus}>
                    <IoSearch onClick={() => setQuery(search)} style={{ cursor: "pointer" }} />
                    <input onKeyDown={(e) => e.key === "Enter" && setQuery(search)} placeholder='Search' value={search} onChange={(e) => { setSearch(e.target.value); }} />
                </div>
                {
                    <BooksGrid
                        books={books}
                        loading={loading}
                        cover={fictionImg}
                        handleSavedBook={handleSavedBook}
                        handleSavedIcon={handleSavedIcon}
                    />
                }
            </Container>
            <Outlet />
        </div>
    );
};

export default GoogleStore;


import React, { useEffect, useState } from 'react';
import { FaNotesMedical } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import { TbSquareRoundedNumber1, TbSquareRoundedNumber2 } from 'react-icons/tb';
import { Link, Outlet, useOutlet, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { Slider } from '@mui/material';
import RadioGroupRating from './RadioGroupRating';
import img from "../images/fiction.webp";
import { useEditProgressMutation, useGetAllBooksQuery, useGetBookQuery, useGetFavoriteBookQuery, useGetProgressQuery, useRemoveFavoriteBookMutation } from '../api/authApiSlice';
import { FaTrashAlt } from "react-icons/fa";
import { IoBook } from "react-icons/io5";
import { useRemoveFromAllBooksMutation } from '../api/authApiSlice';
import { useNavigate } from 'react-router-dom';
function Progress() {
    const { book, userId, setAllBooks, allBooks, path, bookId } = useOutletContext();
    console.log("HELLO", book);
    const { refetch: refAllBooks } = useGetAllBooksQuery(userId);
    const { refetch: refBook } = useGetBookQuery({ userId, bookId });

    const [editProgress] = useEditProgressMutation();
    const { data: prog, refetch } = useGetProgressQuery({ userId, book });
    const { refetch: refetchFav } = useGetFavoriteBookQuery(userId);
    const [sliderValue, setSliderValue] = useState(prog || 0);
    const [removeFromAllBooks] = useRemoveFromAllBooksMutation();
    const nav = useNavigate();
    const { id } = useParams();
    const [searchParam] = useSearchParams();

    useEffect(() => {
        if (prog !== undefined) {
            setSliderValue(prog);
            if (isNaN(prog) || prog === "NaN") {
                setSliderValue(0);
            }
        }
    }, [prog]);
    function changeValue(event, value) {
        console.log("+++", value);

        setSliderValue(value);
        refBook();
    }


    useEffect(() => {
        const x = setTimeout(() => {
            editProgress({ userId, book, sliderValue });
            refetch();
        }, 300);
        return () => clearTimeout(x);
    }, [book, editProgress, sliderValue, userId, refBook, refetch]);

    const [removeBook] = useRemoveFavoriteBookMutation();

    function remBook() {

        if (window.confirm("Do you want to proceed?")) {

            const bookId = book.id;
            const f = allBooks.find((b) => b.id === bookId);
            if (f) {
                let copy = [...allBooks];
                copy.splice(f, 1);
                setAllBooks(copy);
                if (allBooks.length === 1) {
                    console.log("====", allBooks.length);
                    nav("/bookStores", { replace: true });
                } else {
                    nav("/myBooks/allBooks", { replace: true });

                }
            }

            removeFromAllBooks({ userId, bookId });
            removeBook({ userId, bookId });
            refetchFav();
            refAllBooks();
        }
    }
    console.log("432", searchParam.get("n"));

    return (
        <>
            {searchParam.get("n") ? < Outlet context={{ userId, book }} /> : (
                <div className='book-progress'>
                    <>
                        <Link to={path} replace>
                            <div className='goBack'><IoCloseOutline /></div>
                        </Link>
                        <div className='book-progress-layout'>
                            <div className='left'>
                                <div className='book-details'>
                                    <img src={book?.volumeInfo?.imageLinks?.smallThumbnail || book?.volumeInfo?.imageLinks?.smallThumbnail || img} alt="" />
                                    <p>{book?.volumeInfo?.title.length > 20
                                        ? `${book?.volumeInfo?.title.slice(0, 20)}...`
                                        : book?.volumeInfo?.title}</p>
                                </div>
                                <div className='progress-bar slider'>
                                    <div className='prog'>
                                        <h3 >My Progress:</h3>
                                        <input
                                            placeholder='0'
                                            value={sliderValue}
                                            type="number"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Restrict input to two digits
                                                if (value.length <= 4) {
                                                    setSliderValue(value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <Slider
                                        style={{ width: 300 }}
                                        value={sliderValue}
                                        onChange={changeValue}
                                        valueLabelDisplay="on"
                                        defaultValue={"0"}
                                        max={book?.volumeInfo?.pageCount || 1000}
                                    />
                                </div>
                            </div>
                            <div className='right'>
                                <div className='notes'>
                                    <div className='note'>
                                        <Link to={`note?n=1`} style={{
                                            "width": "100%", "height": "100%", "display": "flex",
                                            "alignItems": "center",
                                            "justifyContent": "center",
                                            "color": "black"
                                        }} replace>
                                            <p>Note <TbSquareRoundedNumber1 /><br /><FaNotesMedical fontSize={"28px"} color='#3F51B5' /></p>
                                        </Link>
                                    </div>
                                    <div className='note'>
                                        <Link style={{
                                            "width": "100%", "height": "100%", "display": "flex",
                                            "alignItems": "center",
                                            "justifyContent": "center",
                                            "color": "black"
                                        }} to={`note?n=2`} replace>
                                            <p>Note <TbSquareRoundedNumber2 /><br /><FaNotesMedical fontSize={"28px"} color='darkgreen' /></p>
                                        </Link>
                                    </div>
                                </div>
                                <div className='review'>
                                </div>
                                <RadioGroupRating book={book} userId={userId} />
                                <div className='progress-btn'>
                                    <button onClick={remBook} style={{ backgroundColor: "#a52a2a", display: "flex", alignItems: 'center', justifyContent: "space-evenly" }}>
                                        <div>Remove</div>
                                        <div style={{ fontSize: "20px", display: 'flex', alignItems: "end" }}><FaTrashAlt /></div>
                                    </button>
                                    <button style={{ display: "flex", alignItems: 'center', justifyContent: "space-evenly" }}
                                        onClick={() => window.open(book.accessInfo.webReaderLink, '_blank')}
                                    >
                                        <div>Read</div>
                                        <div style={{ display: 'flex', alignItems: "end", fontSize: "25px" }}><IoBook /></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            )}
        </>

    );
}

export default Progress;
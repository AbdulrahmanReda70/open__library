import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';
const styledContainer = {
    fontSize: '70px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '160px',
    letterSpacing: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const googleStyle = {
    color: '#4285F4', // Google Blue
    textShadow: '2px 2px 8px rgba(66, 133, 244, 0.5)',
};

const booksStyle = {
    color: '#34A853', // Google Green
    textShadow: '2px 2px 8px rgba(52, 168, 83, 0.5)',
};

const highlightStyle = {
    color: '#FBBC05', // Google Yellow
    textShadow: '2px 2px 8px rgba(251, 188, 5, 0.5)',
    animation: 'glow 2s infinite',
};

const glowEffect = `
@keyframes glow {
  0% { text-shadow: 0 0 8px rgba(251, 188, 5, 0.8); }
  50% { text-shadow: 0 0 20px rgba(251, 188, 5, 1); }
  100% { text-shadow: 0 0 8px rgba(251, 188, 5, 0.8); }
}`;



function BooksGrid({ books, loading, cover, handleSavedBook, handleSavedIcon }) {
    if (books && !loading) {
        console.log(books);
        const bookMap = books.map((ele, index) => {
            if (ele === false) return null; // "if(ele) => not work"

            let title = ele.volumeInfo?.title ? ele.volumeInfo?.title : "Un Known";
            title = title.slice(0, 50) || "Un known";
            return (
                <div className='book' key={index}>
                    <Link to={ele.id} >
                        <img src={ele?.volumeInfo?.imageLinks?.thumbnail || cover} alt="" />
                        <p>{title}</p>
                    </Link>
                    <div className='addIcon' onClick={(e) => handleSavedBook(ele, e, index)}>
                        {handleSavedIcon(ele, index)}
                    </div>
                </div>
            );
        });
        return (
            <div className='book-grid-store'>
                {bookMap}
            </div>
        );
    }
    if (loading) {
        return <div style={{ marginTop: "-80px" }}><LoadingSpinner /></div>;
    } else {
        return (
            <div className='startNow'>
                <style>{glowEffect}</style>
                <h1 style={styledContainer}>
                    <span style={googleStyle}>Start</span>
                    {' '}
                    <span style={highlightStyle}>N</span>
                    <span style={booksStyle}>ow</span>
                </h1>
            </div>
        );
    }

}

export default BooksGrid;

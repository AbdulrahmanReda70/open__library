import React, { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom';
// Css

import "./app.css";
import "./Pages/loginPages/loginPages.css";
import "./Pages/userProfilePage/userProfile.css";
import "./Pages/myBookPage/myBooks.css";
import "./Pages/bookStorePage/bookStore.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// 
import ProtectedRoutes from './Components/ProtectedRoutes';
import Layout from './Components/Layout';
import SignInPage from './Pages/loginPages/SignInPage';
import SignUp from './Pages/loginPages/SignUp';
import LandingPage from './Pages/landingPage/LandingPage';
import UserProfile from './Pages/userProfilePage/UserProfile';
import MyBooksPage from './Pages/myBookPage/MyBooks';
import BookStore from './Pages/bookStorePage/BookStore';
import PersonalInfo from './Pages/userProfilePage/PersonalInfo';
import Favorite from './Pages/myBookPage/Favorite';
import AllBooks from './Pages/myBookPage/AllBooks';
import Saved from './Pages/myBookPage/Saved';
import GoogleStore from './Pages/bookStorePage/GoogleStore';
import BookInfo from './Components/BookInfo';
import BookNotes from './Pages/myBookPage/BookNotes';
import SavedBookInfo from './Components/SavedBookInfo';
import Progress from './Components/Progress';
import ErrorPage from './Components/ErrorPage';


// src/mocks/browser.js

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<LandingPage />} errorElement={<ErrorPage />} />
        <Route path='/signIn' element={<SignInPage />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />} >
            <Route element={<UserProfile />} path='/userProfile' >
              <Route path='personalInfo' element={<PersonalInfo />} />
            </Route>
            <Route element={<MyBooksPage />} path='/myBooks' >
              <Route path='favorite' element={<Favorite />} >
                <Route path=':id' element={<Progress />} >
                  <Route path='note' element={<BookNotes />} />
                </Route>
              </Route>

              <Route path='allBooks' element={<AllBooks />} >
                <Route path=':id' element={<Progress />}>
                  <Route path='note' element={<BookNotes />} />
                </Route>
              </Route>

              <Route path='saved' element={<Saved />} >
                <Route path=':id' element={<SavedBookInfo />} />
              </Route>

            </Route>
            <Route element={<BookStore />} path='/bookStores' />
            <Route path='/bookStores/googleBooks' element={<GoogleStore />} >
              <Route path=':id' element={<BookInfo />} />
            </Route>
          </Route >
        </Route>
        <Route >
        </Route>

      </>
    ));
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, db } from '../firebase/firebase';
import { get, push, ref, remove, set } from "firebase/database";



export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({ //()!
        signInGoogle: builder.mutation({
            async queryFn() {
                try {
                    const userCredential = await signInWithPopup(auth, googleProvider);
                    const user = userCredential.user;
                    return { data: user };
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        signInFacebook: builder.mutation({
            async queryFn() {
                try {
                    const userCredential = await signInWithPopup(auth, facebookProvider);
                    const user = userCredential.user;
                    return { data: user };
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        signOut: builder.mutation({
            async queryFn() {
                try {
                    await signOut(auth);
                    return { data: 'Successfully signed out' };
                } catch (error) {
                    return { error: error.message };
                }
            },
        }),

        addBook: builder.mutation({
            async queryFn({ data, userId }) {
                data = { ...data, progress: 0 };
                try {
                    const newDocRef = ref(db, `users/user_${userId}/books/allBooks/${data.id}`);
                    await set(newDocRef, data);
                    return { data: "Book added successfully" };
                } catch (error) {
                    return { error: error.message };  // Return error message
                }
            }
        }),

        getAllBooks: builder.query({
            async queryFn(userId) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks`);
                    const snapShot = (await get(DocRef)).val();
                    const result = Object.values(snapShot);
                    return { data: result };
                } catch (error) {
                    return { error: error.message };  // Return error message
                }
            }
        }),

        getBook: builder.query({
            async queryFn({ userId, bookId }) {
                console.log(bookId);
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${bookId}`);
                    const snapShot = await get(DocRef);
                    return { data: snapShot.val() };
                } catch (error) {
                    return { error: error.message };  // Return error message
                }
            }
        }),

        addSavedBook: builder.mutation({
            async queryFn({ data, userId }) {
                try {
                    const newDocRef = ref(db, `users/user_${userId}/books/SavedBooks/${data.id}`);
                    await set(newDocRef, data);  // Wait for the data to be saved

                } catch (error) {
                    return { error: error.message };  // Return error message
                }
            }
        }),

        getSavedBook: builder.query({
            async queryFn({ userId }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/SavedBooks`);
                    const snapShot = (await get(DocRef)).val();
                    // Return an empty array if the snapshot is null
                    return { data: snapShot ? Object.values(snapShot) : [] };
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),
        removeSavedBook: builder.mutation({
            async queryFn({ userId, bookId }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/SavedBooks/${bookId}`);
                    await remove(DocRef);  // You don't need to return the message from `remove`

                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }, onQueryStarted: async ({ userId, bookId }, { dispatch, queryFulfilled }) => {
                // Optimistically remove the book from the cache
                const patchResult = dispatch(
                    authApi.util.updateQueryData('getSavedBook', userId, (draft = []) => {
                        return draft.filter((book) => book.id !== bookId);
                    })
                );

                try {
                    await queryFulfilled; // Wait for the mutation to succeed
                } catch {
                    patchResult.undo(); // Roll back on failure
                }
            },
        }),

        addFavoriteBook: builder.mutation({
            async queryFn({ userId, book }) {
                try {

                    const DocRef = ref(db, `users/user_${userId}/books/favoriteBooks/${book.id}`);
                    await set(DocRef, book);  // Wait for the data to be saved


                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }),

        getFavoriteBook: builder.query({
            async queryFn(userId) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/favoriteBooks`);
                    const snapShot = (await get(DocRef)).val();
                    const result = Object.values(snapShot);
                    return { data: result };
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        removeFavoriteBook: builder.mutation({
            async queryFn({ userId, bookId }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/favoriteBooks/${bookId}`);
                    await remove(DocRef);

                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }, onQueryStarted: async ({ userId, bookId }, { dispatch, queryFulfilled }) => {
                // Optimistically remove the book from the cache
                const patchResult = dispatch(
                    authApi.util.updateQueryData('getFavoriteBook', userId, (draft = []) => {
                        return draft.filter((book) => book.id !== bookId);
                    })
                );
                try {
                    await queryFulfilled; // Wait for the mutation to succeed
                } catch {
                    patchResult.undo(); // Roll back on failure
                }
            },
        }),

        editProgress: builder.mutation({
            async queryFn({ userId, book, sliderValue }) {
                const nBook = { ...book, "progress": sliderValue };
                // console.log(nBook, "--", sliderValue);
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}`);
                    await set(DocRef, nBook);  // Wait for the data to be saved


                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }),

        getProgress: builder.query({
            async queryFn({ userId, book }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}`);
                    const snapShot = (await get(DocRef)).val();
                    const result = Object.values(snapShot)[4]; //progress

                    return { data: result };
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        editReview: builder.mutation({
            async queryFn({ userId, book, newValue }) {

                const nBook = { ...book, "reviewValue": newValue };
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}`);
                    await set(DocRef, nBook);  // Wait for the data to be saved


                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }),

        getReview: builder.query({
            async queryFn({ userId, book }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}`);
                    const snapShot = (await get(DocRef)).val();
                    const result = Object.values(snapShot)[5]; //reviewValue
                    console.log("dasdasda", result);

                    return { data: result };
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        removeFromAllBooks: builder.mutation({
            async queryFn({ userId, bookId }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${bookId}`);
                    await remove(DocRef);
                    return { data: `Book with ID ${bookId} removed successfully` };
                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            },
            onQueryStarted: async ({ userId, bookId }, { dispatch, queryFulfilled }) => {
                // Optimistically remove the book from the cache
                const patchResult = dispatch(
                    authApi.util.updateQueryData('getAllBooks', userId, (draft = []) => {
                        return draft.filter((book) => book.id !== bookId);
                    })
                );
                try {
                    await queryFulfilled; // Wait for the mutation to succeed
                } catch {
                    patchResult.undo(); // Roll back on failure
                }
            },
        }),

        saveNote_1: builder.mutation({
            async queryFn({ userId, book, valNote_1_cur }) {
                console.log("RUN_______________");

                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}/valNote_1`);
                    await set(DocRef, valNote_1_cur);  // Wait for the data to be saved


                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }),
        saveNote_2: builder.mutation({
            async queryFn({ userId, book, valNote_2_cur }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}/accessInfo/valNote_2`);
                    await set(DocRef, valNote_2_cur);  // Wait for the data to be saved


                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }),

        getNote1: builder.query({
            async queryFn({ userId, book }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}/valNote_1`);
                    const snapShot = (await get(DocRef)).val();

                    // Check if snapshot exists
                    if (snapShot) {
                        // Flatten the array if necessary
                        const result = Object.values(snapShot)[0]; // Assuming it's always wrapped in an array

                        // Ensure all required fields exist in the block
                        const formattedResult = {
                            blocks: result.map(item => ({
                                ...item,
                                inlineStyleRanges: item.inlineStyleRanges || [],  // Ensure inlineStyleRanges is present
                                entityRanges: item.entityRanges || [],  // Ensure entityRanges is present
                                data: item.data || {},  // Ensure data is present
                            })),
                            entityMap: {},  // Default empty entityMap
                        };

                        return { data: formattedResult };
                    } else {
                        return { data: {} };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        getNote2: builder.query({
            async queryFn({ userId, book }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}/accessInfo/valNote_2`);
                    const snapShot = (await get(DocRef)).val();

                    // Check if snapshot exists
                    if (snapShot) {
                        // Flatten the array if necessary
                        const result = Object.values(snapShot)[0]; // Assuming it's always wrapped in an array

                        // Ensure all required fields exist in the block
                        const formattedResult = {
                            blocks: result.map(item => ({
                                ...item,
                                inlineStyleRanges: item.inlineStyleRanges || [],  // Ensure inlineStyleRanges is present
                                entityRanges: item.entityRanges || [],  // Ensure entityRanges is present
                                data: item.data || {},  // Ensure data is present
                            })),
                            entityMap: {},  // Default empty entityMap
                        };

                        return { data: formattedResult };
                    } else {
                        return { data: {} };
                    }
                } catch (error) {
                    return { error: error.message };
                }
            }
        }),

        addLocalBook: builder.mutation({
            async queryFn({ userId, book }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}/books/allBooks/${book.id}`);
                    await set(DocRef, book);  // Wait for the data to be saved

                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }), removeUser: builder.mutation({
            async queryFn({ userId }) {
                try {
                    const DocRef = ref(db, `users/user_${userId}`);
                    await remove(DocRef);  // You don't need to return the message from `remove`
                } catch (error) {
                    return { error: error.message }; // Return error properly
                }
            }
        }),

    }),

});

export const {
    useSignInGoogleMutation,
    useSignInFacebookMutation,
    useSignOutMutation,
    useAddBookMutation,
    useGetAllBooksQuery,
    useAddSavedBookMutation,
    useGetSavedBookQuery,
    useRemoveSavedBookMutation,
    useGetBookQuery,
    useAddFavoriteBookMutation,
    useGetFavoriteBookQuery,
    useRemoveFavoriteBookMutation,
    useEditProgressMutation,
    useGetProgressQuery,
    useRemoveFromAllBooksMutation,
    useEditReviewMutation,
    useGetReviewQuery,
    useSaveNote_1Mutation,
    useSaveNote_2Mutation,
    useGetNote1Query,
    useGetNote2Query,
    useAddLocalBookMutation,
    useRemoveUserMutation

} = authApi;


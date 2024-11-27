import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGetNote1Query, useGetNote2Query, useSaveNote_1Mutation, useSaveNote_2Mutation } from '../../api/authApiSlice';
import RichTextEditor2 from '../../Components/RichTextEditor2';
import RichTextEditor1 from '../../Components/RichTextEditor1';
import SaveNotification from '../../Components/SaveNotification';


function BookNotes() {
    const location = useLocation();
    const pathName = location.pathname;

    const { id } = useParams();
    const nav = useNavigate();
    const [searchParam] = useSearchParams();
    const [saveNote_1] = useSaveNote_1Mutation();
    const [saveNote_2] = useSaveNote_2Mutation();
    const { userId, book } = useOutletContext();
    const { data: note_1_db, isLoading: isLoading_1, refetch: refetch_1 } = useGetNote1Query({ userId, book });
    const { data: note_2_db, isLoading: isLoading_2, refetch: refetch_2 } = useGetNote2Query({ userId, book });
    const valNote_1 = useRef(null);
    const valNote_2 = useRef(null);

    const [flag_1, setFlag_1] = useState(false);
    const [flag_2, setFlag_2] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        valNote_1.current = note_1_db;
        valNote_2.current = note_2_db;;

    }, [note_1_db, note_2_db]);

    function sNote() {
        setShowToast(true);
        // Hide the toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        const valNote_1_cur = valNote_1.current;
        const valNote_2_cur = valNote_2.current;
        setFlag_1(false);
        setFlag_2(false);
        if (searchParam.get("n") === '1') {
            saveNote_1({ userId, book, valNote_1_cur });
            refetch_1();
        } else {
            saveNote_2({ userId, book, valNote_2_cur });
            refetch_2();
        }
    }
    function navConfirm_1() {

        if (searchParam.get("n") === "1") {
            if (flag_1) {
                let confirm_result = window.confirm("The content is not saved. Are you sure you want to proceed?");
                if (confirm_result) {
                    nav("?n=2");
                }
            } else {
                nav("?n=2", { replace: true });
            }
        }
    }
    function navConfirm_2() {
        if (searchParam.get("n") === "2") {
            if (flag_2) {
                let confirm_result = window.confirm("The content is not saved. Are you sure you want to proceed?");
                if (confirm_result) {
                    nav("?n=1");
                }
            } else {
                nav("?n=1", { replace: true });
            }
        }
    }
    function navConfirm_exit() {
        setFlag_1(false);
        setFlag_2(false);
        const valNote_1_cur = valNote_1.current;
        const valNote_2_cur = valNote_2.current;
        let f1 = false;
        let f2 = false;

        if (searchParam.get("n") === '1') {
            saveNote_1({ userId, book, valNote_1_cur });
            refetch_1();
            f1 = true;
        } else {
            saveNote_2({ userId, book, valNote_2_cur });
            refetch_2();
            f2 = true;
        }
        if (pathName.includes("allBooks")) {
            nav("/myBooks/allBooks/" + id, { replace: true });
        } else {
            nav("/myBooks/favorite/" + id, { replace: true });

        }
        if (f1) {
            setTimeout(() => {
                saveNote_1({ userId, book, valNote_1_cur });
            }, 800);
        } if (f2) {
            setTimeout(() => {
                saveNote_2({ userId, book, valNote_2_cur });
            }, 800);
        }
    }

    return (
        <div className='book-progress'>
            <SaveNotification showToast={showToast} />
            <div className='notes-tabs'>
                <NavLink onClick={navConfirm_2} className={({ isActive }) => (searchParam.get("n") === "1" ? 'active-note' : null)}>
                    <div className='note-tap'>Note <b>1</b></div>
                </NavLink>

                <NavLink onClick={navConfirm_1} className={({ isActive }) => (searchParam.get("n") === "2" ? 'active-note' : null)}>
                    <div className='note-tap'>Note <b>2</b></div>
                </NavLink>

            </div>
            <Link onClick={navConfirm_exit} >
                <div className='goBack'><IoMdArrowRoundBack /></div>
            </Link>
            {
                searchParam.get("n") === '1' ? (<div className='book-progress-layout-note'>
                    <RichTextEditor1
                        valNote_1={valNote_1}
                        setFlag_1={setFlag_1}
                        note_1_db={note_1_db}
                        isLoading_1={isLoading_1}
                        refetch_1={refetch_1}
                    />
                </div>) :
                    (<div className='book-progress-layout-note'>
                        <RichTextEditor2
                            valNote_2={valNote_2}
                            note_2_db={note_2_db}
                            setFlag_2={setFlag_2}
                            isLoading_2={isLoading_2}
                            refetch_2={refetch_2}
                        />
                    </div>)
            }

            <div style={{ display: "flex", justifyContent: 'center' }}>
                <button onClick={sNote}>Save</button>
            </div>

        </div>

    );
}

export default BookNotes;
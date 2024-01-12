import React, {ChangeEvent, useRef, useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import {InputFormProps, CustomerData} from "./InputFormTypes";

function InputForm({setData}: InputFormProps) {
    const formData = useRef({});
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { target: { name: string; value: boolean } }>
    ) => {
        // @ts-ignore
        formData.current[e.target.name] = e.target.value;
        if (isSent) setIsSent(false);
    }
    const handleSend = () => {
        if (validateInput(formData.current)) {
            setData(formData.current as CustomerData);
            setIsSent(true);
        }
    }
    const validateInput = (data: {
        name?: string;
        email?: string;
        phoneNumber?: string;
    }) => {
        let isCorrect = true;
        const isEmpty = (str: string | undefined) => str === undefined || str === "";

        const validateEmail = (email: string) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (isEmpty(data.email) || !validateEmail(data.email)) {
            setEmailError(true);
            isCorrect = false;
        }
        if (isEmpty(data.name)) {
            setNameError(true);
            isCorrect = false;
        }
        if (isEmpty(data.phoneNumber) || !/^[0-9]*$/.test(data.phoneNumber as string)) {
            setPhoneError(true);
            isCorrect = false;
        }

        return isCorrect;
    };

    return (
        <>
            <TextField
                required
                id="outlined-required"
                label="Nazwa użytkownika"
                defaultValue=""
                name="name"
                onChange={(e) => {
                    handleInput(e);
                    setNameError(false);
                }}
                error={nameError}
            />
            <TextField
                required
                id="outlined-required"
                label="Numer telefonu"
                defaultValue=""
                name="phoneNumber"
                onChange={(e) => {
                    handleInput(e);
                    setPhoneError(false);
                }}
                error={phoneError}
            />
            <TextField
                required
                id="outlined-required"
                label="Adres e-mail"
                defaultValue=""
                name="email"
                onChange={(e) => {
                    handleInput(e);
                    setEmailError(false);
                }}
                error={emailError}
                aria-errormessage={"Podaj prawidłowy email"}
            />

            {isSent ? <h2>Zamówienie wysłane!</h2> :
                <div style={{marginTop: 20}}><Button variant="contained" onClick={() => handleSend()}>Złóż
                    zamówienie</Button></div>}
        </>
    );
}

export default InputForm;

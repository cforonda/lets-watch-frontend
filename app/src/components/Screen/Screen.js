import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import YTPlayer from "../YTPlayer/YTPlayer";
const dotenv = require('dotenv').config();


export default function Screen( { routerProps }) {

    const [response, setResponse] = useState("");

    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "https://lets-watch-backend.herokuapp.com/";

    console.log(API_ENDPOINT);

    useEffect(() => {
        const socket = socketIOClient(API_ENDPOINT);
        socket.on("FromAPI", data => {
            setResponse(data);
        })
    }, []);

    return (
        <div>
            <p>
                It's <time dateTime={response}>{response}</time>
            </p>
            <YTPlayer id="Qll7IHN0I4Q"/>
        </div>
    )
}
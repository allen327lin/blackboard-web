import React, { useRef, useEffect, useState } from "react";
import './takeThePhoto.css';

function GetPhoto() {
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);

    const videoRef = useRef(null);
    const [ws, setWs] = useState(null);

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
                setWs(new WebSocket("ws://http://122.116.234.117/GetPhoto:3000"));
                ws.onopen = () => {
                    ws.send("Hello, server!");
                    video.srcObject.getTracks().forEach(track => ws.addTrack(track, stream));
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };
    const takePhoto = () => {

        let video = videoRef.current;
        let photo = photoRef.current;

        const width = video.videoWidth;
        const height = video.videoHeight;

        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext("2d");

        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        // ctx.clearRect(0, 0, photo.width, photo.height);
        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    };

    useEffect(() => {
        const startVideo = () => {
        };
        startVideo();
    }, []);
    

    return (
        <div className="App">
            <div className="camra">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>SNAP!</button>
            </div>
            <div className={"result" + (hasPhoto ? " hasPhoto" : "")}>
                <canvas ref={photoRef}></canvas>
                <button onClick={closePhoto}>CLOSE!</button>
            </div>
        </div>
    );
}

export default GetPhoto;
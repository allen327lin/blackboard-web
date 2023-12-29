import React, { useRef, useEffect, useState } from "react";

function App() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [stream, setStream] = useState(null); // 保留視訊流的狀態

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: { width: 1920, height: 1800 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
                setStream(stream); // 保留視訊流的參考
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const takePhoto = () => {
        const width = 1920;
        const height = 1800;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext("2d");

        // 清空Canvas
        ctx.clearRect(0, 0, width, height);

        // 繪製新照片
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    };

    useEffect(() => {
        startVideo();
    }, []); // 確保只在應用程式載入時啟動一次

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

export default App;

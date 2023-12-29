import React, { useRef, useEffect, useState } from "react";
import './takeThePhoto.css';
import {Dropdown} from "react-bootstrap";

function GetPhoto() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [stream, setStream] = useState(null);

    const [selectedCourse, setSelectedCourse] = useState("Course"); // 默认文本为"Course"
    // ... (其他状态和函数)

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
        // 在这里处理用户选择课程的逻辑
        console.log(`${course}`);
    };

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true})
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
                setStream(stream);
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
        startVideo();
    }, []);

    return (
        <div className="App">
            <Dropdown className="dropDown">
                <Dropdown.Toggle variant="course" id="dropdown-basic">
                    {selectedCourse}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleCourseSelection('Math')}>Math</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCourseSelection('DataStructure')}>DataStructure</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCourseSelection('Data')}>Data</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="camra">
                <video ref={videoRef}></video>
                <button className="Snap" onClick={takePhoto}>SNAP!</button>
            </div>
            <div className={"result" + (hasPhoto ? " hasPhoto" : "")}>
                <canvas ref={photoRef}></canvas>
                <button className="Close" onClick={closePhoto}>CLOSE!</button>
            </div>
        </div>
    );
}

export default GetPhoto;
import React, { useRef, useEffect, useState } from "react";
import './takeThePhoto.css';
import { Dropdown } from "react-bootstrap";
import axios from 'axios';

function GetPhoto() {
    const photoRef = useRef(null);
    const videoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("Course");
    const [ws, setWs] = useState(null);

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
        console.log(`${course}`);
    };

    const startVideo = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 776, ideal: 720, max: 1080 }
                }})
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        // 初始化WebSocket连接
        const socket = new WebSocket("ws://122.116.234.117:8091");
        setWs(socket);

        socket.onopen = () => {
            console.log("WebSocket连接已建立");
            // 在WebSocket连接建立后再执行其他操作
        };

        // 处理WebSocket错误
        socket.onerror = (error) => {
            console.error("WebSocket错误:", error);
        };

        // 处理WebSocket关闭
        socket.onclose = (event) => {
            console.log("WebSocket连接已关闭:", event);
        };

        // 在组件卸载时关闭WebSocket连接
        return () => {
            socket.close();
        };
    }, []); // 空依赖数组确保只在组件加载时触发一次

    const takePhoto = async () => {
        let video = videoRef.current;
        let photo = photoRef.current;

        video.pause();

        const width = video.videoWidth;
        const height = video.videoHeight;

        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext("2d");

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);

        const dataURL = photo.toDataURL('image/png');

        try {
            await axios.post('/api/photos', { dataURL: dataURL, Course: selectedCourse });
            console.log('照片保存成功！');
        } catch (error) {
            console.error('保存照片出错:', error);
        }
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        startVideo();

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

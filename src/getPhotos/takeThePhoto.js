import React, { useRef, useEffect, useState } from "react";
import './takeThePhoto.css';
import { Dropdown } from "react-bootstrap";

function GetPhoto() {
    const photoRef = useRef(null);
    const videoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState("Course");
    const [selectedSemester, setSelectedSemester] = useState("Semester");
    const [postData, setPostData] = useState({ course: selectedCourse, semester: selectedSemester, imageBase64: null});


    useEffect(() => {
        startVideo();
    }, []);

    const handleCourseSelection = (course) => {
        setSelectedCourse(course);
        console.log(`${course}`);
    };

    const handleSemesterSelection = (semester) => {
        setSelectedSemester(semester);
        console.log(`${semester}`);
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

    const handlePostRequest = (imageBase64) => {
        const postData = { course: selectedCourse, semester: selectedSemester, imageBase64: imageBase64 };

        console.log('Sending POST request with data:', JSON.stringify(postData)); // 打印JSON字符串，确保它是有效的
        fetch('/api/GetPhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            // 在這裡處理解析後的 JSON 數據
            console.log(data); // 使用 console.log() 輸出 JSON 數據
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
    };

    const takePhoto = async () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        var playPromise = video.play();
    
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                video.pause();
            })
            .catch(error => {
                console.error(error);
            });
        }
        
        const width = video.videoWidth;
        const height = video.videoHeight;
        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(video, 0, 0, width, height);
        setHasPhoto(true);
        
        const dataURL = photo.toDataURL('image/png');
        const imageBase64 = dataURL.split(',')[1]; // 提取base64編碼的部分
    
        handlePostRequest(imageBase64);
    }
    

    
    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        startVideo();

        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
    };

    


    return (
        <div className="App">

            <Dropdown className="Semester">
                <Dropdown.Toggle variant="semester" id="dropdown-basic">
                    {selectedSemester}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSemesterSelection('110-1')}>110-1</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSemesterSelection('110-2')}>110-2</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSemesterSelection('111-1')}>111-1</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            
                
            <Dropdown className="Course">
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


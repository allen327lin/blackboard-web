import './CoursePictures.css';
import React, { useEffect, useState } from 'react';

function CourseList() {
    const [image, setImage] = useState([]);

    function LastWord() {
        const tempCurrentPath = window.location.pathname;
        const temp = tempCurrentPath.split('/').filter(part => part !== ''); // 刪除空字串
        return temp[temp.length - 1];
    }

    const currentPath = LastWord();
    const semester = "110-1";

    const handlePostRequest = (currentPath, semester) => {
        const postData = { course: currentPath, semester: semester};

        console.log('Sending POST request with data:', JSON.stringify(postData)); // 打印JSON字符串，确保它是有效的
        fetch('/api/GetCoursePhoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(data => {
            // 在這裡處理解析後的 JSON 數據
            setImage(data);
            console.log(data); // 使用 console.log() 輸出 JSON 數據
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
    };


    useEffect(() => {
        handlePostRequest(currentPath, semester);
      }, []);
      
      const imageBase64 = Array.isArray(image.image) ? image.image : [];
      console.log(imageBase64);
      
      return (
        <div className="CoursePictures">
          <h1 className="CourseTitle">{currentPath}</h1>
          <div className="CourseList">
            {imageBase64.map((item, index) => (
              <img key={index} src={`data:image/png;base64,${item}`} alt=""/>
            ))}
          </div>
        </div>
      );
}      

export default CourseList;

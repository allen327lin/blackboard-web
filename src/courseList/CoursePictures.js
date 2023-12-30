import React from 'react';
import './CoursePictures.css';

function CourseList() {
    function LastWord() {
        const tempCurrentPath = window.location.pathname;
        const temp = tempCurrentPath.split('/').filter(part => part !== ''); // 刪除空字串
        return temp[temp.length - 1];
    }

    const currentPath = LastWord();

    const coursePictures = [
        { ImageUrl: "/Pictures/blackboard.jpg", Semester: "111-2", Subject: "Math" },
        { ImageUrl: "/Pictures/logo512.png", Semester: "111-2", Subject: "DataStructure" },
        { ImageUrl: "/Pictures/logo192.png", Semester: "111-2", Subject: "DataStructure" },
        { ImageUrl: "/Pictures/logo192.png", Semester: "111-2", Subject: "Math" },
        { ImageUrl: "/Pictures/logo192.png", Semester: "111-2", Subject: "th" },
        { ImageUrl: "/Pictures/blackboard.jpg", Semester: "111-2", Subject: "th" }
    ];

    function DistinguishSubject(subject, index, ImageUrl) {
        if (currentPath === subject) {
            console.log(currentPath, subject);
            return <img key={index} src={ImageUrl} alt="" />;
        }
        return null; // 如果不符合條件，返回null
    }

    return (
        <div className="CoursePictures">
            <h1 className="CourseTitle">{currentPath}</h1>
            <div className="CourseList">
                {coursePictures.map((item, index) => (
                    DistinguishSubject(item.Subject, index, item.ImageUrl)
                ))}
            </div>
        </div>
    );
}

export default CourseList;

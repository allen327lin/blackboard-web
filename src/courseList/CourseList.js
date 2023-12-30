import ListTemplate from "./ListTemplate";
import './CourseList.css';
import {CardGroup, Col, Row} from "react-bootstrap";

function CourseList(){
    const course = [
        {Semester:"112-1", Subject:"Math"},
        {Semester:"111-2", Subject:"DataStructure"},
        {Semester:"112-1", Subject:"ath"},
        {Semester:"112-1", Subject:"th"},
        {Semester:"111-2", Subject:"Structure"},
        {Semester:"111-2", Subject:"Data"},
    ]

    return(
        <div>
            <h1 className="CourseListTitle">Course List</h1>
              <div className="CourseList">
                  <div className="RowContainer">
                      <Row xs={2} md={1} className="Row">
                              <Col key={2}>
                                  <CardGroup>
                                      {course.map((item)=>(
                                          <ListTemplate
                                              key={item.name}
                                              Semester={item.Semester}
                                              Subject={item.Subject}
                                              className="ListTemplate"
                                          />
                                      ))}
                                  </CardGroup>
                              </Col>
                      </Row>
                  </div>
              </div>
            </div>
        );
}

export default CourseList;



// import React, { useEffect, useState } from 'react';

// function GetPhoto() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//       // 发起 API 请求，确保使用正确的端口号
//       fetch('/api/GetPhoto') // 使用 Express.js 后端服务器的端口号
//         .then(response => response.json())
//         .then(apiData => {
//           setData(apiData); // 更新 React 组件的状态
//         })
//         .catch(error => {
//           console.error('Error fetching data:', error);
//         });
//     }, []); 
  
//     return (
//       <div className="App">
//         <h1>React App with Express.js API</h1>
//         {data ? <p>{data.message}</p> : <p>Loading...</p>}
//       </div>
//     );
//   }

// export default GetPhoto;

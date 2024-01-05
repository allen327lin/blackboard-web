import React, { useEffect, useState } from 'react';
import ListTemplate from "./ListTemplate";
import './CourseList.css';
import { CardGroup, Col, Row } from "react-bootstrap";

function CourseList() {
  const [combinedValues, setCombinedValues] = useState([]);

  useEffect(() => {
    // 发起 API 请求，确保使用正确的端口号
    fetch('/api/queryDistinctValue') // 使用 Express.js 后端服务器的端口号
      .then(response => response.json())
      .then(data => {
        setCombinedValues(data.combinedValues);
        // console.log(data.combinedValues);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // 空依赖数组确保只在组件挂载时执行



  return (
    <div>
      <h1 className="CourseListTitle">Course List</h1>
      <div className="CourseList">
        <div className="RowContainer">
          <Row xs={2} md={1} className="Row">
            <Col key={2}>
              <CardGroup>
              {combinedValues.length > 0 ? (
                  combinedValues.map((item, index) => (
                    <div key={index}>
                      <ListTemplate
                        key={item.name}
                        semester={item.semester}
                        course={item.course}
                        className="ListTemplate"
                      />
                    </div>
                  ))
                ) : (
                  <p className='Loading'>Loading...</p>
                )}
              </CardGroup>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default CourseList;

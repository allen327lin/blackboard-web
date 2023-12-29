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

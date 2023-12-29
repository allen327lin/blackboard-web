import './ListTemplate.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ListTemplate(props) {
    const { Semester = 'undefined', Subject } = props;

    return (
        <Link to={`/CourseList/${Subject}`}>
            <div className="CardWrapper">
                <Card style={{ width: '15rem' }}>
                    <Card.Body>
                        <Card.Title>{Subject}</Card.Title>
                        <Card.Text>{Semester}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Link>
    );
}

export default ListTemplate;

import './ListTemplate.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ListTemplate(props) {
    const { semester, course } = props;

    return (
        <Link to={`/CourseList/${course}`}>
            <div className="CardWrapper">
                <Card style={{ width: '15rem' }}>
                    <Card.Body>
                        <Card.Title>{course}</Card.Title>
                        <Card.Text>{semester}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Link>
    );
}

export default ListTemplate;

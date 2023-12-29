import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./courseList/CourseList";
import GetPhoto from "./getPhotos/takeThePhoto";
import HomePage from "./Homepage/HomePage";

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/GetPhoto' element={<GetPhoto/>}/>
                    <Route path='/CourseList' element={<CourseList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

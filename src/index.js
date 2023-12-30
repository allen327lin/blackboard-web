import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import BasicExample from "./NavigationBar";
import reportWebVitals from './reportWebVitals';
import App from "./App";
// import couchbase from "./couchbase";

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BasicExample />
        <App/>
    </React.StrictMode>
);

reportWebVitals();

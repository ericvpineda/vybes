import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Profile from './routes/Profile';
import Feed from './routes/Feed';

const router = createBrowserRouter([
    {
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Feed/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
        ]
    }
])

const rootElem = document.getElementById('root')
const root = ReactDOM.createRoot(rootElem);
root.render(<RouterProvider router={router}/>);


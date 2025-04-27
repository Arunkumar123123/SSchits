import React, {createContext} from 'react';
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({element, allowed}) => {

    const token = localStorage.getItem('token');
    if (token) {
        if (allowed) {
            return element;
        } else {
            return <Navigate to="/unauthorized"/>;
        }
    } else {
        return <Navigate to="/crm/"/>;
    }
};

export const DataContext = createContext({});




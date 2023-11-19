import React from 'react';

class App extends React.Component {
    get axios() {
        const axiosBase = require('axios');
            return axiosBase.create({
                baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                responseType: 'json'
            });
        }
}

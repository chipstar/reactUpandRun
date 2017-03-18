'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';

// reactの処理
ReactDOM.render(
    <h1>
        <Logo />アプリケーションにようこそ！
    </h1>,
    document.getElementById('app')
);
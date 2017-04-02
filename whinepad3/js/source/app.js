'use strict'

import Logo from './components/Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import CRUDStore from './flux/CRUDStore'
import Whinepad from './components/Whinepad';
import schema from './schema';

CRUDStore.init(schema);

ReactDOM.render(
    <div>
        <div className="app-header">
            <logo />Whinepadにようこそ！
        </div>
        <Whinepad />
    </div>,
    document.getElementById('pad')
);
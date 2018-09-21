import React from 'react';
import { render } from 'react-dom';

import 'babel-polyfill';

import Root from '../view/containers/Root';


render(
    <Root />,
    document.getElementById('root')
);

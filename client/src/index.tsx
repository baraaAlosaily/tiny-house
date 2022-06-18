import React from 'react';
import { render } from "react-dom";
import {Listings} from './sections';
import ApolloClient from 'apollo-boost';
import { ApolloProvider  } from '@apollo/react-hooks';
import './index.css';

const client=new ApolloClient({
  uri:"http://localhost:3003/api"
})

render(
    <ApolloProvider client={client}>
    <Listings title="Tiny House" />
    </ApolloProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

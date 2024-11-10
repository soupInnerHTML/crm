import "reflect-metadata";
import './di/container';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AddUserForm, EditUserForm, Main} from "@views";
import {Navigation} from "@types";
import {GoBack} from "@library";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <GoBack />
        <Routes>
            <Route path={Navigation.MAIN} element={<Main />} />
            <Route path={Navigation.ADD_USER} element={<AddUserForm />} />
            <Route path={Navigation.EDIT_USER + "/:userId"} element={<EditUserForm />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

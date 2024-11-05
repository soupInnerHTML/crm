import "reflect-metadata";
import '@abraham/reflection';
import './di/container';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {StoreContext} from "./context";
import {userStore} from "./store";
import {Main, AddUserForm} from "./components";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {Navigation} from "./types";
import GoBack from "./components/@common/GoBack";
import { Provider } from 'inversify-react';
import {container} from "./di/container";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider container={container}>
          <StoreContext.Provider value={{users: userStore}}>
            <BrowserRouter>
                <GoBack />
                <Routes>
                    <Route path={Navigation.MAIN} element={<Main />} />
                    <Route path={Navigation.ADD_USER} element={<AddUserForm />} />
                </Routes>
            </BrowserRouter>
          </StoreContext.Provider>
      </Provider>
  </React.StrictMode>
);

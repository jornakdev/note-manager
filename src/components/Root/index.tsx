import React, {FC} from 'react';
import {Provider} from 'react-redux';
import { Route, Router } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import Notes from "../Notes";
import Note from "../Note";
import {PATHS} from "../../utils/paths";
import {MessagesProvider} from "../../utils/i18n";
import {store, history} from '../../utils/redux';


const Root: FC = () => (
    <Provider store={store}>
        <MessagesProvider>
            <ConnectedRouter history={history}>
                <Router history={history}>
                    <Route path={PATHS.ROOT}exact component={Notes} />
                    <Route path={PATHS.NOTE}exact component={Note} />
                    <Route path={PATHS.NOTE_ID} exact component={Note} />
                </Router>
            </ConnectedRouter>
        </MessagesProvider>
    </Provider>
)

export default Root
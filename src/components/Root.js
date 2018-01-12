import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './Header';
import Pagination from './Pagination';
import Stories from './Stories';
import User from './User';
import Item from './Item';

const NoMatch = () => {
    return <span>Page Not Found</span>
}

const AppLayout = () => {
    return(
        <div className="app">
            <Route path="/:pageType?"
                render={
                    (props) => <Header {...props} />
                }/>
            <Route path="/:pageType?/:page?"
                render={
                    (props) => <Pagination {...props} />
                }/>
            <main className="main">
                <Switch>
                    <Route path='/(|top)/:page?'
                        render={
                            (props) => <Stories {...props} />
                        }/>
                    <Route path='/(|new)/:page?'
                        render={
                            (props) => <Stories {...props} />
                        }/>
                    <Route path='/(|show)/:page?'
                        render={
                            (props) => <Stories {...props} />
                        }/>
                    <Route path='/(|ask)/:page?'
                        render={
                            (props) => <Stories {...props} />
                        }/>
                    <Route path='/(|job)/:page?'
                        render={
                            (props) => <Stories {...props} />
                        }/>
                    <Route path='/user/:id'
                        render={
                            (props) => <User {...props} />
                        }/>
                    <Route path='/item/:id'
                        render={
                            (props) => <Item {...props} />
                        }/>
                    <Route component={NoMatch} />
                </Switch>
            </main>
        </div>
    );
}

const Root = ({store}) => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <AppLayout />
            </BrowserRouter>
        </Provider>
    );
}

export default Root;

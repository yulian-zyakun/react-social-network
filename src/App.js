import React, { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { initializeApp } from "./redux/app-reducer";
import { connect, Provider } from "react-redux";
import store from "./redux/redux-store";
import { withSuspense } from "./HOC/WithSuspense";

const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);

class App extends React.Component {
  catchUnhandleErrors = (promiseRejectionEvent) => {
    alert("Error occured.");
    console.error(promiseRejectionEvent);
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchUnhandleErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection");
  }
  render() {
    // if (!this.props.initialized) {
    //   return <Preloader />;
    // }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route
              path="/dialogs"
              render={() => {
                return (
                  <Suspense fallback={<div>Loading...</div>}>
                    <DialogsContainer />
                  </Suspense>
                );
              }}
            />
            <Route
              path="/profile/:userId?"
              render={() => {
                return (
                  <Suspense fallback={<div>Loading...</div>}>
                    <ProfileContainer />
                  </Suspense>
                );
              }}
            />
            <Route path="/users" render={withSuspense(UsersContainer)} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/settings" component={Settings} />
            <Route path="*" render={() => <div>Error 404 - Not Found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const AppMain = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default AppMain;

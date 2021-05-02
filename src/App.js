 
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
// import StatusChecker from "./app/components/StatusChecker";
import AppFooter from "./app/components/AppFooter";
import NavigationMenu from "./app/NavigationMenu";
import store from "./redux/store";

function App(props) {

  console.log('Environment:',process.env.NODE_ENV)
  return (
    <Provider store={store}>
        <div className="App component-full-background-image">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
               <NavigationMenu props={props}></NavigationMenu>
            </Container>
          </React.Fragment>
           {/* <StatusChecker></StatusChecker> */}
           <AppFooter></AppFooter>
        </div>
    </Provider>
  );
}

export default App;

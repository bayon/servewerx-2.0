 
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import StatusChecker from "./app/components/StatusChecker";
import Navigation from "./app/Navigation";
import store from "./redux/store";
function App(props) {

  console.log('Environment:',process.env.NODE_ENV)
  return (
    <Provider store={store}>
        <div className="App">
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <Navigation />
            </Container>
          </React.Fragment>
           <StatusChecker></StatusChecker>
        </div>
    </Provider>
  );
}

export default App;

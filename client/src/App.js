import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import Auth from "./components/Auth/Auth";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import PostDetails from "./components/PostDetails/PostDetails";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/about" />} />
          <Route path="/posts" exact component={Content} />
          <Route path="/posts/search" exact component={Content} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/about" exact component={About} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;

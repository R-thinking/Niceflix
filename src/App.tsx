import { Switch, Route, useLocation } from "react-router-dom";

import { createGlobalStyle } from "styled-components";
import Header from "./Components/Header";

import { Home, Shows, Movies, Latest, MyList } from "./Routes";
import Login from "./Routes/Login";
import LoginHeader from "./Components/LoginHeader";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;1,300&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

input {
  outline:none;
}

* {
  box-sizing: border-box;
}
body {
  font-weight:300;
  font-family: "Source Sans Pro", sans-serif;
  line-height:1.2;
  color:${(props) => props.theme.bodyColor};
  background-color: ${(props) => props.theme.bodyBackgroundColor};
  height:100vh;
  overflow-x: hidden;
}

a {
  text-decoration:none;
  color:inherit
}

button {
  outline:none;
  border:none;
  box-shadow:none;
  cursor:pointer;
}

progress {
  appearance: none;
  height:2.5px;
  &::-webkit-progress-bar {
    border-radius: 5px;
    /* border: 1px solid rgba(167, 166, 166, 0.5); */
    background-color:rgba(219, 219, 219, 0.5);
    height: 2.5px;
    width: 100%;
    overflow: hidden;
  }

  &::-webkit-progress-value {
    background: rgba(212, 9, 19, 0.9);
    border-radius: 0px;
    height: 2.5px;
    width: 100%;
  }
}

`;

function App() {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      {location.pathname === "/login" ? <LoginHeader /> : <Header />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/shows">
          <Shows />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/latest">
          <Latest />
        </Route>
        <Route path="/my-list">
          <MyList />
        </Route>
      </Switch>
    </>
  );
}
export default App;

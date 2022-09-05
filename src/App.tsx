import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/LayoutArea/Header/Header";
import Footer from "./Components/LayoutArea/Footer/Footer";
import Main from "./Components/LayoutArea/Main/Main";
import Menu from "./Components/LayoutArea/Menu/Menu";
import Ads from "./Components/LayoutArea/Ads/Ads";
import DarkMode from "./Components/DarkMode/DarkMode";
function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Menu/> */}
      <Main />
      {/* <DarkMode /> */}
      {/* <Ads/> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;

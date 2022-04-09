import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import SimpleLogin from "./component/SimpleLogin/SimpleLogin";
import SimpleAuthentication from "./component/SimpleAuthentication/SimpleAuthentication";

function App() {
  
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/simple" element={<SimpleLogin></SimpleLogin>}></Route>
        <Route path="/more-simple" element={<SimpleAuthentication></SimpleAuthentication>}></Route>
      </Routes>
    </div>
  );
}

export default App;

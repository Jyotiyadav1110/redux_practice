import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Service from "./components/Service";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Layout/>}>
        <Route index element={<Home />}/>
          <Route path="Service" element={<Service />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="*" element ={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;


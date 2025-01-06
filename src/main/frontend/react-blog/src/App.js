import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/app/Header";
import Footer from "./Components/app/Footer";
import Main from "./Components/app/Main";

import "./css/style.css";
import "./css/main.css";
import "./css/header.css";
import "./css/footer.css";

import HttpHeadersProvider from "./Components/context/HttpHeadersProvider";
import AuthProvider from "./Components/context/AuthProvider";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <HttpHeadersProvider>
            <Header />
            <Main />
            <Footer />
          </HttpHeadersProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

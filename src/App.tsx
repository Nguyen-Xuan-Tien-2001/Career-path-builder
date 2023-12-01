import 'react';
import Header from "./components/Header/Header.tsx";
import Rout from './components/Rout/rout.tsx';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Rout />
        <Footer/>
      </BrowserRouter>

    </>
  );
}

export default App;

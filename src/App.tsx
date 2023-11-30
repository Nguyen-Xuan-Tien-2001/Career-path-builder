import 'react';
import Header from "./components/Header/Header.tsx";
import Rout from './components/Rout/rout.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Rout />
        <Footer></Footer>
      </BrowserRouter>

    </>
  );
}

export default App;

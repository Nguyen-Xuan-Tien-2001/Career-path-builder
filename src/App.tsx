import 'react';
import Header from "./components/Header/Header.tsx";
import Rout from './components/Rout/rout.tsx';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Rout />
      </BrowserRouter>

    </>
  );
}

export default App;

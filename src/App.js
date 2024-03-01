import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import NavBar from "./components/NavBar";
import Container from "./components/Container";
import SingleJob from "./pages/SingleJob";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./editorstyles.css";
import "./index.css";

function App() {
  return (
    <div className='App  bg-black min-h-screen text-white font-light'>
      <BrowserRouter>
        <NavBar />
        <div className='pages block py-8'>
          <Container>
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/add' element={<AddJob></AddJob>}></Route>
              <Route path='/jobs/:id' element={<SingleJob />}></Route>
            </Routes>
          </Container>
          <ToastContainer theme='dark' />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

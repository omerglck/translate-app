import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./store/actions/userAction";
import MainPage from "./pages/MainPage";

function App() {
 
  return (
    <>
      <MainPage/>
    </>
  );
}

export default App;

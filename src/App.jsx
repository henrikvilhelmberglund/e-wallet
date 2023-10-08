import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import Cards from "./routes/Cards";
import Root from "./routes/Root";
import Addcard from "./routes/Addcard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='/cards' element={<Cards />}/>
      <Route path='/addcard' element={<Addcard />}/>
    </Route>
  )
)

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

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
    <Route path='/e-wallet' element={<Root />}>
      <Route index element={<Cards />} /> 
      <Route path='/e-wallet/cards' element={<Cards />}/>
      <Route path='/e-wallet/addcard' element={<Addcard />}/>
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

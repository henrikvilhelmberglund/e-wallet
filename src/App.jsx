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
      <Route index element={<Cards />} /> 
      <Route path='/cards' element={<Cards />}/>
      <Route path='/addcard' element={<Addcard />}/>
    </Route>
  ), {basename: import.meta.env.DEV ? '/' : '/e-wallet/'}
)

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

import { createContext, useState } from "react";
import "./App.css";
import Login from "./Login"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import Register from "./Register"

export const ReloadCalendarContext = createContext({
  reloadCalendar: false,
  setReloadCalendar: () => {},
});

export const EditModalContext = createContext({
  editModalOpen: false,
  setEditModalOpen: () => {},
  editTask: {},
  setEditTask: () => {},
});

function App() {

  return (
        <div className="App">

          <BrowserRouter>
            <Routes>

              <Route 
                path={"/"}  
                element={<CalendarPage></CalendarPage>}>
              </Route>

              <Route 
                path={"/login"}
                element={<Login></Login>}>
              </Route>

              <Route 
                path={"/Register"}
                element={<Register></Register>}>
              </Route>

            </Routes>
          </BrowserRouter>
          
        </div>
  );
}

export default App;

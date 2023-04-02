import logo from './logo.svg';
import './App.css';
import Calender from './Calender';
import AddTask from './AddTask'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>    
    <div className="App">
      <AddTask></AddTask>
      <Calender></Calender>
    </div>
  </LocalizationProvider>
  );
}

export default App;

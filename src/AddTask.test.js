import { render, screen, fireEvent } from '@testing-library/react';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddTask from './AddTask';


test('renders add Task', () => {
  render(<AddTask calendar={calStub()}/>);
  const linkElement = screen.getByText(/Add Task to Test/i);
  expect(linkElement).toBeInTheDocument();
});

const calStub = () => {
   return {
      title: "Test"
   }
}

test('Clicking Add Task opens Dialog', () => {
   render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <AddTask calendar={calStub()}/>
      </LocalizationProvider>
   );
   const linkElement = screen.getByText(/Add Task to Test/i);
   fireEvent.click(linkElement);
   const submitElement = screen.getByText(/submit/i);
   expect(submitElement).toBeInTheDocument();
})

test('Clicking One Time Event when OFF Switches DatePickers to DateTimePickers', () => {
   render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <AddTask calendar={calStub()}/>
      </LocalizationProvider>
   );
   const linkElement = screen.getByText(/Add Task to Test/i);
   fireEvent.click(linkElement);
   const switchEl = screen.getByLabelText("One Time Event");
   fireEvent.click(switchEl);
   const startDate = screen.getByLabelText("Start Date");
   const lastTwo = startDate.value.trim().substr(-2);
   expect(lastTwo).toMatch(/AM|PM/);
});

test('Clicking One Time Event when ON Switches DateTimePickers to DatePickers', () => {
   render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <AddTask calendar={calStub()}/>
      </LocalizationProvider>
   );
   const linkElement = screen.getByText(/Add Task to Test/i);
   fireEvent.click(linkElement);
   const switchEl = screen.getByLabelText("One Time Event");
   fireEvent.click(switchEl);
   fireEvent.click(switchEl);
   const startDate = screen.getByLabelText("Start Date");
   const lastTwo = startDate.value.trim().substr(-2);
   expect(lastTwo).toMatch(/$(?!(AM|PM))/);
});
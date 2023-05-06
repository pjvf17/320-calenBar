import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import {expect, jest, test} from '@jest/globals';
import Service from './Service.js';

// Black box testing examples
const testLoginUser = (user) =>  {
  Service.loginUser(user)
         .then(response => response.ok);
}

const testDeleteTaskFromBackend = (calendarId, taskId) => {
  Service.deleteTask(calendarId, taskId);

  let tasks = Service.getCalendars().tasks;
  Service.getCalendars().then((val) => console.log(val));

  return !(tasks.includes(task));
}

test("testLoginUser logs in a user successfully", () => {
  console.log("...Hi!!")
});

test("testDeleteTaskFromBackend", () => {
  const testCalendarId = 1;
  const taskId = 0;

  const taskIsDeletedFromBackend = testDeleteTaskFromBackend(testCalendarId, taskId); 

  expect(taskIsDeletedFromBackend).toBe(true);
});


// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("calenBar renders CalendarUI Properly", () => {
    render(<App />);
    const linkElementPrevYearHeader = screen.getByText(/prev year/);
    const linkElementPrevMonthHeader = screen.getByText(/prev month/);
    const linkElementNextMonthHeader = screen.getByText(/next month/);
    const linkElementNextYearHeader = screen.getByText(/next year/);

    const linkElementYearMonthHeader = screen.getByText(/2023 May/);

    const linkElementSunday = screen.getByText(/Sunday/);
    const linkElementMonday = screen.getByText(/Monday/);
    const linkElementTuesday = screen.getByText(/Tuesday/);
    const linkElementWednesday = screen.getByText(/Wednesday/);
    const linkElementThursday = screen.getByText(/Thursday/);
    const linkElementFriday = screen.getByText(/Friday/);
    const linkElementSaturday = screen.getByText(/Saturday/);
    
    expect(linkElementPrevYearHeader).toBeInTheDocument();
    expect(linkElementPrevMonthHeader).toBeInTheDocument();
    expect(linkElementNextMonthHeader).toBeInTheDocument();
    expect(linkElementNextYearHeader).toBeInTheDocument();
    
    expect(linkElementYearMonthHeader).toBeInTheDocument();

    expect(linkElementSunday).toBeInTheDocument();
    expect(linkElementMonday).toBeInTheDocument();
    expect(linkElementTuesday).toBeInTheDocument();
    expect(linkElementWednesday).toBeInTheDocument();
    expect(linkElementThursday).toBeInTheDocument();
    expect(linkElementFriday).toBeInTheDocument();
    expect(linkElementSaturday).toBeInTheDocument();
  });

  test("nextMonth displays next month's calendar view properly 2023 May", () => {
    render(<App />);
    
    const linkElementYearMonthHeader = screen.getByText(/2023 May/);
    
    const linkElementNextMonthHeader = screen.getByText(/next month/);
    fireEvent.click(linkElementNextMonthHeader);

    let linkElementNextYearMonthHeader = screen.getByText(/2023 June/);
    expect(linkElementNextYearMonthHeader).toBeInTheDocument();
  });

function deleteTaskStub(calendarList, calendarId, taskList, taskId) {
  let calendar;

  try {
    calendar = calendarList[calendarId];
  } catch(e) {
    return {
      status: "Error: Message not found."
    }
  }

  let tasks = calendar.taskList;
  tasks.pop(taskId);

  return {
    status: "success"
  }
}

test("Delete Task functionality works with a delete task stub function", () => {
    let uniqueCalendarId = 0;
    let taskId = 1;
    let may2023 = { taskList: ['HW1', 'HW2']};

    let calendars = [may2023];

    let tasks = may2023.taskList;

    let response = deleteTaskStub(calendars, uniqueCalendarId, tasks, taskId);

    expect(response.status).toBe("success");
    expect(tasks.length).toBe(1);
});
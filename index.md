# Calenbar Documentation

## Purpose

The purpose of this calendar is to give users a detailed visualization of their tasks. Specifically, it will enable them to have a better understanding of which tasks need to be worked on for a given day. We hope that this software will help our users to more efficiently complete their tasks and manage their time.

## User Actions

1. Register/login in using the icon in the top right. You will be required to provided a username and password. 
2. Create new calendars (you will start out with one calendar, but you may create new calendars using the + button to the right of the logo in the top left. 
3. Create new tasks/events. Use the add task/event button at the top of the page. You will be shown a form in which you will be required to fill out the necessary attributes for a task/event. 
4. Edit Existing tasks/events. Simply click on an existing task/event in the calendar and you will be prompted with a forum similar to that of the add task/event in which you may edit the specified fields. NOTE: You may also use the edit task/event feature to delete. 
5. Switch between existing calendars. This may be done by clicking on the box to the left of the logo in the top left.

## Software Breakdown

1. Front-end
   
   The front-end is comprised of a webpage that uses the React library and can be run on any the following browsers (Mozilla / Internet Explorer / Google Chrome / Safari). The front-end layer contains a React server that uses Node.js. HTTP requests including json data is sent between the front-end and back-end.
   
2. Back-end
 
   The back-end is hosted on AWS EC2. It is comprised of two layers: the application and data layer. The application layer hosts a Django server that uses REST API and Python. The data layer is a SQLite database which sends and recieves SQL queries from the application layer. 

## Visualization

![alt text](https://github.com/pjvf17/320-calenBar/blob/main/images/mainUI.png)

Above, is the main calendar interface, which we created using material-ui. Once, a user has logged in, this is the main page that our users will interact with. The calendar is comprised of tasks and events. A task is represented with a bar that adjusts in height based on the expected number of hours to complete and the proximity to the deadline. The color of a bar is determined by the user when creating or editing a task. Events, which occur on a single day, are viewable from the purple calendar icon in the top right of each day of the calendar. A user may view the events for a given day by clicking on the purple icon of the specified day. 

## Class Representation in the Back-end

![alt text](https://github.com/pjvf17/320-calenBar/blob/main/images/classDiagram.png)

## Data Representation

![alt text](https://github.com/pjvf17/320-calenBar/blob/main/images/data.png)

Above, is the json representation of a task. When a user adds a new task, a json file like this is passed to the back-end where it is read and stored. You can see the corresponding attributes of the calendar titled "Personal" and the task titled "asdfasdf" within it. This json file is a good representation for what the attributes for a calendar and a task look like. When a user creates a new calendar or task, they are expected to provide these attributes. 



# Calenbar Documentation

## Purpose

The purpose of this calendar is to give users a detailed visualization of their tasks. Specifically, it will enable them to have a better understanding of which tasks need to be worked on for a given day. We hope that this software will help our users to more efficiently complete their tasks and manage their time.

## Software Breakdown

1. Front-end
   
   The front-end is comprised of a webpage that uses the React library and can be run on any the following browsers (Mozilla / Internet Explorer / Google Chrome / Safari).
   HTTP requests including json data is sent between the front-end and back-end.
   
2. Back-end
 
   The back-end is hosted on AWS EC2. It is comprised of two layers: the application and data layer. The application layer hosts a React server that uses Node.js and a      Django server that uses REST API and Python. The data layer is a SQLite database which sends and recieves SQL queries from the application layer. 

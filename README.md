# React Daily Goal Tracker

## Live demo

https://davide2894.github.io/react-daily-goal-tracker/

## Description

This app let the user set weekly goals and keep track of them.
It has a backend layer powered by Firestore used to store the user account alongised all the associated goals.

## User journey

The user has to register an account or login with one if it already exists.
Once logged in, the user can start creating and editing weekly goals.
If a page is refreshed or reloaded, the account is persisted, which means that the user session is kept, hence the account keeps being logged in.

The user can decide to logout at any time.

## What I learned and technologies used

I wanted to use this project as a learning experience to practice and build things with React while learning modern practices involved with it.
In fact, I wanted to learn:

- React v18 to learn and use the power of functional components
- Global state management by using a state container. I opted for Redux Toolkit because it's easier than going directly with Redux, considering it has way less boilerplate code involved and the exposed API makes the coding experience much enjoyable
- how to setup a backend for user authentication. I opted for Firebase as a backend layer and Firestore as a database system
- how to get data from backend and manage this data in the global state. For this I combined Firestore with Redux Tooklkit and RTK Query
- I wanted to also learn TypeScript since it's modern, typed, safer and less bug prone than plain Javascript

## Getting Started

### Dependencies

- NodeJS >= 10
- Chrome (or any Chromium based browser, like the new Edge)/Firefox/Safari

### Installing

Run 'npm i'

### Executing program

- Run in dev mode (with file watch): 'npm start'
- Run in production mode - it generates a single build: 'npm run build'
- Launch tests: 'npm run test'

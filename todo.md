# [x] first analysis

I'm using this file to brainstorm about this web progressive app I want to build in order to improve my learning in React, solidy the concepts I studied so far and to get some practice experience.

Ideally, this project should use

- redux + react-redux for state management
- react-roture to have multiple pages, let's say at least 2 so that I can show I can use router
- i should draw at least the screens
  - for each screen i should draw the single components
  - for each components, there should be a few notes about main functinoalityu and state that will have, based on user interaction
- this application must have at least a couple of unit tests
- another thing is that it must be progressive, which means that a manifest is needed and a service worker as well. I think cra comes in handy for that
- code should be splitted accordingly
- there should be a user management functionality. Meaning:
  - a new user can register
  - a registered user can login
  - user goal states are saved accordingly on backend
  - everytime a user login he is redirected to main page
- there should be more pages - homepage: - intro message - button to go to goals page - wip area - button to register - buttoi to login - this page should have - header
  - logo - on the right -> login button - goals page - add a task section - a "+" button to toggle - when i click the + btn - a popup shows up on the page. this popup contains a small form that enable the user to add a task and set the amout of times per wekk that he wants to reach this goal - goal list - goal tracker component - goal tracker component - goal tracker component - [...] - goal tracker component. How is it composed. It should have: - goal name - goal score - goal total amount of times planned for meeting in a week - an edit button. this button when clicked - opens up the goal setting popup, where user can - edit goal name - edit goal total number of times to meet in a week - a save button
    -> if clicked
    -> saves goal tracker state
    -> updates goal list state
    -> closes popup - a cancel button
    -> if clicked
    -> it closes the popup - a delete button
    -> when clicked
    -> delets this goal
    -> updates the goals total list - a "+1" button - if clicked -> increases goal current score by 1 - a "-1" button - if current score is 0 -> disable button - if clicked
    -> decreases goal current score by 1 - login page that is Armani-like, which means has - login form on the left - if on landing I detect that the user session is registered -> redirect to homepage - if user is not registered. then I show a landing with two sections - a section on the left showing a login form - a section on the right containing: - a text informing the user about registration benefits - a btn that when clicked, redirects the user to the registration page - register page - if on landing I detect that the user session is registered -> redirect to homepage - if user is not registered. then I show the registration form.
    TODO

# [x] design

    [x] put down notes
    [x] draw screens

# [] development

## [] main behavior

### [] frontend

#### [] main logic and structuire

        [x] homepage
            [x] welcome message
            [x] cta to go to the goals page when clicked
            [x] cta to register (to add later when i develop the user management backend logic)
            [x] cta to login (to add later when i develop the user management backend logic)
        [] goals page
            [] goals list
                - state: goalsList
                - fns
                    - onGoalDelete -> setGoalsList by removing goal
                    - onGoalAdd -> setGoalsList +1
            [] goal tracker component
                - state:
                    - goalCount
                - key=uniqueId (da capire come renderlo unico se gli obiettivi li creo a mano, e non mi arrivano da un'api). L'importante è che l'id non arrivi
                [] add goal -> update goalsListState
                [] goal score
                    [] report times goal was met / total times the goas is supposed to be met
                    [] increase score btn
                        [] click -> increase score by 1 -> setGoalsCount(prevGoalsCount => prevGoalsCount + 1)
                    [] decrease score btn
                        [] click -> increase score by 1 -> setGoalsCount(prevGoalsCount => prevGoalsCount + 1)
                [] edit goal btn
                    - onclick -> open edit form popup
                [] delete goal btn
                    -> onClick -> call onDeleteClick prop fn to set parent goalsList

#### [] style

    [] home
        [] goals cta
        [] register cta
        [] login cta
    [] goals page
        [] goal component
        [] add goal btn
        [] goal form
    [] register page
    [] login page

### [] backend

        [] myaccount component
        [] create user db
        [] handle user login
        [] handle user registration
        [] my account on hover
            [] open my account layer with login and register cta
            [] click on login cta
                -> if user exists -> go to login page
                -> if user doesn't exist -> go to register page
        [] homepage
            [] if user is logged
                -> don't show my account button
                -> show sign out button
            [] if user doesn't exist
                -> show my account cta

## [] unit

    [] develop first unit test on goal addition
    [] develop first unit test on goal modification
    [] develop first unit test on goal deletion
    [] develop first unit test on user registration
    [] develop first unit test on user login

# [] test

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

# [x] development

## [x] main behavior

### [] frontend

#### [x] main logic and structuire

        [x] homepage
            [x] welcome message
            [x] cta to go to the goals page when clicked
            [x] cta to register (to add later when i develop the user management backend logic)
            [x] cta to login (to add later when i develop the user management backend logic)
        [x] goals page
            [x] goals list
                [x] state: goalsList
                    [x] set initial state
                    [x] print all initial goals on landing
                [x] user interactions
                    - onGoalIncrement -> setGoalsList +1
                    - onGoalDecrement -> setGoalsList by removing goal
            [x] goal tracker component
                - state:
                    - goalCount
                - key=uniqueId (da capire come renderlo unico se gli obiettivi li creo a mano, e non mi arrivano da un'api). L'importante è che l'id non arrivi
                [x] add goal
                    [] click on button
                        [x] open add goal form
                    [x] compile form
                    [x] on form submit
                        [x] validation
                            [x] title must be text
                            [x] score must be a valid number
                            [x] id must be unique
                        [x] update goalsListState
                [x] put the form in a modal
                    [x] create a modal
                    x put the form in there
                    [x] on add goal btn click
                        [x] when modal state is open (true) -> show modal
                        [x] set modal state to open
                        [x] when modal state is not open (false) -> hide modal
                [x] goal score
                    [x] report times goal was met / total times the goas is supposed to be met
                    [x] increase score btn
                        [x] click -> increase score by 1 -> setGoalsCount(prevGoalsCount => prevGoalsCount + 1)
                        [x] fix bug: on increase first click doesn't fire
                    [x] decrease score btn
                        [x] click -> increase score by 1 -> setGoalsCount(prevGoalsCount => prevGoalsCount + 1)
                    [x] on goal max score reached: color goal card by green and disable
                [x] edit goal btn
                    [x] open edit form modal on edit button click
                    [x] when you open the form, form title and score input fields should be filled with data from that specific goal in the state
                    [x] edit of info inside input field is allowed
                    [x] submit
                        [x] goal title input field should still be of type text
                        [x] goal score input field should still be of type number
                        [x] in the state, we should update only the goal object that is directly interested (filtering done by matching goal unique id)
                    [x] page should now display the same number of goals
                    [x] page should now display the same number of goals in the same order
                    [x] page should now display the same number of goals in the same order and unique ids are not changed
                    [x] click and counter to increment should still work on same goal
                    [x] click and counter to increment should still work on same goal
                    [x] click and counter to increment should still work on other goals
                    [x] click and counter to increment should still work on other goals
                [x] delete goal btn
                    [x] clicking on this button should delete the matching goal item in global goals state array
                    [x] regression test on goal lists
            [x] landing: keep track of all the added goal, which means: persist goal data on page reload

### [] backend

        [x] myaccount
            [x] login
                [x] enable user to login
            [x] register
                [x] enable user to register
            [x] on landing
                [x] if user is logged
                    [x] show welcome message with user.name
                    [x] show goals route
                [x] if user is not logged
                    [x] show my account to let user register or logged
        [] associate goals to logged user
            [] firestore
                [x] creare user and goals data structure
                [x] decrement
                [x] increment
                [x] delete goal
                [x] reset goal score button (to add)
                [x] edit goal -> fix
                [] avoid double click on same button to avoid unwanted effects. maybe need to wrap click inside useEffect??? useRef maybe??
                [] fix lag between click and count increase
                https://bobbyhadz.com/blog/react-prevent-multiple-button-clicks
        [x] homepage
            [x] if user is logged
                [x] don't show my account button
                [x] show sign out button
                [x] show goals route only to logged user
                [x] goals functionalities provided via firebase and saved through firestore
                    [x] retrieve goals from user document (firestore)
                    [x] add goal: update goals subcollection for that specific user document (firestore)
                    [x] remove goal: remove goals subcollection for that specific user document (firestore)
                    [x] update goal: update goal in goal subcollection for that specific user document (firestore)
            [x] if user doesn't exist
                -> show link to myAccount page
        [x] my account on hover
            [x] open my account layer with login and register cta
            [x] click on login cta
                -> if user exists -> go to login page
                -> if user doesn't exist -> go to register page

## [x] unit tests

    [] components
        [x] login
        [x] register
        [x] goal
            [x] test prop: check that if goal.isComplete then it must have complete class added
            [x] when click on increment goal score
                -> I expect score to increment by one
            [x] when click on decrement goal score
                -> I expect score to decrement by one
        [x] newGoalButton
            [x] when click on goal add button, the goal modal shows up with
            [x] submit form -> new goawl added to goals
        [x] user
            [x] on user registration -> user is logged in
            [x] when user logs in -> user is shown (???)

#### [] style

    [] mobile
        [x] home
        [] goals page
            [x] goal component
                [x] ctas
                [x] edit btn: add tooltip with label
                [x] delete btn: add tooltip with label
                [x] reset btn: add tooltip with label
            [x] edit form popup
            [x] add goal
                [x] add goal btn
                [x] add goal form
        [x] signout button
    [x] adapt to tablet
    [x] adapt to desktp
    [x] scss bugfix: fix too many imports appear in styles tab on browsers. Something in the way I import style file is wrong
    [x] backend bugfix: edit button -> goes NaN when press edit submit button on form without changing current number, with score field already filled with actual max score
    [\\\] loader:
        [] while firestore operation is performing -> show loader
        [] while firestore operation is performing -> hide loader
    ____nice to have but not cumpolsory[] extra - ... - layer that on hover shows little layer with
        - edit btn
        - delete btn
        - reset btn

# [x] test

# [x] migrate code to typeScrit

    [x] migrate all of the code to TypeScript
        [x] install typescript in app
        [x] create and adapt tsconfig file (copy it from top project if needed)
        [x] rename every singile jsx into tsx
        [x] fix compiler bugs if there is any already by now
        [x] create types where you see it fit (put types and interfaces inside common file called types. every single type is to be exported one at a time, not everything at once. because by exporting one type at a time, you can import them one by one dynamically)
            [x] goal
            [x] score
            [x] user
            [x] button
            [x] for firebase?
    [x] test that everything works accordingly
    [x] fix tests files that show erros (highlighted in red)
    [x] push all the new code

# [x] more style

    [x] fix server error message style
        [x] mobile
        [x] tablet
        [x] desktop

# [x] optimize types structure by taking advantage and using properly polymorphism

# [x] check this error out when trying to edit goal max score

Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime

# [x] a11y

    [x] focus -> pale yellow outline
    [x] unify modals (new goal and edit goal in one single component)
    [x] commonize modal and forms
        [x] make one central modal component to use
        [x] make one central goal form to use
            [x] see what actually changes between edit and add new goal
            [x] make one common goal form component that takes a prop
                -> add new goal
                -> edit new goal
                [x] baded on this prop we adapt the action it's going to do
    [x] close modal
        [x] on esc -> close modal
        [x] on click outside

# [x] landing

    [x] see if something can be done with the landing, because right now when i reload the page it goes firstly to the myaccount page and then it checks wheter the user is logged in or not, and only then goes to the goals page.
    When it lands, if user is logged, it should go directly to the goals page.
    Maybe see if it's possible to insert a loader or something like this?

# [x] publish

    [x] write a good readme (wh)
    [x] publish app with gh-pages (quizzical on gh)
    [x] test it live on android
    [x] test it live on ios
    [x] remove firebase credentials from code?

# fix post review

    [x] ts
        [x] id di goal: any --> mettere string
        [x] interfaccia user che contiene user è ridondante
        [x] eviterei di usare object, poco generico, poco stretto, is on par with any. usa Record che accetta due generici
            Record<string, number> or something like this
    [x] useEffect in modal.tsx -> insert props.onClose() in useEffect dependency array
        - es. destructure di props.onClose()
        - stabilizzare onClose() perché altrimenti useEffect runna all'infinito
    [] bug: split counter update between frontend and backend
        [] frontend
            [] increase
            [] decrease
            [] reset
        [] backend
            [] increase
            [] decrease
            [] reset

# todo quizzical

---

[] useMemo -> usalo dentro il progetto del quizzical

[] 1. rimetter goalSlice
[] 2. crea customhook -

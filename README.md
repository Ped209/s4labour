# S4labourTechTest

## Frontend

To start the frontend:

change directory to: "s4labour\Frontend\s4labour-tech-test"

then run: 

```bash
npm run start
```

or

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Backend

Open the api solution at:

S4Labour\s4labour\Backend\CoreApi

run the project in visual studio


## Design Decisions
create public DTO so the users password and other potentially sensitive information isn't returned to the frontend. 

Considerations:
the model returned from the randomuser api is large and contains many fields that aren't required for the list view. Normally a simple version of the user model would be used for the list view (only containing the properties that are needed to be displayed and an id) with the more detailed version being returned on the 'GetById' request.

The spec specified loading the data on application load - I created a page for the root of the user feature that handles loading the user data as this felt cleaner than loading the data with the app component or master-layout component and for the purposes of the demo had the same effect. I also only load the data once, in a multiuser system you would more likely load the data each time the user navigates to a page and with each sort/filter to ensure the latest data is being used.

User Filtering - because the demo is working with static data I handled the filtering within the component. In a prod scenario dealing with larger datasets then pagination would probably come into play. When that's the case you wouldn't have your entire dataset held locally so would need to do an api call for filtering and sorting. In order to make this efficient I would use debounceTime and SwitchMap (and potentially distinctUntilChanged) to limit the rate at which api calls are made (so if someone is typing 5 chars quickly 5 different api calls aren't made) and to cancel previous requests as we no longer care about the results. Would probably limit api calls being triggered to at least 2 chars as filtering by a single char often isn't helpful.

Store user favourites to localstorage to persist between page refreshes - the signal on the service handles sharing the data between different components but the localstorage is used to save between sessions. In a prod system this wouldn't be ideal as a user may access the system from different browsers/devices and would expect to see their favourites carried over - so the users favourite selections would likely be stored in the db.

Header menu responsiveness - collapse to hamburger (or similar) menu for small screen size.
Table responsiveness - as the screen size shrinks then possible hide certain columns, introduce a scrollbar on the table or elipsis etc to prevent the whole page from getting the horizontal scrollbar.

Notes Storage - I opted for in memory storage for the notes, which means when the backend project is stopped the notes are erased. I think this is sufficient for demo purposes, in a production application these would obviously be saved permanently.

## Persisting the employee data

While the employee data that comes from the randomuser api is broken into various smaller I think some of these would be better stored in the main users table while some stored separate tables.

User Table:
------------
id (PK), 
email, 
username, 
phone, 
cell, 
nationality, 
dob_date, 
registered_date, 
gender, 
title, 
firstname, 
lastname.

Fields such as age don't need to be stored as they are easily calculated.

A user could potentially have multiple addresses so storing them in a separate table would be better

UserLocations
-------------
locationId (PK),
userId (FK), 
streetnumber, 
streetname, 
city, 
state, 
country, 
postcode, 
lat, 
lng, 
timezone

UserFavourites
--------------
owningUserId (FK),
userId (FK),

Working on the assumption that the techtest is a user management system then one user is favouriting other users, this would be a many-to-many relationship so use a link table. 

UserNotes
---------
noteId (PK),
userId (FK),
content,
dateCreated
createdByUserId (FK) (possibly if who created the note is required)

UserLogins
----------

If there is an authentication system that allows multiple login types like google/facebook etc then a logins table maybe required to map external users to internal.

Pictures
assuming the site only allows a single image but stores 3 sizes of it I would store a single reference to the image in the user table with the thumbnail/medium/large images being created from a single upload and the property values being created in the api service.


## Ensuring Quality

Testing - business logic should be unit tested to ensure what is expected is what happens. This also helps when refactoring as less chance of problems being introduced. When bugs are fixed if unit tests are added to test for the cause of the bug then there is also less chance it will be reintroduced in the future. Writing code with testing in mind can also help to produce cleaner code with limited scope/responsiblities and dependencies properly injected.

Pull Requests - assigning sufficient time pull requests means developers can pay attention to what is being submitted and provide more meaningful feedback and suggestions on how code could be improved.

CI/CD pipelines - having projects build and tests run in the CI pipeline helps ensure environments rare in a better state and code is consistent across environments.

Branching Strategy - Using a branching strategy such as gitflow can help make it easier when it comes to releasing code and making sure that any hotfixes that need to be applied can be done without introducing any other features that might be in progress

Performance - Things like caching data that doesn't change often, making sure db requests are efficient (maybe using stored procedures for heavier queries involving multiple entities) and implementing paging so smaller datasets are returned from the api can help with application performance. Implementing logging can also help to identify busy areas of the application or long running queries etc. 
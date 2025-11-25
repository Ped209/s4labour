# S4labourTechTest

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server:

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

## Building

To build the project run:

```bash
ng build
```


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

While the employee data that comes from the randomuser api is broken into various smaller classes these all exist 
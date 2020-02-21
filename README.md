# Search Movies Application

This project was developed as a challenge.
See the [Demo](https://ng8-search-movie-app.firebaseapp.com/) here.

# Sumary

- [Scenario](#scenario)
- [Features](#features)
- [Technologies](#technologies)
- [Content](#content)
- [Prerequisites](#prerequisites)
- [Installing, testing and running](#installing-testing-and-running)
- [Author](#author)

## Scenario:

A great idea for a new movies collection application. This new site is based on angular application which it contain the below features:

### Features:

- **General**
  - Mobile first
  - Polished design.
  - Responsive design.
  - Progressive Web App(access app in off-line etc.).
  - Local Storage.
  - Pagination.
  - Consuming a real API.  

- **Movies List**
  - Welcome view.
  - Movie search
  - Upon search : 
  - Paginated list of Movies if found.
  - 404  view if not found.
  - Possible to access movie list in off-line mode if that particular movie title has been previously searched for  while user was online.
  - Clicking on a particular movie redirect you to the selected &#39;movie detail&#39; page.

- **Movie detail**
  - Show selected movie detail information.
  - Navigate back to &#39;movie list&#39;.
  - Displays a back button for navigation.
  - Possible to access movie details in off-line mode if that particular movie has been previously accessed in online mode.

Navigation work as follows:
  * using the back and forward button of the browser take to the correct page.
  * reloading the current page work as expected.
  * Enter key  works well for both browser and mobile when submitting search query.
  * Clicking submit button works as well.
  


#### Technologies

- [Angular](https://angular.io/)
- [Angular CLI](https://cli.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Rxjs](https://github.com/ReactiveX/rxjs)
- [bootstraps](https://github.com/twbs/bootstrap)
- [jasmine](https://github.com/jasmine/jasmine)
- [firebase](https://github.com/firebase/)


#### Content

[OMDb API](http://www.omdbapi.com/#top) was used as a B.E, serving REStful API.

### Prerequisites

To run this project you need:

[NodeJs](https://nodejs.org/en/download/)

### Installing, testing and running

Clone the project:

```
git clone https://github.com/giresse19/movie-search-app
```

Install the depedencies:

```
npm install
```

Run unit test:

```
ng test
```

Run the application:

```
npm start
```

## Author

* **Giresse Ashu-Bob** - [Github](https://github.com/giresse19)

This document will outline the structure of the application for future reference. Note that README.md contains instructions for starting the application, including all necessary dependencies and commands.

# Frontend:

- Index.tsx contains the ReactDOM.render() method and creates the Router
- App.tsx renders the navbar besides the MainRouter
- MainRouter.tsx in the router directory displays the specific page depending on the path
- The store is configured using redux toolkit, store and hooks are in the app folder
- Most files are sorted by functionality in the feature directory
- - For example, post contains the submitPost component, the post component, the post slice, the post api, and the post tests.
- The remote/reverb-api folder contains asynchronous axios call declarations.

# Backend:

- Controllers, Repositories, and Pojo's are organized by feature in the revature directory
- - Profiles are under users
- - Postmeta under posts
- com.revature.security.firebase and com.revature.security.props contains configuration files that specify which endpoints require authentication
- A user object is associated to authenticated requests and is retrieved using “@AuthenticatedPrinciple User user” as a parameter in a controller endpoint

# Important Notes:

- The backend MUST be running at all times during app usage! User registration goes to firebase and the backend, and this is the only chance for the backend to create a corresponding user and profile in the database.
- We have little error handling on the frontend, so the above can lead to problems where users do not have profiles.

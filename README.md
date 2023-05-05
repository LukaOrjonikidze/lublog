# LuBlog
Basic Blog web application, made with React for Front-End, ASP.NET Core Web API with Entity Framework as a Back-End. 

The Application uses SQLite Database to store Data.

The Authentication uses JWT to make sure the user is authenticated and the application is secure.

## How to run the application

### Front-End
1. Open the Front-End folder in the terminal
2. Run `npm install` to install all the dependencies
3. Run `npm start` to start the application

### Back-End
1. Open the Back-End folder in the terminal
2. Run `dotnet restore` to install all the dependencies
3. Run `dotnet run` to start the application

## How to use the application
1. Register a new user
2. Login with the new user
3. Create a new blog
4. You have the ability to update/delete your own blogs.
5. View other users blogs, but you can't update/delete them.
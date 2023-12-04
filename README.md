/**

 * Authentication Application
 * 
 * This application provides authentication functionalities using JWT and cookies.
 * 
 * Functionalities:
 * - Create User: Allows creating a new user with the provided credentials. -> (/api/register)
 * - Login: Authenticates the user and generates a JWT token and sets it as a cookie. -> (/api/login)
 * - Logout: Clears the JWT token cookie and logs out the user. -> (/api/logout)
 * - Get Own User Info: Retrieves the information of the currently authenticated user. -> (/api/user)
 * 
 * Usage:
 * 1. Create a new user by calling the `create` endpoint with the required user details.
 * 2. Authenticate the user by calling the `login` endpoint with the user credentials.
 * 3. After successful authentication, the JWT token will be set as a cookie.
 * 4. Use the JWT token to access protected routes and retrieve the user's own information.
 * 5. To log out, call the `logout` endpoint to clear the JWT token cookie.

 * DO NOT USE THIS APPLICATION IN PRODUCTION.
 
 **/

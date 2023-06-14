# products-app-fe

This repository contains the frontend code for the products CRUD application. It is developed with Angular and provides a user interface for interacting with the backend API.

## Features

- **Create**: Users can add new products by filling out a form with the product details and submitting it.

- **Read**: Users can view a list of existing products in a grid view (in the form of cards), displaying their names, prices, and descriptions. User can also switch to list view (list products in a tabular format).

- **Update**: Users can edit the details of a product by navigating to its details page and modifying the form fields.

- **Delete**: Users can remove a product from the system by confirming the deletion action.

- **Validation**: Form inputs are validated to ensure required fields are filled and appropriate formats are used.

## Project Structure

The project follows a component-based architecture in Angular. Here's a brief overview of the main directories:

- `src/app/components`: Contains UI components used throughout the application.

- `src/app/models`: Defines TypeScript interfaces for representing product data.

- `src/app/services`: Provides Angular services for interacting with the backend API and handling data operations.

## Getting Started

To run the frontend locally, follow these steps:

1. Ensure that you have Node.js and npm (Node Package Manager) installed on your machine.

2. Clone this repository to your local machine.

3. Open a terminal or command prompt and navigate to the root directory of the project.

4. Install the dependencies by running the following command:
```
npm install
````

5. Update the API endpoint in the environment configuration file (`src/environments/environment.ts`) to match the URL of your backend API.

6. Start the frontend application:
```
ng serve
```
7. The frontend application should now be running and accessible at the specified URL.

## Docker

To run the frontend using Docker, you can use the following commands:

1. Build the Docker image:
```
docker build -t products-app-fe .
```
2. Run the Docker container:
```
docker run -p 5321:80 products-app-fe
```
The frontend application will be available at `http://localhost:5321`.
## Future Enhancements

Here are some potential enhancements for the frontend:

- **Authentication**: Implement user authentication and session management to secure the application and provide personalized experiences.

- **Pagination**: Add pagination support to the product list view to handle large datasets more efficiently.

- **Search and Filtering**: Enable users to search for specific products or filter the product list based on various criteria.

- **Image Upload**: Allow users to upload images for each product and display them in the product details view.

- **Error Handling**: Improve error handling mechanisms to provide more informative error messages and handle different types of errors gracefully.



Employee Management System (EMS)
A full-stack Employee Management Web Application that allows users to manage employee records efficiently. The application provides full CRUD (Create, Read, Update, Delete) functionality with a responsive frontend and a structured backend.

🔹 Project Demo
GitHub Repository: https://github.com/om65277/ems-project

🛠️ Key Features
Add new employee records with details such as name, role, image, salary, contact, email, and address.
View all employees in a structured and responsive list format.
Update existing employee information easily.
Delete employee records when necessary.
Fully responsive frontend built with React.js.
RESTful API backend using Node.js and Express.js.
MongoDB database for secure and flexible data storage.
💻 Tech Stack
Frontend: React.js, HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
Others: Axios for API requests, Mongoose for MongoDB modeling

📁 Project Structure
ems-project/ │ ├── client/ # React frontend │ ├── src/ │ ├── public/ │ └── package.json │ ├── server/ # Node.js + Express backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── config/ │ └── server.js │ └── README.md

⚡ Installation & Setup
Clone the repository
git clone https://github.com/om65277/ems-project.git
Setup Backend

cd ems-project/server
npm install
Create a .env file and configure your MongoDB URI:

MONGO_URI=<your_mongodb_connection_string>
PORT=5000
Start the backend server:

npm run server
Setup Frontend

cd ../client
npm install
npm start
Open http://localhost:3000 to view the application in your browser.

📌 Usage
Add, update, delete, and view employee information.

All changes are persisted in the MongoDB database.

Responsive UI works across devices.

🚀 Future Enhancements
User authentication and role-based access (Admin, HR, Employee)

Search, filter, and pagination for employee lists

Export employee data as CSV or PDF

Integration with cloud storage for employee images

👨‍💻 Author
Om Nadarkar
LinkedIn: Om Nadarkar










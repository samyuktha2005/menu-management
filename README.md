# 🍽️ Menu Management System

A **full-stack menu management system** designed for restaurants and food businesses to efficiently manage category-based menus, track item availability in real-time, and handle cart operations for a smooth customer experience.

---

## Features
 **Category Management** – Organize items into categories (Starters, Main Course, Desserts, etc.).  
 **CRUD Operations** – Add, edit, delete, and view menu items easily.  
 **Real-Time Availability Tracking** – Update stock availability dynamically.  
 **Shopping Cart Functionality** – Customers can add items to their cart and review before checkout.  
 **RESTful API** – Built with Node.js, Express, and MongoDB for scalable data handling.  
 **Frontend Ready** – Easily connect your HTML/CSS/JS frontend or extend with React/Vue.

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Version Control:** Git, GitHub

---

##  Project Structure

```

menu-management/
├── backend/          # Node.js + Express backend
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Logic handlers
│   ├── server.js     # Entry point
├── user/           # Static HTML, CSS, JS for frontend
├── README.md         # Project documentation

````

---

## Installation & Setup

**Clone the repository:**

```bash
git clone https://github.com/samyuktha2005/menu-management.git
cd menu-management
````

**Install dependencies:**

```bash
npm install
```

**Set up environment variables:**

Create a `.env` file in the root with:

```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
```

4️⃣ **Run the server:**

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

API Endpoint:

```
http://localhost:5000/api/menu
```

---

## API Endpoints

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/api/menu`     | Get all menu items       |
| POST   | `/api/menu`     | Add a new menu item      |
| PUT    | `/api/menu/:id` | Update a menu item by ID |
| DELETE | `/api/menu/:id` | Delete a menu item by ID |

---

## Usage

* Open your browser and navigate to your frontend HTML page to see items fetched dynamically.
* Use Postman to test API endpoints for adding, editing, and deleting items.
* Track item availability in real-time by updating item status through the backend.

---

## Contributing

Contributions are welcome! If you want to:

* Add authentication
* Build a React frontend
* Integrate payment gateways
* Improve styling

Feel free to fork and submit a PR.

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgements

* MongoDB for flexible database management.
* Node.js and Express for efficient API development.
* Your dedication to building and understanding backend systems.

---

## Contact

For any queries or collaborations, reach out:

* GitHub: [samyuktha2005](https://github.com/samyuktha2005)

---

Happy coding!

````

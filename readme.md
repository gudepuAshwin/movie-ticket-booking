🎟️ Book My Ticket - Backend
📌 Project Overview

This project is a backend implementation of a simplified movie ticket booking system.
It extends an existing codebase by adding authentication, protected booking routes, and concurrency-safe seat booking logic.

The system ensures that only authenticated users can book seats and prevents duplicate bookings using database transactions.

🚀 Features
🔐 Authentication
User registration with validation
User login with JWT token
Secure password hashing using bcrypt
🛡️ Authorization
Protected routes using middleware
Only authenticated users can book seats
🎬 Seat Management
Fetch all available seats
Book seats for a movie
⚡ Booking Logic
Prevents duplicate booking using FOR UPDATE
Uses database transactions (BEGIN, COMMIT, ROLLBACK)
Associates booked seat with user
📧 Email Notification
Sends booking confirmation email after successful booking
Non-blocking email sending (does not affect API response)
🛠️ Tech Stack
Node.js
Express.js
PostgreSQL
JWT (Authentication)
bcrypt (Password hashing)
Nodemailer (Email service)
⚙️ Setup Instructions

1. Clone repository

git clone

2. Install dependencies

npm install

3. Create .env file

PORT=8080

DB_HOST=localhost
DB_PORT=5433
DB_NAME=book_my_ticket
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_NAME=BookMyTicket
SMTP_FROM_EMAIL=your_email@gmail.com

4. Run PostgreSQL

Make sure PostgreSQL is running on the configured port.

5. Start server

npm start

📡 API Endpoints
🔐 Register

POST /api/user

🔐 Login

POST /api/user/login

🎬 Get Seats

GET /seats

🎟️ Book Seat (Protected)

PUT /booking/

Header:
Authorization: Bearer

🔄 Booking Flow
User registers and logs in
Server generates JWT token
User sends booking request with token
Backend validates token
Transaction begins
Seat row is locked (FOR UPDATE)
If available → seat is booked
Transaction committed
Email sent to user
🧠 Key Design Decisions
Used PostgreSQL transactions for consistency
Prevented race conditions using row-level locking
Separated logic into controller and service layers
Used async email sending to avoid blocking requests
⚠️ Limitations
No frontend login UI (API-based testing)
No booking history feature
Email retry mechanism not implemented
🔮 Future Improvements
Add booking history endpoint
Allow multiple seat booking
Add payment integration
Build frontend UI
Add automated testing
👨‍💻 Author

Gudepu Ashwin

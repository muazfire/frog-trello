# FroggyTasks - Task Management Application

FroggyTasks is a full-stack web application inspired by Trello. It allows users to manage tasks through lists, with functionality to create, move, and delete lists and items. Built using **TypeScript**, **React**, **Next.js**, and **tRPC**, the application ensures seamless user interaction and data persistence.

---

## Features

### Core Features
- Create, delete, and manage lists.
- Add items to lists and move them across lists.
- Persistent state across browser refreshes and sessions using a PostgreSQL database.
- Responsive UI optimized for both desktop and mobile.

### Additional Features
- User-friendly toolbar navigation.
- Smooth transitions and animations.
- Modern and clean UI design with Material-UI and custom styles.
- Card Description and Comment

---

## Tech Stack

### Frontend:
- **React**
- **Next.js**
- **Material-UI**

### Backend:
- **tRPC** for seamless client-server communication.
- **Prisma** as the ORM.
- **PostgreSQL** as the database.

### State Management:
- **Jotai** for efficient and scalable state management.

### Bonus Tools:
- **Docker** for containerized environments (optional).
- **GitHub Actions** for CI/CD pipelines (if implemented).

---

## Setup Instructions

### Prerequisites
1. Install [Node.js](https://nodejs.org/) (version 16+ recommended).
2. Install [PostgreSQL](https://www.postgresql.org/).
3. Install [PNPM](https://pnpm.io/) (optional for monorepo setups).
4. Ensure **Docker** is installed (optional).

---

### Steps

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <repository-folder>
```

#### 2. Install Dependencies
```bash
npm install
# or if using pnpm
pnpm install
```

#### 3. Configure Environment Variables
- Create a `.env` file in the root of the project with the following variables:
```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/froggytasks
```
Replace `<username>` and `<password>` with your PostgreSQL credentials.

#### 4. Run the Database Migrations
```bash
npx prisma migrate dev
```

#### 5. Start the Development Server
```bash
npm run dev
# or if using pnpm
pnpm dev
```
The application will be accessible at `http://localhost:3000`.

---

## Usage

### Creating a Board
- Navigate to the homepage and use the **Create Board** form to add a new task board.

### Managing Lists
- Add, delete, or move items within lists on the board page.

---

## Docker Setup (Optional)

To ensure a consistent development and deployment environment:

1. Build the Docker Image:
```bash
docker build -t froggytasks .
```

2. Run the Container:
```bash
docker run -p 3000:3000 froggytasks
```

The application will be accessible at `http://localhost:3000`.

---

## Testing
- Include any tests written for the application in a `tests/` directory.
- Run tests using:
```bash
npm test
```

---

## Contribution
Feel free to fork the repository and submit pull requests for improvements or new features.

---

## Contact
For any inquiries, reach out at [muazbinafandi@gmail.com]


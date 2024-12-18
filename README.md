# FroggyTasks - A Trello-Inspired Task Management Application

FroggyTasks is a full-stack task management application inspired by Trello, built with modern web technologies. It allows users to organize tasks into boards and lists with a smooth drag-and-drop interface.

## Features

- **Board Management**: Create, edit, and delete boards
- **List Organization**: Create multiple lists within boards
- **Card System**: Add, edit, and move cards between lists
- **Drag and Drop**: Intuitive drag-and-drop interface for cards and lists
- **Real-time Updates**: Changes reflect immediately across the interface
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Tech Stack

- **Frontend**:
  - Next.js
  - TypeScript
  - Material UI
  - TailwindCSS
  - React Beautiful DND

- **Backend**:
  - tRPC
  - Prisma ORM
  - PostgreSQL
  - Clerk Authentication (Coming Soon)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/froggytasks.git
cd froggytasks
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Fill in your environment variables in the `.env` file:
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Usage

1. Create a new board by clicking "Create" button
2. Add lists to your board using the "Add List" button
3. Add cards to your lists
4. Drag and drop cards between lists
5. Click on cards to edit their details

## Future Enhancements

- [ ] User Authentication and Authorization
- [ ] Card Comments and Attachments
- [ ] Board Sharing and Collaboration
- [ ] Activity Log
- [ ] Labels and Due Dates
- [ ] Board Templates

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](link-to-issues).

## License

This project is [MIT](link-to-license) licensed.

## Author

**Muaz Bin Afandi**
- Portfolio: [muazbinafandiportofolio.netlify.app](https://muazbinafandiportofolio.netlify.app/)
- LinkedIn: [Muaz Afandi](https://www.linkedin.com/in/your-profile)
- GitHub: [@yourusername](https://github.com/yourusername)

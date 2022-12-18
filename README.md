# Users Dashboard

Simple app that displays a list of users and allows to add, modify and delete them. 

## Demo
GitHub Pages: [https://kuzznicki.github.io/users-dashboard](https://kuzznicki.github.io/users-dashboard)

## Features
- List of users
- Adding, modifiying, and deleting users
- Sorting users by id, name, username, or email

Data comes from My JSON Server API. 
While adding, modifying, or deleting users, data is updated locally, requests to My JSON Server API are sent but responses are faked and data is not persisted.

## Installation and running in development mode

```bash
git clone https://github.com/kuzznicki/users-dashboard.git
cd users-dashboard
npm install
npm run dev
```

## Building for production

```bash
npm run build
```

## Previewing the production build
```
npm run preview
```

## Screenshot

![Screenshot of the app](https://i.imgur.com/mn7l12O.png)
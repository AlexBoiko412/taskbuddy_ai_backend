// src/server.ts
import express from 'express';
import tasks from "./routes/tasks";
import auth from "./routes/auth";

const app = express();

app.use(express.json());

app.use('/auth', auth);
app.use('/tasks', tasks);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
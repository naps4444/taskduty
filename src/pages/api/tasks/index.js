// /pages/api/tasks/index.js
let tasks = []; // In-memory storage for tasks. You can replace this with a database.

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get all tasks
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    // Create a new task
    const { id, title, description, tag } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }

    const newTask = { id, title, description, tag };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

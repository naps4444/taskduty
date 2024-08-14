// /src/pages/api/tasks/[id].js
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb'; // Ensure this path is correct

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('uctask'); // Replace 'taskdb' with your database name
  const collection = db.collection('tasks'); // Replace 'tasks' with your collection name

  switch (req.method) {
    case 'GET':
      try {
        const task = await collection.findOne({ _id: new ObjectId(id) });
        if (task) {
          res.status(200).json(task);
        } else {
          res.status(404).json({ message: 'Task not found.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error fetching task.', error });
      }
      break;

    case 'PUT':
      try {
        const { title, description, tag } = req.body;
        const updatedTask = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { title, description, tag } },
          { returnOriginal: false }
        );
        if (updatedTask.value) {
          res.status(200).json(updatedTask.value);
        } else {
          res.status(404).json({ message: 'Task not found.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating task.', error });
      }
      break;

    case 'DELETE':
      try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Task not found.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting task.', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

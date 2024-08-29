import connectMongoDB from '@/lib/mongodb';
import Task from '@/models/Task';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectMongoDB();

  console.log('Request Method:', method); // NEW: Log the HTTP method
  console.log('Request Body:', req.body); // NEW: Log the request body

  switch (method) {
    case 'GET':
      try {
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        console.error('Error fetching task:', error.message); // NEW: Detailed error logging
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        // Validate the request body before updating
        const { title, description, tag } = req.body;
        if (!title || !description || !tag) {
          return res.status(400).json({
            success: false,
            error: 'Title, description, and tag are required fields.',
          });
        }

        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!task) {
          return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        console.error('Error updating task:', error.message); // NEW: Detailed error logging
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedTask = await Task.findByIdAndDelete(id); // UPDATED: Use findByIdAndDelete
        if (!deletedTask) {
          return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        console.error('Error deleting task:', error.message); // NEW: Detailed error logging
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: `Method ${method} Not Allowed` }); // NEW: Improved error handling for unsupported methods
      break;
  }
}

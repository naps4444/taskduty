import connectMongoDB from '@/lib/mongodb';
import Task from '@/models/Task';

export default async function handler(req, res) {
  const { method } = req;

  // Log the method and body of the request for debugging
  console.log('Request Method:', method);
  console.log('Request Body:', req.body);

  // Connect to MongoDB
  try {
    console.log('Connecting to MongoDB...');
    await connectMongoDB();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    return res.status(500).json({ success: false, error: 'Failed to connect to the database.' });
  }

  switch (method) {
    case 'POST':
      try {
        const { title, description, tag } = req.body;

        // Validate that all required fields are provided
        if (!title || !description || !tag) {
          return res.status(400).json({
            success: false,
            error: 'Title, description, and tag are required fields.',
          });
        }

        // Create a new task in the database
        const task = await Task.create({ title, description, tag });
        res.status(201).json({ success: true, data: task });
      } catch (error) {
        // Log and return an error if the task creation fails
        console.error('Error creating task:', error.message);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'GET':
      try {
        // Fetch all tasks from the database
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        // Log and return an error if fetching tasks fails
        console.error('Error fetching tasks:', error.message);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    // Handle unsupported HTTP methods
    default:
      res.status(405).json({ success: false, error: `Method ${method} Not Allowed` });
      break;
  }
}

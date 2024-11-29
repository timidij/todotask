// controllers/taskController.js
import Task from '../model/Task.js';

// export const createTask = async (req, res) => {
//     const { title, description, deadline, priority } = req.body;
//     try {
//         const task = await Task.create({ title, description, deadline, priority });
//         res.status(201).json(task);
//     } 
//  catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

export const createTask = async (req, res) => {
    const { title, description, deadline, priority } = req.body;
    const userId = req.userId; // Assuming you have middleware to set req.user

    try {
        const task = new Task({ userId, title, description, deadline, priority });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTasks = async (req, res) => {

    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, priority } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, { title, description, deadline, priority }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(204).send();
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
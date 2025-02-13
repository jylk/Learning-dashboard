import { Course } from "../models/courseModel.js";

export const searchCourse = async (req, res, next) => {
    try {
        const { query } = req.query; // Get the search query from request params
    
        // Search for courses that contain the query in the title or description
        const courses = await Course.find({
          $or: [
            { title: { $regex: query, $options: "i" } }, // Case-insensitive search
            { description: { $regex: query, $options: "i" } },
          ],
        });
    
        res.json(courses); // Send the matching courses as response
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
    };

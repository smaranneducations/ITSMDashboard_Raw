// APIComment.js
import express from 'express';
import { findComments, createComment, updateComment, deleteComment } from '../databaseCRUD/CRUDComment.js';

const router = express.Router();

// Get all comments
router.get('/comments', async (req, res) => {
  try {
    const comments = await findComments();
    res.json(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new comment
router.post('/comments', async (req, res) => {
  try {
    const comment = await createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an existing comment
router.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedComment = await updateComment(parseInt(id, 10), text);
    res.json(updatedComment);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Delete a comment
router.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteComment(parseInt(id, 10));
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;

import express from 'express';
import Poll from '../models/Poll.js';

const router = express.Router();

// Get all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single poll
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new poll
router.post('/', async (req, res) => {
  try {
    const { question, options } = req.body;
    
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ 
        message: 'Question and at least 2 options are required' 
      });
    }

    const poll = new Poll({
      question,
      options: options.map(option => ({ text: option, votes: 0 }))
    });

    const savedPoll = await poll.save();
    res.status(201).json(savedPoll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote on a poll
router.post('/:id/vote', async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ message: 'Invalid option' });
    }

    poll.options[optionIndex].votes += 1;
    poll.totalVotes += 1;
    
    const updatedPoll = await poll.save();
    res.json(updatedPoll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete poll
router.delete('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    
    poll.isActive = false;
    await poll.save();
    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
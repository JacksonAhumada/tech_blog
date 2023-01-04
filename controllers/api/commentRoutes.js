const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

router.get('/user', async (req, res) => {
    try {
        const commentData = await User.findAll({

            include: [
                {
                    model: Comment,
                    attributes: {
                        exclude: ['password']
                    },
                },
            ],
        });
        if (!commentData) {
            res.status(404).json({ message: "That User doesn't exist!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        if (!commentData) {
            res.status(404).json({ message: "No existing comments!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts', async(req, res) => {
    try {
        const commentData = await User.findByPk(req.params.id, {

            include: [
                {
                    model: Comment,
                    
                },
            ],
        });
        if (!commentData) {
            res.status(404).json({ message: "That User doesn't exist!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/allModels', async (req, res) => {
    try {
        const commentData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                },
                {
                    model: Comment,
                },
            ],
        });
        if (!commentData) {
            res.status(404).json({ message: "That Post doesn't exist!" });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: 'No Post found with this id.' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
    });


router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

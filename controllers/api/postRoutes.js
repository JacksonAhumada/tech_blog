const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/user', async (req, res) => {
    try {
        const postData = await User.findAll({

            include: [
                {
                    model: Post,
                    attributes: {
                        exclude: ['password']
                    },
                },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: "That User doesn't exist!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ 
            include: [{ model: User, attributes:  { exclude: ['password']} }],
        });

        if (!postData) {
            res.status(404).json({ message: "That user doesnt exist!" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const postData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        if (!postData) {
            res.status(404).json({ message: 'That user doesnt exist' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No Post found.' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
    });


router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'Post doesnt exist!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const { Galaxy, Star, Planet } = require(`../models/index.js`);

// Show all resources
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.status(200).json(galaxies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id, {
      include: [
        {
          model: Star,
          as: "Stars",
          include: [
            {
              model: Planet,
              as: "Planets",
            },
          ],
        },
      ],
    });
    if (galaxy) {
      res.status(200).json(galaxy);
    } else {
      res.status(404).json({ error: "Galaxy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.status(201).json(galaxy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.update(req.body);
      res.status(200).json(galaxy);
    } else {
      res.status(404).json({ error: "Star not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (galaxy) {
      await galaxy.destroy();
      res.status(204).json(true);
    } else {
      res.status(404).json({ error: "Galaxy not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };

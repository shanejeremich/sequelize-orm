const { Planet, Star } = require(`../models/index.js`);

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: [{ model: Star, as: "Stars" }],
    });
    if (planet) {
      res.status(200).json(planet);
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    res.status(201).json(planet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.update(req.body);
      res.status(200).json(planet);
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (planet) {
      await planet.destroy();
      res.status(204).json(true);
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };

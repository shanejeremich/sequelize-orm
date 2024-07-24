const { Star, Planet, Galaxy, StarsPlanets } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    res.status(200).json(stars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id, {
      include: [
        {
          model: Planet,
          as: "Planets",
          through: { attributes: [] },
        },
        { model: Galaxy },
      ],
    });
    if (star) {
      console.log(`Found ${star.Planets.length} planet(s) associated with this star.`);
      res.status(200).json(star);
    } else {
      res.status(404).json({ error: "Star not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const { galaxyId, planetIds, ...starData } = req.body;

    const galaxy = await Galaxy.findByPk(galaxyId);
    if (!galaxy) {
      return res.status(404).json({ error: "Galaxy not found" });
    }

    const star = await Star.create(starData);

    await star.setGalaxy(galaxy);

    if (planetIds && planetIds.length > 0) {
      const planets = await Planet.findAll({
        where: { id: planetIds },
      });
      await star.setPlanets(planets);
    }

    const starWithAssociations = await Star.findByPk(star.id, {
      include: [{ model: Galaxy }, { model: Planet }],
    });

    res.status(201).json(starWithAssociations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.update(req.body);
      res.status(200).json(star);
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
    const star = await Star.findByPk(req.params.id);
    if (star) {
      await star.destroy();
      res.status(204).json(true);
    } else {
      res.status(404).json({ error: "Star not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };

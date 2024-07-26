const { Star, Planet, Galaxy, StarsPlanets } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();

    if (!stars) {
      return res.status(404).json({ error: "Stars not found" });
    }

    if (req.accepts("html")) {
      return res.status(200).render("pages/stars/index", { stars });
    }

    return res.status(200).json(stars);
  } catch (err) {
    console.error("Failed to fetch stars:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Get the form to create a new resource
const newForm = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.status(200).render("pages/stars/create", { galaxies });
  } catch (err) {
    console.error("Failed to load form:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  try {
    const star = await Star.findByPk(id, {
      include: [
        { model: Galaxy },
        {
          model: Planet,
          as: "Planets",
          through: { attributes: [] },
        },
      ],
    });

    if (!star) {
      return res.status(404).json({ error: "Star not found" });
    }

    if (req.accepts("html")) {
      return res.status(200).render("pages/stars/show", { star });
    }

    return res.status(200).json(star);
  } catch (err) {
    console.error("Failed to fetch star:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(422).send("No files were uploaded.");
    }

    const image = req.files.image;
    const basePath = `/uploads/stars/`;
    const uploadPath = `${__dirname}/../public${basePath}${image.name}`;

    image.mv(uploadPath, async err => {
      if (err) return res.status(500).send(err);

      const { galaxyId, planets, ...starData } = req.body;
      starData.imageUrl = `${basePath}${image.name}`;

      const star = await Star.create(starData);

      if (galaxyId) {
        const galaxy = await Galaxy.findByPk(galaxyId);
        if (galaxy) {
          await star.setGalaxy(galaxy);
        }
      }

      if (planets && planets.length > 0) {
        const planetIds = planets.split(",");
        const planetInstances = await Planet.findAll({
          where: {
            id: planetIds,
          },
        });
        await star.setPlanets(planetInstances);
      }

      return res.status(201).redirect(`/stars/${star.id}`);
    });
  } catch (err) {
    console.error("Failed to create star:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  const { id } = req.params;
  try {
    const star = await Star.findByPk(id);

    if (!star) {
      return res.status(404).json({ error: "Star not found" });
    }

    if (req.files && req.files.image) {
      const image = req.files.image;
      const basePath = `/uploads/stars/`;
      const uploadPath = `${__dirname}/../public${basePath}${image.name}`;

      image.mv(uploadPath, async err => {
        if (err) return res.status(500).send(err);
      });
      req.body.imageUrl = `${basePath}${image.name}`;
    }

    await star.update(req.body);

    if (req.body.planets) {
      const newPlanetIds = req.body.planets
        .split(",")
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));
      await star.setPlanets(newPlanetIds);
    } else {
      await star.setPlanets([]);
    }

    if (req.accepts("html")) {
      return res.redirect(`/stars/${id}`);
    }

    return res.status(200).json(star);
  } catch (err) {
    console.error("Failed to update star:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Populate the form to edit a single resource
const edit = async (req, res) => {
  const { id } = req.params;
  try {
    const star = await Star.findByPk(id, {
      include: [
        { model: Galaxy },
        {
          model: Planet,
          as: "Planets",
          through: { attributes: [] },
        },
      ],
    });
    const galaxies = await Galaxy.findAll();
    const planetIds = star.Planets.map(planet => planet.id);

    if (!star) {
      return res.status(404).json({ error: "Star not found" });
    }

    if (req.accepts("html")) {
      return res.render("pages/stars/update", { star, galaxies, planetIds });
    }

    return res.status(200).json(star);
  } catch (error) {
    console.error("Failed to fetch star:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;

  console.log("id: ", id);

  try {
    const star = await Star.findByPk(id);
    if (star) {
      await star.destroy();
      if (req.accepts("html")) {
        return res.status(204).redirect("/stars");
      } else {
        return res.status(204).json({ message: `Star with ${id} deleted` });
      }
    } else {
      res.status(404).json({ error: "Star not found" });
    }
  } catch (err) {
    console.error("Failed to delete star:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Export all controller actions
module.exports = { index, newForm, show, create, update, remove, edit };

const { Planet, Star } = require(`../models/index.js`);

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    if (!planets) {
      return res.status(404).json({ error: "Planets not found" });
    }

    if (req.accepts("html")) {
      return res.status(200).render("pages/planets/index", { planets });
    }

    return res.status(200).json(planets);
  } catch (err) {
    console.error("Failed to fetch planets:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

// Get the form to create a new resource
const newForm = (req, res) => {
  try {
    res.status(200).render("pages/planets/create");
  } catch (err) {
    console.error("Failed to load form:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await Planet.findByPk(id, {
      include: [
        {
          model: Star,
          as: "Stars",
        },
      ],
    });

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }

    if (req.accepts("html")) {
      return res.status(200).render("pages/planets/show", { planet });
    }
    return res.status(200).json(planet);
  } catch (err) {
    console.error("Failed to fetch planet:", err.message);
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
    const basePath = `/uploads/planets/`;
    const uploadPath = `${__dirname}/../public${basePath}${image.name}`;

    image.mv(uploadPath, async err => {
      if (err) return res.status(500).send(err);

      const planetData = {
        ...req.body,
        imageUrl: `${basePath}${image.name}`,
      };

      const planet = await Planet.create(planetData);

      const starIds = req.body.stars.split(",").map(id => parseInt(id.trim()));
      await planet.setStars(starIds);

      return res.status(201).redirect(`/planets/${planet.id}`);
    });
  } catch (err) {
    console.error("Failed to create planet:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  const { id } = req.params;

  try {
    const planet = await Planet.findByPk(id);

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }

    if (req.files && req.files.image) {
      const image = req.files.image;
      const basePath = `/uploads/planets/`;
      const uploadPath = `${__dirname}/../public${basePath}${image.name}`;
      image.mv(uploadPath, async err => {
        if (err) return res.status(500).send(err);
      });
      req.body.imageUrl = `${basePath}${image.name}`;
    }

    await planet.update(req.body);

    if (req.body.stars) {
      const newStarIds = req.body.stars
        .split(",")
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));
      await planet.setStars(newStarIds);
    } else {
      await planet.setStars([]);
    }

    if (req.accepts("html")) {
      return res.redirect(`/planets/${planet.id}`);
    }

    return res.status(200).json(planet);
  } catch (err) {
    console.error("Failed to update planet:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Populate the form to edit a single resource
const edit = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: [
        {
          model: Star,
          as: "Stars",
        },
      ],
    });

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }

    const starIds = planet.Stars.map(star => star.id);

    if (req.accepts("html")) {
      return res.render("pages/planets/update", { planet, starIds });
    }

    return res.status(200).json(planet);
  } catch (err) {
    console.error("Failed to fetch planet:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await Planet.findByPk(id);
    if (planet) {
      await planet.destroy();
      if (req.accepts("html")) {
        return res.status(204).redirect("/planets");
      } else {
        return res.status(204).json({ message: `Planet with ${id}deleted` });
      }
    } else {
      res.status(404).json({ error: "Planet not found" });
    }
  } catch (err) {
    console.error("Failed to delete planet:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Export all controller actions
module.exports = { index, newForm, show, create, update, edit, remove };

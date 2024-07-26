const { Galaxy, Star } = require(`../models/index.js`);

// Show all resources
const index = async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll();
    if (!galaxies) {
      return res.status(404).json({ error: "Galaxies not found" });
    }

    if (req.accepts("html")) {
      return res.status(200).render("pages/galaxies/index", { galaxies });
    }

    return res.status(200).json(galaxies);
  } catch (err) {
    console.error("Failed to fetch galaxies:", err.message);
    return res.status(500).json({ error: err.message });
  }
};

// Get the form to create a new resource
const newForm = (req, res) => {
  try {
    res.status(200).render("pages/galaxies/create");
  } catch (err) {
    console.error("Failed to load form:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Show resource
const show = async (req, res) => {
  const { id } = req.params;
  try {
    const galaxy = await Galaxy.findByPk(id, {
      include: [
        {
          model: Star,
          as: "Stars",
        },
      ],
    });

    if (!galaxy) {
      return res.status(404).json({ error: "Galaxy not found" });
    }

    if (req.accepts("html")) {
      return res.status(200).render("pages/galaxies/show", { galaxy });
    }
    return res.status(200).json(galaxy);
  } catch (err) {
    console.error("Failed to fetch galaxy:", err.message);
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(422).send("No files were uploaded.");
    }

    const image = req.files.image;
    const basePath = `/uploads/galaxies/`;
    const uploadPath = `${__dirname}/../public${basePath}${image.name}`;

    image.mv(uploadPath, async err => {
      if (err) return res.status(500).send(err);

      const galaxyData = {
        ...req.body,
        imageUrl: `${basePath}${image.name}`,
      };

      const galaxy = await Galaxy.create(galaxyData);

      const starIds = req.body.stars.split(",").map(id => parseInt(id.trim()));
      await galaxy.setStars(starIds);

      return res.status(201).redirect(`/galaxies/${galaxy.id}`);
    });
  } catch (err) {
    console.error("Failed to create galaxy:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  const { id } = req.params;

  try {
    const galaxy = await Galaxy.findByPk(id);

    if (!galaxy) {
      return res.status(404).json({ error: "Galaxy not found" });
    }

    if (req.files && req.files.image) {
      const image = req.files.image;
      const basePath = `/uploads/galaxies/`;
      const uploadPath = `${__dirname}/../public${basePath}${image.name}`;
      image.mv(uploadPath, async err => {
        if (err) return res.status(500).send(err);
      });
      req.body.imageUrl = `${basePath}${image.name}`;
    }

    await galaxy.update(req.body);

    if (req.body.stars) {
      const newStarIds = req.body.stars
        .split(",")
        .map(id => parseInt(id.trim(), 10))
        .filter(id => !isNaN(id));
      await galaxy.setStars(newStarIds);
    } else {
      await galaxy.setStars([]);
    }

    if (req.accepts("html")) {
      return res.redirect(`/galaxies/${galaxy.id}`);
    }

    return res.status(200).json(galaxy);
  } catch (err) {
    console.error("Failed to update galaxy:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Populate the form to edit a single resource
const edit = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id, {
      include: [
        {
          model: Star,
        },
      ],
    });

    if (!galaxy) {
      return res.status(404).json({ error: "Galaxy not found" });
    }

    const starIds = galaxy.Stars.map(star => star.id);

    if (req.accepts("html")) {
      return res.render("pages/galaxies/update", { galaxy, starIds });
    }

    return res.status(200).json(galaxy);
  } catch (err) {
    console.error("Failed to fetch galaxy:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const galaxy = await Galaxy.findByPk(id);
    if (galaxy) {
      await galaxy.destroy();
      if (req.accepts("html")) {
        return res.status(204).redirect("/galaxies");
      } else {
        return res.status(204).json({ message: `Galaxy with ${id}deleted` });
      }
    } else {
      res.status(404).json({ error: "Galaxy not found" });
    }
  } catch (err) {
    console.error("Failed to delete galaxy:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, newForm, edit };

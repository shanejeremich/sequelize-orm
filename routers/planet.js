// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, planetCtlr.index);
router.get(`/new`, planetCtlr.newForm);
router.get(`/:id`, planetCtlr.show);
router.get(`/:id/edit`, planetCtlr.edit);
router.post(`/`, planetCtlr.create);
router.post(`/:id`, planetCtlr.update);
router.post(`/delete/:id`, planetCtlr.remove);

// export "router"
module.exports = router;

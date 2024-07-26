// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index);
router.get(`/new`, galaxyCtlr.newForm);
router.get(`/:id`, galaxyCtlr.show);
router.get(`/:id/edit`, galaxyCtlr.edit);
router.post(`/`, galaxyCtlr.create);
router.post(`/:id`, galaxyCtlr.update);
router.post(`/delete/:id`, galaxyCtlr.remove);

// export "router"
module.exports = router;

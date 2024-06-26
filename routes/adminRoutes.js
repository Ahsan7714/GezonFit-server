const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  getAllPendingPartners,
  approvePendingPartner,
  getAllActivePartners,
  deleteActivePartner,
  deletePendingPartner,
  getAllPendingEvents,
  updatePendingEvent,
  getAllActiveEvents,
  deletePendingEvent,
  deleteActiveEvent,
  getAllUsers,
  getTotalNoOfUsers,
  getTotalNoOfActivePartners,
  getAllNewsLetter,
  getAllContactUs
} = require("../controllers/adminController");

const {
  getAllPendingProducts,
  deletePendingProduct,
  updatePendingProduct,
  getAllActiveProducts,
  deleteActiveProduct,
  getAllPendingServices,
  deletePendingService,
  updatePendingService,
  getAllActiveServices,
  deleteActiveService,
  getAllActiveServicesNumber,
  getAllActiveProductsNumber
} = require("../controllers/postController");

// user count routes
router.route("/users").get(getAllUsers);
router.route("/total-users").get(getTotalNoOfUsers);
router.route("/total-active-partners").get(getTotalNoOfActivePartners);
router.route("/total-active-services").get(getAllActiveServicesNumber);
router.route("/total-active-products").get(getAllActiveProductsNumber);

// newsletter routes
router.route("/newsletters").get(getAllNewsLetter);

// contact us routes
router.route("/contact-us").get(getAllContactUs);


// partner routes
router.route("/pending-partners").get(getAllPendingPartners);
router.route("/approve-partner/:id").put(approvePendingPartner);
router.route("/active-partners").get(getAllActivePartners);
router.route("/delete-partner/:id").delete(deleteActivePartner);
router.route("/delete-pending-partner/:id").delete(deletePendingPartner);

// events routes
router.route("/pending-events").get(getAllPendingEvents);
router.route("/update-event/:id").put(updatePendingEvent);
router.route("/active-events").get(getAllActiveEvents);
router.route("/delete-event/:id").delete(deletePendingEvent);
router.route("/delete-active-event/:id").delete(deleteActiveEvent);

// products routes
router.route("/pending-products").get(getAllPendingProducts);
router.route("/delete-pending-product/:id").delete(deletePendingProduct);
router.route("/update-product/:id").put(updatePendingProduct);
router.route("/active-products").get(getAllActiveProducts);
router.route("/delete-active-product/:id").delete(deleteActiveProduct);

// services routes
router.route("/pending-services").get(getAllPendingServices);
router.route("/delete-pending-service/:id").delete(deletePendingService);
router.route("/update-service/:id").put(updatePendingService);
router.route("/active-services").get(getAllActiveServices);
router.route("/delete-active-service/:id").delete(deleteActiveService);

module.exports = router;

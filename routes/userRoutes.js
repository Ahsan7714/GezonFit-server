const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  postPendingPartner,
  getPendingPartners,
  deletePendingPartner,
  getActivePartners,
  sendMessage,
  getReceivedMessages,
  deleteActivePartner,
  postPendingEvent,
  getAllActiveEvents,
  createNewsletter,
  createContactUs,
  loadUserProfile,
} = require("../controllers/userController");
const {
  postPendingProduct,
  getAllPendingProductsOfUser,
  getActiveProductsOfUser,
  deleteActiveProduct,
  deletePendingProduct,
  getAllPendingServicesOfUser,
  createPendingService,
  deletePendingService,
  getAllActiveServicesOfUser,
  deleteActiveService,
  getAllActiveServices,
  postPendingBlog,
  getAllPendingBlogs,
  deletePendingBlog,
  getActiveBlogsOfUser,
  deleteActiveBlog,
  getAllActiveBlogs,
  getBlogById
} = require("../controllers/userPostController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

// newsletter route
router.route("/newsletter").post(createNewsletter);

// contact us route
router.route("/contact-us").post(createContactUs);

// partner  routes
router.route("/post-partner").post(isAuthenticatedUser, postPendingPartner);
router.route("/get-partner").get(isAuthenticatedUser, getPendingPartners);
router
  .route("/delete-partner/:id")
  .delete(isAuthenticatedUser, deletePendingPartner);

// active partner routes
router.route("/active-partners").get(isAuthenticatedUser, getActivePartners);
router
  .route("/delete-active-partner/:id")
  .delete(isAuthenticatedUser, deleteActivePartner);

// message route
router.post("/active-partners/message/:id", isAuthenticatedUser, sendMessage);
router.get("/messages/received", isAuthenticatedUser, getReceivedMessages);

// events routes
router.route("/post-event").post(isAuthenticatedUser, postPendingEvent);
router.route("/get-events").get( getAllActiveEvents);

// product routes
router.route("/post-product").post(isAuthenticatedUser, postPendingProduct);
router
  .route("/get-products")
  .get(isAuthenticatedUser, getAllPendingProductsOfUser);
router
  .route("/delete-product/:id")
  .delete(isAuthenticatedUser, deletePendingProduct);
router
  .route("/active-products")
  .get(isAuthenticatedUser, getActiveProductsOfUser);
router
  .route("/delete-active-product/:id")
  .delete(isAuthenticatedUser, deleteActiveProduct);

// services  routes
router.route("/post-service").post(isAuthenticatedUser, createPendingService);
router
  .route("/get-services")
  .get(isAuthenticatedUser, getAllPendingServicesOfUser);
router
  .route("/delete-service/:id")
  .delete(isAuthenticatedUser, deletePendingService);
router
  .route("/active-services")
  .get(isAuthenticatedUser, getAllActiveServicesOfUser);
router
  .route("/delete-active-service/:id")
  .delete(isAuthenticatedUser, deleteActiveService);
router
  .route("/all-active-services")
  .get(isAuthenticatedUser, getAllActiveServices);

  // blog routes
router.route("/post-blog").post(isAuthenticatedUser, postPendingBlog);
router.route("/get-blogs").get(isAuthenticatedUser, getAllPendingBlogs);
router
  .route("/delete-blog/:id")
  .delete(isAuthenticatedUser, deletePendingBlog);
router
  .route("/active-blogs")
  .get(isAuthenticatedUser, getActiveBlogsOfUser);
router
  .route("/delete-active-blog/:id")
  .delete(isAuthenticatedUser, deleteActiveBlog);
router
  .route("/all-active-blogs")
  .get( getAllActiveBlogs);
router
  .route("/blog/:id")
  .get( getBlogById);

// user profile route
router
  .route("/me")
  .get(isAuthenticatedUser, loadUserProfile);

module.exports = router;

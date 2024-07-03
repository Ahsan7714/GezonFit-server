const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const pendingProduct = require("../models/pendingProducts");
const activeProduct = require("../models/activeProducts");
const pendingService = require("../models/pendingService");
const activeService = require("../models/activeService");
const cloudinary = require("cloudinary").v2;
const ActiveBlogs = require("../models/ActiveBlogs");
const PendingBlogs = require("../models/PendingBlogs");

//post a pending product
exports.postPendingProduct = catchAsyncError(async (req, res, next) => {
  const {
    productName,
    productDetails,
    contact,
    address,
    category,
    price,
    description,
  } = req.body;
  const image = req.body.image

  
  const myCloud =  await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`, 
      resource_type: "auto",
      folder: "pendingProducts",
  })
  const imageUrl = myCloud.secure_url;

  const product = await pendingProduct.create({
    productName,
    productDetails,
    contact,
    address,
    category,
    price,
    description,
    user: req.user._id,
    image: imageUrl,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// get all active products
exports.getAllActiveProducts = catchAsyncError(async (req, res, next) => {
  const products = await activeProduct.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// get all pending products of logged in user
exports.getAllPendingProductsOfUser = catchAsyncError(
  async (req, res, next) => {
    const pendingproducts = await pendingProduct.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      pendingproducts,
    });
  }
);

// delete pending product of user that posted it
exports.deletePendingProduct = catchAsyncError(async (req, res, next) => {
  const product = await pendingProduct.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// get active products of logged in user
exports.getActiveProductsOfUser = catchAsyncError(async (req, res, next) => {
  const activeproducts = await activeProduct.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    activeproducts,
  });
});

// delete active product of user that posted it
exports.deleteActiveProduct = catchAsyncError(async (req, res, next) => {
  const product = await activeProduct.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// create a pending service
exports.createPendingService = catchAsyncError(async (req, res, next) => {
  const {
    serviceName,
    serviceDetails,
    contact,
    description,
    postalCode,
    rate,
  } = req.body;

  const image = req.body.image

  
  const myCloud =  await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`, 
      resource_type: "auto",
      folder: "pendingService",
  })
  const imageUrl = myCloud.secure_url;

  const service = await pendingService.create({
    serviceName,
    serviceDetails,
    contact,
    description,
    postalCode,
    rate,
    user: req.user._id,
    image: imageUrl,
  });

  res.status(200).json({
    success: true,
    service,
  });
});

// get all pending services of user that posted it 
exports.getAllPendingServicesOfUser = catchAsyncError(
  async (req, res, next) => {
    const pendingservices = await pendingService.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      pendingservices,
    });
  }
);

// delete pending service of user that posted it
exports.deletePendingService = catchAsyncError(async (req, res, next) => {
  const service = await pendingService.findByIdAndDelete(req.params.id);

  if (!service) {
    res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});

// get all active serives of user that posted it
exports.getAllActiveServicesOfUser = catchAsyncError(
  async (req, res, next) => {
    const services = await activeService.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      services,
    });
  }
);

// delete active service of user that posted it
exports.deleteActiveService = catchAsyncError(async (req, res, next) => {
  const service = await activeService.findByIdAndDelete(req.params.id);

  if (!service) {
    res.status(404).json({
      success: false,
      message: "Service not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});

// get all active services
exports.getAllActiveServices = catchAsyncError(async (req, res, next) => {
  const services = await activeService.find();

  res.status(200).json({
    success: true,
    services,
  });
});

// post a pending blog
exports.postPendingBlog = catchAsyncError(async (req, res, next) => {
  const { title, content, user } = req.body;
  const image = req.body.image


  const myCloud =  await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`, 
      resource_type: "auto",
      folder: "pendingBlogs",
  })
  const imageUrl = myCloud.secure_url;
  const pendingblog = await PendingBlogs.create({
    title,
    content,
    image: imageUrl,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    pendingblog,
  });
}
);

// get all pending blogs of logged in user
exports.getAllPendingBlogs = catchAsyncError(async (req, res, next) => {
  const pendingblogs = await PendingBlogs.find({ user: req.user._id });
  console.log(pendingblogs);
  res.status(200).json({
    success: true,
    pendingblogs,
  });
});

// delete pending blog of logged in user
exports.deletePendingBlog = catchAsyncError(async (req, res, next) => {
  const blog = await PendingBlogs.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// get active blogs of logged in user
exports.getActiveBlogsOfUser = catchAsyncError(async (req, res, next) => {
  const activeblogs = await ActiveBlogs.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    activeblogs,
  });
});

// delete active blog of logged in user
exports.deleteActiveBlog = catchAsyncError(async (req, res, next) => {
  const blog = await ActiveBlogs.findByIdAndDelete(req.params.id);
  if (!blog) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});

// get all active blogs
exports.getAllActiveBlogs = catchAsyncError(async (req, res, next) => {
  const blogs = await ActiveBlogs.find();
  res.status(200).json({
    success: true,
    blogs,
  });
});

// get blog by id
exports.getBlogById = catchAsyncError(async (req, res, next) => {
  const blogdetails = await ActiveBlogs.findById(req.params.id);
  if (!blogdetails) {
    res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }
  res.status(200).json({
    success: true,
    blogdetails,
  });
});
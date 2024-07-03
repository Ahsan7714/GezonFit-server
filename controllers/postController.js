const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const pendingProduct = require("../models/pendingProducts");
const activeProduct = require("../models/activeProducts");
const pendingService = require("../models/pendingService");
const activeService = require("../models/activeService");
const cloudinary = require("cloudinary").v2; // Import cloudinary
const ActiveBlogs = require("../models/ActiveBlogs");
const PendingBlogs = require("../models/PendingBlogs");

// get all pending products with user name
exports.getAllPendingProducts = catchAsyncError(async (req, res, next) => {
    const pendingproducts = await pendingProduct.find().populate("user", "name");
    res.status(200).json({
      success: true,
      pendingproducts,
    });
  }
);

// delete pending product
exports.deletePendingProduct = catchAsyncError(async (req, res, next) => {
    const product = await pendingProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);

// update status of pending product to active product
exports.updatePendingProduct = catchAsyncError(
    async (req, res, next) => {
        const product = await pendingProduct.findById(req.params.id);
    
        if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
        }
    
        product.status = "active";
        await product.save();
    
        await activeProduct.create({
        productName: product.productName,
        productDetails: product.productDetails,
        contact: product.contact,
        address: product.address,
        category: product.category,
        price: product.price,
        description: product.description,
        user: product.user,
        status : "active",
        image  : product.image,
        });

    
        await pendingProduct.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
        success: true,
        message: "Product updated successfully",
        });
    }
    );

// get all active products with user name
exports.getAllActiveProducts = catchAsyncError(async (req, res, next) => {
    const activeproducts = await activeProduct.find().populate("user", "name");
    res.status(200).json({
      success: true,
      activeproducts,
    });
  }
);

// get total number of active products
exports.getAllActiveProductsNumber = catchAsyncError(async (req, res, next) => {
    const products = await activeProduct.find();
    res.status(200).json({
      success: true,
      totalProducts: products.length,
    });
  }
);

// delete active product
exports.deleteActiveProduct = catchAsyncError(async (req, res, next) => {
    const product = await activeProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);

// get all pending services with user name
exports.getAllPendingServices = catchAsyncError(async (req, res, next) => {
    const pendingservices = await pendingService.find().populate("user", "name");
    res.status(200).json({
      success: true,
      pendingservices,
    });
  }
);

// delete pending service
exports.deletePendingService = catchAsyncError(async (req, res, next) => {
    const service = await pendingService.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  }
);

// update status of pending service to active service
exports.updatePendingService = catchAsyncError(
    async (req, res, next) => {
        const service = await pendingService.findById(req.params.id);
    
        if (!service) {
        return res.status(404).json({
            success: false,
            message: "Service not found",
        });
        }
    
        service.status = "active";
        await service.save();
    
        await activeService.create({
        serviceName: service.serviceName,
        serviceDetails: service.serviceDetails,
        contact: service.contact,
        postalCode: service.postalCode,
        rate: service.rate,
        description: service.description,
        user: service.user,
        image : service.image,
        status : "active"
        });
    
        await pendingService.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
        success: true,
        message: "Service updated successfully",
        });
    }
    );

    // get all active services with user name
exports.getAllActiveServices = catchAsyncError(async (req, res, next) => {
    const activeservices = await activeService.find().populate("user", "name");
    res.status(200).json({
      success: true,
      activeservices,
    });
  }
);
// get total number of active services
exports.getAllActiveServicesNumber = catchAsyncError(async (req, res, next) => {
    const services = await activeService.find();
    res.status(200).json({
      success: true,
      totalServices: services.length,
    });
  }
);
// delete active service
exports.deleteActiveService = catchAsyncError(async (req, res, next) => {
    const service = await activeService.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  }
);

// get all pending blogs with user name
exports.getAllPendingBlogs = catchAsyncError(async (req, res, next) => {
    const pendingblogs = await PendingBlogs.find().populate("user", "name");
    res.status(200).json({
      success: true,
      pendingblogs,
    });
  }
);
// delete pending blog
exports.deletePendingBlog = catchAsyncError(async (req, res, next) => {
    const blog = await PendingBlogs.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  }
);
// update status of pending blog to active blog
exports.updatePendingBlog = catchAsyncError(
    async (req, res, next) => {
        const blog = await PendingBlogs.findById(req.params.id);
    
        if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog not found",
        });
        }
    
        blog.status = "active";
        await blog.save();
    
        await ActiveBlogs.create({
        title: blog.title,
        content: blog.content,
        user: blog.user,
        image : blog.image,
        status : "active"
        });
    
        await PendingBlogs.findByIdAndDelete(req.params.id);
    
        res.status(200).json({
        success: true,
        message: "Blog updated successfully",
        });
    }
    );

// get all active blogs with user name
exports.getAllActiveBlogs = catchAsyncError(async (req, res, next) => {
    const activeblogs = await ActiveBlogs.find().populate("user", "name");
    res.status(200).json({
      success: true,
      activeblogs,
    });
  }
);
// delete active blog
exports.deleteActiveBlog = catchAsyncError(async (req, res, next) => {
    const blog = await ActiveBlogs.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  }
);
// post a active blog
exports.postActiveBlog = catchAsyncError(async (req, res, next) => {
    const { title, content } = req.body;
    const image = req.body.image;
  const myCloud =  await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`, 
      resource_type: "auto",
      folder: "activeBlogs",
  })
  const imageUrl = myCloud.secure_url;
    const activeblog = await ActiveBlogs.create({
      title,
      content,
      image: imageUrl,

    });
    res.status(201).json({
      success: true,
      activeblog,
    });
  }
);

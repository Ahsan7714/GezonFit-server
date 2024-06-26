const User = require("../models/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const pendingProduct = require("../models/pendingProducts");
const activeProduct = require("../models/activeProducts");
const pendingService = require("../models/pendingService");
const activeService = require("../models/activeService");

// get all pending products with user name
exports.getAllPendingProducts = catchAsyncError(async (req, res, next) => {
    const products = await pendingProduct.find().populate("user", "name");
    res.status(200).json({
      success: true,
      products,
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
        status : "active"
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
    const products = await activeProduct.find().populate("user", "name");
    res.status(200).json({
      success: true,
      products,
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
    const services = await pendingService.find().populate("user", "name");
    res.status(200).json({
      success: true,
      services,
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
    const services = await activeService.find().populate("user", "name");
    res.status(200).json({
      success: true,
      services,
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

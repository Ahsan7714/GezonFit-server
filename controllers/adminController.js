const pendingPartner = require('../models/pendingPartnerModel');
const User = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const activePartner = require('../models/activePartnerModel');
const pendingEvents = require('../models/pedingEvents');
const activeEvents = require('../models/activeEvents');
const pendingProduct = require("../models/pendingProducts");
const activeProduct = require("../models/activeProducts");
const pendingService = require("../models/pendingService");
const activeService = require("../models/activeService");
const NewsLetter = require('../models/newsletter');
const ContactUs = require('../models/contactUs');
const cloudinary = require("cloudinary").v2; // Import cloudinary



// get all users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});
// get total no of users
exports.getTotalNoOfUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        totalUsers: users.length
    });
});



// get all pending partners
exports.getAllPendingPartners = catchAsyncError(async (req, res, next) => {
    const pendingpartners = await pendingPartner.find();
    res.status(200).json({
        success: true,
        pendingpartners
    });
});

// delete pending partner
exports.deletePendingPartner = catchAsyncError(async (req, res, next) => {
    const pendingPartners = await pendingPartner.findById(req.params.id);
    if (!pendingPartners) {
        return res.status(404).json({
            success: false,
            message: "Pending partner not found"
        });
    }
    await pendingPartner.findByIdAndDelete(pendingPartners);
    res.status(200).json({
        success: true,
        message: "Pending partner deleted successfully"
    });
});

// approve pending partner
exports.approvePendingPartner = catchAsyncError(async (req, res, next) => {
    const pendingPartners = await pendingPartner.findById(req.params.id);
    if (!pendingPartners) {
        return res.status(404).json({
            success: false,
            message: "Pending partner not found"
        });
    }
    const user = await User.findById(pendingPartners.user);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    const activePartners = new activePartner({
        name: pendingPartners.name,
        age: pendingPartners.age,
        gender: pendingPartners.gender,
        city: pendingPartners.city,
        route: pendingPartners.route,
        startTime: pendingPartners.startTime,
        endTime: pendingPartners.endTime,
        category: pendingPartners.category,
        image: pendingPartners.image,
        description: pendingPartners.description,
        user: pendingPartners.user,
        status: "active"
    });
    await activePartners.save();
    // delete pending partner
    await pendingPartner.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Pending partner approved successfully"
    });
}
);

// get all active partners
exports.getAllActivePartners = catchAsyncError(async (req, res, next) => {
    const activepartners = await activePartner.find();
    res.status(200).json({
        success: true,
        activepartners
    });
}
);

// get total no of active partners
exports.getTotalNoOfActivePartners = catchAsyncError(async (req, res, next) => {
    const activePartners = await activePartner.find();
    res.status(200).json({
        success: true,
        totalPartners: activePartners.length
    });
}
);

// delete active partner
exports.deleteActivePartner = catchAsyncError(async (req, res, next) => {
    const activePartners = await activePartner.findById(req.params.id);
    if (!activePartners) {
        return res.status(404).json({
            success: false,
            message: "Active partner not found"
        });
    }
    await activePartner.findByIdAndDelete(activePartners);
    res.status(200).json({
        success: true,
        message: "Active partner deleted successfully"
    });
}
);

// get all pending events including user name

exports.getAllPendingEvents = catchAsyncError(async (req, res, next) => {
    const pendingevents = await pendingEvents.find().populate('user', 'name');
    res.status(200).json({
        success: true,
        pendingevents
    });
}
);

// update status of pending event
exports.updatePendingEvent = catchAsyncError(async (req, res, next) => {
    const pendingEvent = await pendingEvents.findById(req.params.id);
    if (!pendingEvent) {
        return res.status(404).json({
            success: false,
            message: "Pending event not found"
        });
    }
    const activeEvent = new activeEvents({
        title: pendingEvent.title,
        image: pendingEvent.image,
        time: pendingEvent.time,
        date: pendingEvent.date,
        location: pendingEvent.location,
        description: pendingEvent.description,
        user: pendingEvent.user,
        image : pendingEvent.image,
        status: "active"
    });
    await activeEvent.save();
    // delete pending event
    await pendingEvents.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "Pending event updated successfully"
    });
}
);

// delete pending event
exports.deletePendingEvent = catchAsyncError(async (req, res, next) => {
    const pendingEvent = await pendingEvents.findById(req.params.id);
    if (!pendingEvent) {
        return res.status(404).json({
            success: false,
            message: "Pending event not found"
        });
    }
    await pendingEvents.findByIdAndDelete(pendingEvent);
    res.status(200).json({
        success: true,
        message: "Pending event deleted successfully"
    });
}
);
// post a active event
exports.postActiveEvent = catchAsyncError(async (req, res, next) => {
    const { title,  time, date, location, description } = req.body;
    
  const image = req.body.image

  
  const myCloud =  await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`, 
      resource_type: "auto",
      folder: "activeEvents",
  })
  const imageUrl = myCloud.secure_url;
    const activeEvent = await activeEvents.create({
        title,
        image: imageUrl,
        time,
        date,
        location,
        description,
    });
    res.status(200).json({
        success: true,
        activeEvent
    });
}
);

// get all active events
exports.getAllActiveEvents = catchAsyncError(async (req, res, next) => {
    const activeevents = await activeEvents.find().populate('user', 'name');
    res.status(200).json({
        success: true,
        activeevents
    });
}
);

// delete active event
exports.deleteActiveEvent = catchAsyncError(async (req, res, next) => {
    const activeEvent = await activeEvents.findById(req.params.id);
    if (!activeEvent) {
        return res.status(404).json({
            success: false,
            message: "Active event not found"
        });
    }
    await activeEvents.findByIdAndDelete(activeEvent);
    res.status(200).json({
        success: true,
        message: "Active event deleted successfully"
    });
}
);

// get all news letter
exports.getAllNewsLetter = catchAsyncError(async (req, res, next) => {
    const newsletter = await NewsLetter.find();
    res.status(200).json({
        success: true,
        newsletter
    });
}
);
// delete all newsletters
exports.deleteAllNewsLetter = catchAsyncError(async (req, res, next) => {
    await NewsLetter.deleteMany();
    res.status(200).json({
        success: true,
        message: "All newsletters deleted successfully"
    });
}
);

//get all contact us
exports.getAllContactUs = catchAsyncError(async (req, res, next) => {
    const contactUs = await ContactUs.find();
    res.status(200).json({
        success: true,
        contactUs
    });
}
);
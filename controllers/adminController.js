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
        total: users.length
    });
});



// get all pending partners
exports.getAllPendingPartners = catchAsyncError(async (req, res, next) => {
    const pendingPartners = await pendingPartner.find();
    res.status(200).json({
        success: true,
        pendingPartners
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
    const allActivePartners = await activePartner.find();
    res.status(200).json({
        success: true,
        allActivePartners
    });
}
);

// get total no of active partners
exports.getTotalNoOfActivePartners = catchAsyncError(async (req, res, next) => {
    const activePartners = await activePartner.find();
    res.status(200).json({
        success: true,
        total: activePartners.length
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
    const pendingEvent = await pendingEvents.find().populate('user', 'name');
    res.status(200).json({
        success: true,
        pendingEvent
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

// get all active events
exports.getAllActiveEvents = catchAsyncError(async (req, res, next) => {
    const activeEvent = await activeEvents.find();
    res.status(200).json({
        success: true,
        activeEvent
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
    const newsLetter = await NewsLetter.find();
    res.status(200).json({
        success: true,
        newsLetter
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
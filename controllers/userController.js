const pendingPartner = require('../models/pendingPartnerModel');
const User = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const activePartner = require('../models/activePartnerModel');
const AcceptInvite = require('../models/AcceptInvite');
const pendingEvents = require('../models/pedingEvents');
const activeEvents = require('../models/activeEvents');
const NewsLetter = require('../models/newsletter');
const ContactUs = require('../models/contactUs');
const cloudinary = require("cloudinary").v2; // Import cloudinary
const Conversation = require('../models/Conversation');

// register a user 
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Create a new user
    const user = await User.create({
        name,
        email,
        password,
    });

    // Find or create the community conversation
    let conversation = await Conversation.findOne({ type: "community" });

    if (!conversation) {
        conversation = new Conversation({ type: "community", members: [] });
    }

    // Add the new user to the community conversation
    conversation.members.push(user._id);
    await conversation.save();

    // Send token in cookie
    sendToken(user, 200, res, "User registered successfully");
});
// login a user
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // check if email and password is entered by user
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please enter email & password',
        });
    }

    // finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Email or Password',
        });
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Email or Password',
        });
    }

    // send token in cookie
    sendToken(user, 200, res , message = "User logged in successfully");
});

// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
});

// post  a pending partner
exports.postPendingPartner = catchAsyncError(async (req, res, next) => {
    const { name, age, gender, city, route, startTime, endTime, category,  description } = req.body;

    // Debugging statement to verify user
    const image = req.body.image

  
    const myCloud =  await cloudinary.uploader.upload(image, {
        public_id: `${Date.now()}`, 
        resource_type: "auto",
        folder: "pendingPartners",
    })
    const imageUrl = myCloud.secure_url;

    const pendingPartners = new pendingPartner({
        name,
        age,
        gender,
        city,
        route,
        startTime,
        endTime,
        category,
        description,
        user: req.user._id, // Set the user reference
        image: imageUrl,
    });

    await pendingPartners.save();

    res.status(201).json({
        success: true,
        pendingPartners,
        message: "Pending partner created successfully",
    });
}
);
// get pending partners of logged in user
exports.getPendingPartners = catchAsyncError(async (req, res, next) => {
    const pendingPartners = await pendingPartner.find({ user: req.user.id });
    res.status(200).json({
        success: true,
        pendingPartners,
        message: "Pending partners fetched successfully",
    });
}
);

// delete a pending partner
exports.deletePendingPartner = catchAsyncError(async (req, res, next) => {
    const pendingPartnerToDelete = await pendingPartner.findByIdAndDelete(req.params.id);

    if (!pendingPartnerToDelete) {
        return res.status(404).json({
            success: false,
            message: 'Pending partner not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Pending partner deleted successfully',
    });
}
);

// get active partners of logged in user
exports.getActivePartners = catchAsyncError(async (req, res, next) => {
    const activePartners = await activePartner.find({ user: req.user.id });
    res.status(200).json({
        success: true,
        activePartners,
        message: "Active partners fetched successfully",
    });
}
);
// delete a active partner
exports.deleteActivePartner = catchAsyncError(async (req, res, next) => {
    const activePartnerToDelete = await activePartner.findByIdAndDelete(req.params.id);

    if (!activePartnerToDelete) {
        return res.status(404).json({
            success: false,
            message: 'Active partner not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Active partner deleted successfully',
    });
}
);

// Send message to post creator
exports.sendMessage = catchAsyncError(async (req, res, next) => {
    const {name, contactInfo, message } = req.body;

    const ActivePartner = await activePartner.findById(req.params.id);
    if (!ActivePartner) {
        return res.status(404).json({
            success: false,
            message: "Active partner post not found"
        });
    }

    const newMessage = new AcceptInvite({
        sender: req.user.id,
        receiver: ActivePartner.user,
        activePartner: ActivePartner._id,
        name,
        contactInfo,
        message
    });

    await newMessage.save();

    res.status(200).json({
        success: true,
        message: "Message sent successfully"
    });
});

// Get messages received by the user
exports.getReceivedMessages = catchAsyncError(async (req, res, next) => {
    const userActivePartners = await activePartner.find({ user: req.user.id }).select('_id');
    const activePartnerIds = userActivePartners.map(ap => ap._id);

    const acceptedInvites = await AcceptInvite.find({ activePartner: { $in: activePartnerIds } })
        .populate('sender', 'email')
        .populate('activePartner', 'name');

    res.status(200).json({
        success: true,
        acceptedInvites
    });
});

// post a pending event
exports.postPendingEvent = catchAsyncError(async (req, res, next) => {
    const {title , date , location , description , time  } = req.body;
    const image = req.body.image

  
    const myCloud =  await cloudinary.uploader.upload(image, {
        public_id: `${Date.now()}`, 
        resource_type: "auto",
        folder: "pendingEvents",
    })
    const imageUrl = myCloud.secure_url;

    const pendingEvent = new pendingEvents({
        title , date , location , description , time,
        image: imageUrl, 
        user: req.user._id // Set the user reference
    });

    await pendingEvent.save();

    res.status(201).json({
        success: true,
        pendingEvent,
        message: "Pending event created successfully",
    });
}
);

// get all active events

exports.getAllActiveEvents = catchAsyncError(async (req, res, next) => {
    const activeEvent = await activeEvents.find();
    res.status(200).json({
        success: true,
        activeEvent,
        message: "Active events fetched successfully",
    });
}
);

// create a newsletter
exports.createNewsletter = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    // check if email is already subscribed
    const isEmailExists = await NewsLetter.findOne({ email });
    if (isEmailExists) {
        return res.status(400).json({
            success: false,
            message: 'Email already subscribed',
        });
    }
    const newsletter = new NewsLetter({
        email,
    });

    await newsletter.save();

    res.status(201).json({
        success: true,
        newsletter,
        message: "Newsletter created successfully",
    });
}
);

// create a contact us
exports.createContactUs = catchAsyncError(async (req, res, next) => {
    const { name, email, message } = req.body;

    const contactUs = new ContactUs({
        name,
        email,
        message,
    });

    await contactUs.save();

    res.status(201).json({
        success: true,
        contactUs,
        message: "Contact us created successfully",
    });
}
);

// load user profile
exports.loadUserProfile = catchAsyncError(async (req, res, next) => {
    // Get the user ID from the request parameters or authentication token
    const userId = req.params.userId || req.user._id;

    // Check if the user exists
    const user = await User.findById(userId );
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    // Send response with user's profile
    res.status(200).json({
        success: true,
        user,
    });
} );
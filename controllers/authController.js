import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;


const userExists = await User.findOne({ email });

if (userExists) {
  return res.status(400).json({
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

res.status(201).json({
  message: "User Registered Successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Login User
export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;


const user = await User.findOne({ email });

if (!user) {
  return res.status(400).json({
    message: "Invalid Credentials",
  });
}

const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid Credentials",
  });
}

const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login Successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};

// Get Profile
export const getProfile = async (req, res) => {
res.status(200).json({
user: req.user,
});
};

// Update Profile
export const updateProfile = async (req, res) => {
try {
const user = await User.findByIdAndUpdate(
req.user.id,
req.body,
{ new: true }
);


res.status(200).json(user);

} catch (error) {
res.status(500).json({
message: "Profile update failed",
});
}
};

// Change Password
export const changePassword = async (
req,
res
) => {
try {
const { oldPassword, newPassword } =
req.body;


const user = await User.findById(
  req.user.id
);

const isMatch = await bcrypt.compare(
  oldPassword,
  user.password
);

if (!isMatch) {
  return res.status(400).json({
    message:
      "Old password is incorrect",
  });
}

const salt =
  await bcrypt.genSalt(10);

user.password =
  await bcrypt.hash(
    newPassword,
    salt
  );

await user.save();

res.status(200).json({
  message:
    "Password changed successfully",
});

} catch (error) {
res.status(500).json({
message:
"Password change failed",
});
}
};
export const getAllUsers =
async (req, res) => {

try {

const users =
await User.find()
.select('-password');

res.status(200).json(
users
);

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

export const toggleAdmin =
async (req, res) => {

try {

const user =
await User.findById(
req.params.id
);

if (!user) {
return res.status(404).json({
message:
'User not found',
});
}

user.isAdmin =
!user.isAdmin;

await user.save();

res.status(200).json({
message:
'Role Updated',
});

} catch (error) {

res.status(500).json({
message:
error.message,
});

}

};

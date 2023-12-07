const address = require("../Models/address.model");
const User = require("../Models/user.model");

exports.addAddress = async (req, res) => {
  try {
    // Check zip code format
    const zipCode = req.body.zipCode;
    if (!/^\d{6}$/.test(zipCode)) {
      return res.status(400).json({ message: "Invalid zip code!" });
    }

    // Check contact number format
    const contactNumber = req.body.phone;
    if (!/^\d{10}$/.test(contactNumber)) {
      return res.status(400).json({ message: "Invalid contact number!" });
    }

    const addAddressObj = {
      addressId: req.body.addressId,
      name: req.body.name,
      phone: contactNumber,
      street: req.body.street,
      landmark: req.body.landmark,
      city: req.body.city,
      state: req.body.state,
      zipCode: zipCode,
    };

    const createdAddress = await address.create(addAddressObj);

    const userInfo = await User.findOne({ userId: req.userId });

    // Create the response object
    const addressWithUser = {
      addressId: createdAddress.addressId,
      name: createdAddress.name,
      contactNumber: createdAddress.phone,
      street: createdAddress.street,
      landmark: createdAddress.landmark,
      city: createdAddress.city,
      state: createdAddress.state,
      zipCode: createdAddress.zipCode,
      createdAt: createdAddress.createdAt,
      updatedAt: createdAddress.updatedAt,
      user: userInfo, // Attach user information to the response
    };

    return res.status(201).json(addressWithUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error while adding address" });
  }
};

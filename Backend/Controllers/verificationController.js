const { response } = require("express");
const Verification = require("../models/database").verification;
const bcryptjs = require("bcryptjs");
const { users } = require("../models/database");

const verifyLink = async (request, response) => {
    console.log(request.params);
    const { userId, verifyString } = request.params;
    try {
        const result = await Verification.findOne({ userId: userId });

        if (result.length < 0 ) {
            return response.status(404).send("Verification not found");
        }

        const { expiresAt, _id, verificationString } = result;

        if (expiresAt < Date.now()) {
            await Verification.findByIdAndDelete(_id);
            return response.status(400).send("Verification link has expired");
        }

        const isVerified = bcryptjs.compareSync(verifyString, verificationString);
        if (!isVerified) {
            return response.status(400).send("Invalid verification string");
        }

        const updatedUser = await users.findByIdAndUpdate(userId, { Verified: true });
        if (!updatedUser) {
            return response.status(500).send("Failed to update user");
        }

        // await Verification.findByIdAndDelete(_id);
        return response.status(200).send({ error: false, message: "Verification successful" });
    } catch (error) {
        console.error("Error during verification:", error);
        return response.status(500).send({message:`Internal Server Error as ${error}`});
    }
}

module.exports = { verifyLink };

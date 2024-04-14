const { response } = require("express");
const Verification = require("../models/database").verification;
const bcryptjs = require("bcryptjs");
const { users } = require("../models/database");
const path = require('path');
 
const verifyLink = async (request, response) => {
    console.log(request.params);
    const { userId, verifyString } = request.params;
    const dirName=__dirname.split("/");
    dirName.pop();
    const mainPath=dirName.join("/");
    try {
        const result = await Verification.findOne({ userId: userId });
        console.log(result)
        if (!result || result.length < 0 ) {
            return response.sendFile(path.join(mainPath, '/public/static/verificationError.html'))
        }

        const { expiresAt, _id, verificationString } = result;

        if (expiresAt < Date.now()) {
            await Verification.findByIdAndDelete(_id);
            return response.sendFile(path.join(mainPath, '/public/static/verificationError.html'))
        }

        const isVerified = bcryptjs.compareSync(verifyString, verificationString);
        if (!isVerified) {
            return response.sendFile(path.join(mainPath, '/public/static/verificationError.html'))
        }

        const updatedUser = await users.findByIdAndUpdate(userId, { Verified: true });
        if (!updatedUser) {
            return response.sendFile(path.join(mainPath, '/public/static/verificationError.html'))
        }

        await Verification.findByIdAndDelete(_id);
        // return response.status(200).send({ error: false, message: "Verification successful" });
        return response.sendFile(path.join(mainPath, '/public/static/verificationSucess.html'))
    } catch (error) {
        console.error("Error during verification:", error);
        return response.status(500).send({message:`Internal Server Error as ${error}`});
    }
}

module.exports = { verifyLink };

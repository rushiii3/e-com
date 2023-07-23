const sendToken = (user,statscode,res) => {
    const token = user;
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly:true,
    }
    res.status(statscode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
}

module.exports = sendToken;
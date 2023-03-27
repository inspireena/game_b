const constant=require("../../utity/constant/constant")
module.exports = (app) => {
    app.use(`/${constant.MIDDLE_URL.STR_MIDDLE}`, require('./streamerRouter'));
};
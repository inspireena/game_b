const constant=require("../../../utity/constant/constant");

console.log("-----`/${constant.MIDDLE_URL.NODE_STR_MIDDLE}`--",`/${constant.MIDDLE_URL.NODE_STR_MIDDLE}`);
module.exports = (app) => {
    app.use(`/${constant.MIDDLE_URL.NODE_STR_MIDDLE}`, require('./streamerRouter'));
};
const Joi = require('joi');

exports.loginJoiSchema = Joi.object({
    email:Joi.string().required().email(),
    password: Joi.string().required(),
});

// exports.gameStreamerInfoJoiSchema=Joi.object({
//     game_code:Joi.string().optional()
// })
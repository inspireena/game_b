const Joi = require('joi');

exports.loginJoiSchema = Joi.object({
    email:Joi.string().required().email(),
    password: Joi.string().required(),
});
exports.changeStreamerTableColorJoiSchema= Joi.object({
    table_color:Joi.string().required()
})
exports.updateStreamerInfoJoiSchema=Joi.object({
    email:Joi.string().email().required(),
    phone:Joi.string().min(10).max(10).required(),
    pathname:Joi.string().optional(),
    streamer_name:Joi.string().required(),
    displayname:Joi.string().required(),
    dateofbirth:Joi.string().isoDate().optional(),
    luckyno:Joi.string().optional(),
    description:Joi.string().optional()
});
exports.uploadSteamerVideoJoiSchema=Joi.object({
    group_id:Joi.string().required().invalid('undefined',"null"),
    title:Joi.string().required(),
    type:Joi.string().valid('betting','rotation','decision').required(),
    pathname:Joi.string().optional(),
    video_info:Joi.string().optional(),
    description:Joi.string().optional(),
});
exports.fileJoiSchema=Joi.object({
   filename:Joi.string().required(),
   fieldname:Joi.string().optional(),
   originalname:Joi.string().optional(),
   encoding:Joi.string().optional(),
   mimetype:Joi.string().optional(),
   destination:Joi.string().optional(),
   path:Joi.string().optional(),
   size:Joi.number().optional(),
});

exports.deleteStreamerVideoJoiSchema=Joi.object({
    video_id:Joi.string().required(),
    group_id:Joi.string().required()
})
exports.blockPlayerChetJoiSchema=Joi.object({
    player_id:Joi.string().required(),
    block:Joi.string().optional(),
    addicted:Joi.string().optional()
})
exports.group_idJoiSchema=Joi.object({
    group_id:Joi.string().required()
})
exports.uriJoiSchema=Joi.object({
    url:Joi.string().uri()
})
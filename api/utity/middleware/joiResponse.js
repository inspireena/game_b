const Joi = require("joi");

module.exports = (schema, params = "body") => async (req, res, next) => {
    try {
        console.log(req.body);
        const check = await schema.validate(req[params]);

        console.log("--check--",check)
        if (check.error) {
            res.status(200).json({
                status: false,subCode:405,
                message: check.error.details[0].message,
            })
        } else {
            next();
        }

    } catch (error) {
        console.log("--validator==error===>", error)
    }
}
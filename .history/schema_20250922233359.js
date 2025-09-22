const joi = require('joi');

module.exports.listingSchema =joi.object({
    listing :joi.object({
        title: joi .string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("",null),

    }).required()
});

module.exports.reviewSchema = joi.object({
    review: Joi.object({
        rating:Joi.number().required(),
        comment: Joi.string().required(),
    }).required,
})
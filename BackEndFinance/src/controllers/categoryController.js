const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.category_create_post = [
    body('category_name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('O nome da categoria é obrigatório.')
        .escape(),
    body('category_type')
        .trim()
        .isIn(['receita', 'despesa'])
        .withMessage('O tipo da categoria deve ser exatamente "receita" ou "despesa".')
        .escape(),
    body('cor_hex')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 4, max: 7 })
        .withMessage('A cor deve ser um código Hexadecimal (ex: #FF0000).')
        .escape(),

    asyncHandler(async (req, res) => {
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Falha na validação dos dados', 
                detalhes: errors.array()
            });
        }

        const { category_name, category_type, cor_hex } = req.body;

        const category = new Category({
            user_id: req.userId,
            category_name,
            category_type,
            cor_hex
        });
      
        await category.save();
        
        return res.status(201).json(category);
    })
];

exports.category_list_get = asyncHandler(async(req, res) => {

    const categories = await Category.find({ user_id: req.userId })
                                     .sort({ category_name: 1 })
                                     .exec();
    
    return res.status(200).json(categories);
});

const Category = require('../models/Category')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Transaction = require('../models/Transactions')

// CRIAR CATEGORIA
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

        // VERIFICAR SE NOME DA CATEGORIA JÁ EXISTE
        const nomeExiste = await Category.findOne({
            user_id: req.userId,
            category_name: { $regex: new RegExp("^" + category_name + "$", "i") }
        });
        if (nomeExiste) return res.status(400).json({ error: 'Você já possui uma categoria com este nome!' });

        // VERIFICAR SE JÁ ESCOLHEU ESSA COR NA CATEGORIA
        const corExiste = await Category.findOne({ user_id: req.userId, cor_hex });
        if (corExiste) return res.status(400).json({ error: 'Você já escolheu esta cor para outra categoria. Tente outra!' });

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

// LISTAR CATEGORIAS
exports.category_list_get = asyncHandler(async (req, res) => {

    const categories = await Category.find({ user_id: req.userId })
        .sort({ category_name: 1 })
        .exec();

    return res.status(200).json(categories);
});

// ATUALIZAR CATEGORIA
exports.category_update_put = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
        { _id: id, user_id: req.userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });
    res.status(200).json(category);
});

// DELETAR CATEGORIA
exports.category_delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id, user_id: req.userId });
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });

    await Transaction.updateMany(
        { category_id: id, user_id: req.userId },
        { $unset: { category_id: 1 } }
    );

    res.status(200).json({ message: 'Categoria excluída e transações desvinculadas.' });
});

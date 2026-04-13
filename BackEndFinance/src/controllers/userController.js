const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require('jsonwebtoken')

// MOSTRANDO A LISTA DE USUÁRIOS
exports.user_create_list = asyncHandler(async(req, res, next) => {
    const users = await User.find().exec();
    
    res.json(users);
})

exports.user_create_post = [
body('name')
    .trim()
    .isLength({min: 1})
    .escape()
    .withMessage('O Nome do usuário deve ser especificado')
    .isAlphanumeric()
    .withMessage('O nome do usuário não pode conter caracteres alfanuméricos'),
body('email')
    .trim()
    .isLength({min: 11})
    .escape()
    .withMessage('Email deve ser especificado')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .withMessage('Por favor insira um email válido'),
body('password')
    .trim()
    .isLength({ min: 6 })
    .escape()
    .withMessage('A senha deve ser especificada'),

    asyncHandler(async(req, res, next) => {
    const username = await User.findOne({ name: req.body.name }).exec();
    const email = await User.findOne({ email: req.body.email }).exec();
    const phone = await User.findOne({ phone: req.body.phone }).exec();

    // if (username) {
    //   return res.status(400).json({ error: 'Username already exists!' });
    // } // PODE TER USUÁRIO COM NOMES IGUAIS
    if(email) {
      return res.status(400).json({ error: 'Email já existe!' });
    }

    const errors = validationResult(req);

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User ({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
    });

    if(!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    await user.save();

    res.status(200).json({ message: 'Usuário criado com sucesso!' });
  }
  )  
];

// LOGIN USER
exports.user_login_post = asyncHandler(async(req, res, next) => {
    try{
        const {email, password} = req.body

        const user = await User.findOne({ email }).select('+password').exec()

        if(!user) {
            return res.status(401).json({ error: 'Email ou senha inválidos!' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
        res.status(400).json({message: 'Senha inválida'});
        return;
        }

        const token = jwt.sign(
          { id: user._id },

          process.env.JWT_SECRET,

          { expiresIn: '1d' }
        )

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000 // 1 dia em milissegundos
        })

        return res.status(200).json({
          message: 'Login realizado com sucesso!',
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        })

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// BUSCAR O PERFIL DO USUÁRIO LOGADO
exports.user_profile_get = asyncHandler(async(req, res) => {
    const user = await User.findById(req.userId).exec()

    if(!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' })
    }

    // RETORNANDO OS DADOS DO USUÁRIO PARA O FRONT-END CONSUMIR
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    })
})

// SAIR DA CONTA
exports.user_logout_post = (req, res) => {
  res.clearCookie('token')

  res.status(200).json({ message: 'Logout realizado com sucesso!' })
}
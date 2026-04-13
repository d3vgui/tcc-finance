const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // PEGANDO O TOKEN ARMAZENADO NO COOKIES
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ error: 'Acesso negado. Faça o login para continuar.' })
    }

    // VALIDANDO O TOKEN E GUARDANDO PARA A PRÓXIMA ROTA USAR
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decode.id

        return next()
    }
    catch {
        return res.status(401).json({ error: 'Sessão inválida ou expirada. Faça login novamente.' });
    }
}
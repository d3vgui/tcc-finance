const User = require('../models/User')

module.exports = async(req, res, next) => {
    try {
        const user = await User.findById(req.userId).exec();

        // VERIFICA SE O USUÁRIO EXISTE E SE É ADMIN
        if (!user || user.role !== 'admin') {
            return res.status(403).json({
                error: 'Acesso negado. Apenas administradores podem acessar essa rota.'
            })
        }

        next()
    }
    catch {
        console.error(error);
        res.status(500).json({ error: 'Erro ao verificar permissões de administrador.' });
    }
}
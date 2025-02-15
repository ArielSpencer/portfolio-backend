const jwt = require('jsonwebtoken');

exports.verifyAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Não autenticado' });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    return res.status(401).json({ error: 'Erro na verificação de autenticação' });
  }
};
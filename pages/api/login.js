import jwt from 'jsonwebtoken';

const login = (req, res) => {
  const { username, password } = req.body;

  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed'
    });
  }

  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      success: true,
      token,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid Credentials',
    });
  } 
}

export default login;
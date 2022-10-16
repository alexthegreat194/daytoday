import jwt from 'jsonwebtoken';
import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (req.method !== 'POST') {
    res.status(405).json({
      message: 'Method not allowed'
    });
  }

  if (username === '' || password === '') {
    res.status(400).json({
      success: false,
      message: 'Please fill out all fields',
    });
  }

  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email: username }]
    }
  });

  if (!foundUser) {
    return res.status(400).json({
      success: false,
      message: 'incorrect username or password',
    });
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    res.status(400).json({
      success: false,
      message: 'incorrect password',
    });
  }

  const token = jwt.sign({
    username: foundUser.username,
    id: foundUser.id,
  }, process.env.JWT_SECRET, { expiresIn: '10h' });
  res.json({
    success: true,
    token,
  });
}

export default login;
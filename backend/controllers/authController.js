  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const sendEmail = require('../utils/sendEmail');

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


  exports.signup = async (req, res) => {

    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await prisma.user.create({
      data: { name, email, password: hashedPassword, otp },
    });

    
    await sendEmail(email, 'Your OTP', `Your verification OTP is: ${otp}`);
    res.status(200).json({ msg: 'Signup successful. Please verify your email.' });

  };

  exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ msg: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ msg: 'Invalid OTP' });

    await prisma.user.update({
      where: { email },
      data: { verified: true, otp: null },
    });

    // Generate JWT token after successful verification
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      msg: 'Email verified successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  };

  exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ msg: 'User not found' });
    if (!user.verified) return res.status(403).json({ msg: 'Please verify your email' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: 'Invalid password' });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        msg: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

  };


  
  

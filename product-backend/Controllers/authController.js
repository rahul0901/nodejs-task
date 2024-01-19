import UserModals from "../Modals/User.Modals.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {

    try {

        const { userName, userEmail, userPassword, userNumber } = req.body;

        if (!userName || !userEmail || !userPassword || !userNumber) {
            return res.status(404).json({ success: false, message: 'All fields required..' })
        }

        const hashedPassword = await bcrypt.hash(userPassword, 10);

        const user = await UserModals({
            name: userName,
            email: userEmail,
            password: hashedPassword,
            number: userNumber,
        });

        if (!user) return res.status(404).json({ success: false, message: 'User not found!' });

        const emailPresent = UserModals.findOne({ email: userEmail });

        if (emailPresent) return res.status(404).json({ success: false, message: 'Email id is already registered!' });

        const numberPresent = UserModals.findOne({ number: userNumber });

        if (numberPresent) return res.status(404).json({ success: false, message: 'Email id is already registered!' });

        await user.save();

        return res.status(200).json({ success: true, message: 'Succesfully Registered', error: error.message });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Register Error', error: error.message });
    }
}

export const Login = async (req, res) => {

    try {

        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            return res.status(404).json({ success: false, message: 'All fields required..' });
        }

        const user = UserModals.findOne({ email: userEmail });

        if (!user) return res.status(404).json({ success: false, message: 'Email id not found!' });

        const checkPassword = await bcrypt.compare(userPassword, user.password);

        if (!checkPassword) return res.status(404).json({ success: false, message: 'Password not matched!' });

        const token = jwt.sign({ id: user._id }, process.env.JWTSecret);

        return res.status(200).json({ success: true, message: 'Login Successful!', user: { username: user.name, id: user._id }, token });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Login Error', error: error.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {

        const { token } = req.body;

        if(!token) return res.status(401).json({success: false, message:'Token Required!'});

        const { id } = await jwt.verify(token, process.env.JWTSecret);

        if(!id) return res.status(401).json({success: false, message:'Id Not Found'});

        const user = await UserModals.findById(id);

        if(!user) res.status(401).json({success: false, message:'User Not Found'});

        return res.status(200).json({success: true, user})

    } catch (error) {
        return res.status(500).json({ success: false, message: 'User not found!', error: error.message });
    }
}
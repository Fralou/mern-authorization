const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {createHash, compare} = require('../helpers/security');
const {validatePassword} = require('../helpers/validator');

const signIn = async function (req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({error: 'Please provide email and password'})
    }
    const user = await User.findOne({email});
    if (user) {
        const [error, equal] = await compare(password, user.password);
        if (error) {
            return res.status(500).json({error})
        }
        if (!equal) {
            return res.status(403).json({error: 'Wrong email or password'})
        }
        const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1d'});
        return res.status(200).json({token: `Bearer ${token}`})
    }
    return res.status(403).json({error: 'Wrong email or password'})
};
module.exports.signIn = signIn;

const signUp = async function (req, res) {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({error: 'Please provide email and password'})
    }
    const user = await User.findOne({email});
    if (user) {
        return res.status(400).json({error: 'User with this email already exists'})
    }
    if(!validatePassword(password)){
        return res.status(400).json({error: 'Password doesn\'t match regex pattern'})
    }
    const [error, hash] = await createHash(password);
    if (error) {
        return res.status(500).json({error})
    }
    try {
        const newUser = User.create({email, password: hash});
    }
    catch (error) {
        return res.status(500).json({error})
    }
    return res.status(200).json({message: 'Signed up successfully'})
};
module.exports.signUp = signUp;
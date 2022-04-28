const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {signupValidation,loginValidation} = require('../middleware/validation');

exports.login_post = async (req,res) => {
    //valddating data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);//error message  

    //check if the user exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email Does not exist');

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)return res.status(400).send('invalid password');
    req.session.isAuth= true;
    res.status(200).send('Login sucesseded');
};

exports.signup_post = async (req,res) => {

    //valddating data
    const { error } = signupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);//error message

    //check if the user already registered
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already Registered');

    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);


    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        // saving the new user to the database
        const saveUser = await user.save();
        res.send(saveUser);
        res.status(200);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.logout_post = async (req,res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).send(err.details[0].message);
    })
};
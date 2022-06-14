const User = require('../model/User');
exports.getlist = async (req,res) => {
    const user = await User.findOne({email: req.body.email});
    res.send(user.TCK);
};

exports.addtolist = async (req,res) => {
    var user = await User.findOne({email: req.body.email});
    var TCKList = user.TCK;
    for(let i = 0 ; i < req.body.TCK.length;i++){
        if(TCKList.indexOf(req.body.TCK[i]) === -1) {
            TCKList.push(req.body.TCK[i]);
        }
    }
    user.TCK = TCKList;
    await user.save();
    res.status(200).send(user.TCK)
};
exports.deletefromlist = async (req,res) => {
    for(let i = 0 ; i < req.body.TCK.length;i++)
        await User.findOneAndUpdate({email: req.body.email},{$pull: {TCK: req.body.TCK[i]}});
    res.status(200).send("TCK has been deleted");
};

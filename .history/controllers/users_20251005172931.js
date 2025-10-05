 module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup = async (req,res) =>{
    try{
        let {username, email, password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser,(err) =>{
        if(err){
            return next(err);
        }
         req.flash("success", "Welcome to  Herapheri");
         res.redirect("/listings");
    });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
};
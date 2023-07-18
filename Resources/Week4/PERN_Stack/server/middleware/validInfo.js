module.exports = (req,res,next) => {
    const {email, name, password} = req.body;
    
    function validEmail(userEmail) {
        const emailRegex = /^\S+@[a-zA-Z0-9._%+-]+(?:\.[a-zA-Z0-9._%+-]+)*$/;
        return emailRegex.test(userEmail);
    }
    if(req.path === '/register'){
        // console.log(!email.length);
        if(![email, name, password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }
        else if(!validEmail(email)){
            return res.status(401).json("Invalid Email")
        }
    }
    else if(req.path === '/login'){
        if(![email, password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        }
        else if(!validEmail(email)){
            return res.status(401).json("Invalid Email")
        }
    }
    next();
};
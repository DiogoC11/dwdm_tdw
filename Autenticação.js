const VerifyAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
 
    if(!authHeader){
        return res.status(400).json({
            "message": "Autenticação em falta."
        });
    }
 
    const tokenClear = atob(authHeader.split(" ")[1]);
    const tokensInfo = tokenClear.split(":");
 
    if(tokensInfo[0] === "Insira-o-seu-User" && tokensInfo[1] === "Insira-a-sua-passe"){
        next();
    }else{
        res.status(400).json({
            "message": "User errado!"
        });
    }
}
 
module.exports = VerifyAuth;
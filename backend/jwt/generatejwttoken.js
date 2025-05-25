import jwt from 'jsonwebtoken'

const createTokenAndSaveCookies= async (userid,res)=>{
    const token =jwt.sign({userid},process.env.jwt_secreat,{expiresIn:"5d"})
    await res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict"
    })
}

export default createTokenAndSaveCookies
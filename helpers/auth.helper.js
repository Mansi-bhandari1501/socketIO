import bcrypt from 'bcrypt'

export const hash_password =  async(password) =>{
    try{
        const salt_rounds = 10;
        const hashed_password = await bcrypt.hash(password,salt_rounds);
        return hashed_password;
    }catch (error){
        console.log(error)
    }
}
export const comparePassword =  async(password,hashed_password)=>{
 return bcrypt.compare(password,hashed_password);
};

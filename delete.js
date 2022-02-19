const Task = require('../../Models/Task')

module.exports={
    deleteTask : async (req,res,next) => {
        let task = await Task.deleteOne({_id:req.params.id,creator:req.userData.userId})
        .then((result)=>{
            console.log(result);
            if(result)
            res.json({
                status:{
                    message:"successfully",
                    code:201,
                }
            });
            else
            {
                res.status(401).json({
                    status:{
                        message:"auth failed",
                        code : 401,
                    },
                    
                });
            }
        })
      .catch(e=>{
            res.status(500).json({
                status:{
                    message : e.message,
                    code : 500,
                }
            });  
     });
}
}
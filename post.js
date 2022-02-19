const Task = require('../../Models/Task');
module.exports={
    createTask : async (req,res,next)=>{
        console.log(req.userData);
        const url = req.protocol + "://" + req.get("host");
        let task = await Task.create({title:req.body.title,
            description: req.body.description,
            imagePath : url + '/images/'+req.file.filename,
            creator: req.userData.userId})
        console.log(task);
        res.json({
            status:{
              message:"successfully",
              code:201
        },
        data:task
    });
    }
}

const Task = require('../../Models/Task')

module.exports = {
    getById:(req,res,next)=>{
        Task.findById(req.params.id)
        .then(task=>{
            res.json({
                staus:{
                    message:"successfully",
                    code:200
                },
                data:task
            });
        }).catch(e=>{
            res.status(500).json({
                status:{
                    message :e.message,
                    code : 401,
                }
            });  
     
        });
    
    },
    getAll :(req,res,next)=>{
        console.log(req.query);
        const pageSize = +req.query.pagesize;
        const currentPage = +req.query.currentpage;
        const taskQuery = Task.find();
        if(pageSize && (currentPage > -1)){
          taskQuery
          .skip(pageSize * (currentPage))
          .limit(pageSize)
        }
        taskQuery
        .then(async tasks=>{
            res.json({
                staus:{
                    message:"successfully",
                    code:200
                },
                data:tasks,
                totalCount: await Task.count()
            });
        }).catch(e=>{
            res.status(500).json({
                status:{
                    message :e.message,
                    code : 401,
                }
            });  
     });
    }
}
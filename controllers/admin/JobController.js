const JobModel = require("../../models/job")

class JobController{
    static display =async(req,res)=>{
        try {
            const jobs = await JobModel.find(); // Fetch all jobs
            const category = await JobModel.find()
            // console.log(jobs)
            res.render('admin/job/display',{
                name : req.user.name ,
                success : req.flash('success'),
                error  :req.flash('error'),
                jobs:jobs
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    static insertJob =async(req,res)=>{
            try {
                // console.log(req.body)
                const {title,companyName,description,location,jobType,salaryRange,skillsRequired,lastDateToApply} = req.body
                const userId = req.user && req.user._id; 
                const result = await JobModel.create({
                    title,
                    companyName,
                    description,
                    location,
                    jobType,
                    salaryRange,
                    skillsRequired,
                    lastDateToApply,
                    postedBy: userId,
                })
                req.flash('success',"Job insert Successfully")
                res.redirect('/job/display') //web.js
    
            } catch (error) {
                console.log(error)
            }
        }

        static deleteJob =async(req,res)=>{
        try {
            const id = req.params.id //get id
            // console.log(id)
            await JobModel.findByIdAndDelete(id)
            req.flash('success','Category deleted successfully')
            res.redirect('/job/display')
            
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports =JobController
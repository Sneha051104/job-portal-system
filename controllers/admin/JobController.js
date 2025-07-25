const applicationModel = require("../../models/applicationModel");
const JobModel = require("../../models/job")

class JobController {
    static display = async (req, res) => {
        try {
            const job = await JobModel.find(); // Fetch all jobs
            const category = await JobModel.find()
            // console.log(jobs)
            res.render('admin/job/display', {
                name: req.user.name,
                j: job,
                c: category,
                success: req.flash('success'),
                error: req.flash('error'),
                jobs: job
            })
        } catch (error) {
            console.log(error)
        }
    }

    static insertJob = async (req, res) => {
        try {
            // console.log(req.body)
            const { title, companyName, description, location, jobType, salaryRange, skillsRequired, lastDateToApply } = req.body
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
                image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url
                }
            })
            req.flash('success', "Job insert Successfully")
            res.redirect('/job/display') //web.js

        } catch (error) {
            console.log(error)
        }
    }

    static deletejob = async (req, res) => {
        try {
            const id = req.params.id
            // console.log(id)
            await JobModel.findByIdAndDelete(id)
            //console.log(category)
            req.flash('success', "job Delete Successfully")
            res.redirect("/job/display");

        } catch (error) {
            console.log(error)
        }
    }

    static viewjob = async (req, res) => {
        try {
            const id = req.params.id
            const job = await JobModel.findById(id) //data fetch mognobd
            // console.log(category)
            res.render('admin/job/view', {
                name: req.user.name,
                j: job,

            })
        } catch (error) {
            console.log(error)
        }
    }

        static editjob = async (req, res) => {
            try {
                const id = req.params.id
                const job = await JobModel.findById(id) //data fetch mognobd
                // console.log(category)
                res.render('admin/job/edit', {
                    name: req.user.name,
                    j: job,

                })
            } catch (error) {
                console.log(error)
            }
        }

        static updatejob = async (req, res) => {
        try {
            const id = req.params.id
            // const {title} = req.body
            const { title, companyName, description, location, jobType, category, salaryRange, skillsRequired, lastDateToApply } = req.body

            const job = await JobModel.findByIdAndUpdate(id,
                {
                    title,
                    companyName,
                    description,
                    location,
                    jobType,
                    category,
                    salaryRange,
                    skillsRequired,
                    lastDateToApply,
                }) //data fetch mognobd
            req.flash('success', "Category update Successfully")
            res.redirect("/job/display");

        } catch (error) {
            console.log(error)
        }
    }

    static myApplication = async (req, res) => {
        try {
            const applications = await applicationModel.find({
                userId: req.user.id,
            })
                .populate({
                    path: "jobId",
                    populate: {
                        path: "createdBy",
                        model: "user",
                    },
                })
                .sort({ appliedAt: -1 });
            // console.log(applications)

            res.render("admin/job/myApplication", {
                applications,
                user: req.user,
            });
        } catch (error) {
            console.error(error);
        }
    };

    static viewAllJobs = async (req, res) => {
        try {
            // Sare job applications fetch karenge, job aur user details ke saath
            const applications = await applicationModel.find()
                .populate("jobId") // sirf job ka title aur companyName lenge
                .populate("userId", "name email"); // user ka naam aur email bhi lenge
            // console.log(applications)

            res.render("admin/job/applications", {
                applications,
                success: req.flash("success"),
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    };

    static updateApplicationStatus = async (req, res) => {
        try {
            const appId = req.params.id;
            const newStatus = req.body.status;

            if (
                !["Pending", "Reviewed", "Interview", "Rejected"].includes(newStatus)
            ) {
                return res.status(400).send("Invalid status");
            }

            const application = await applicationModel.findByIdAndUpdate(
                appId,
                { status: newStatus },
                { new: true }
            ).populate("userId");

            if (!application) {
                return res.status(404).send("Application not found");
            }

            req.flash('success','Appliction status updated successfully')
            res.redirect('/applicants')

        } catch (err) {
            console.error(err);

        }
    };

}
module.exports = JobController
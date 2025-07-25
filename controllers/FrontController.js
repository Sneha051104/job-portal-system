const CategoryModel = require('../models/category')
const job = require('../models/job')
const JobModel = require('../models/job')
const streamifier = require("streamifier");
const { cloudinary } = require('../config/cloudinary')
const applicationModel =require('../models/applicationModel')

class FrontController {

    static home = async (req, res) => {
        try {
            const categories = await CategoryModel.find().sort({ createdAt: -1 });//fetching category
            const jobs = await JobModel.find().sort({ createdAt: -1 });//fetching jobs
            // console.log(categories)
            // console.log(jobs)
            res.render('home', { c: categories, jobs: jobs })
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
            res.render('about')
        } catch (error) {
            console.log(error)
        }
    }
    static course = async (req, res) => {
        try {
            res.send('course page')
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
        try {
            const success = req.flash('success');
            res.render('contact', { success })
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            res.render('login', { msg: req.flash("error"), success: req.flash("success") })
        } catch (error) {
            console.log(error)
        }
    }

    static register = async (req, res) => {
        try {
            res.render('register')
        } catch (error) {
            console.log(error)
        }
    }

    static joblist = async (req, res) => {
        try {
            const jobs = await JobModel.find().sort({ createdAt: -1 });//fetching jobs
            res.render('joblist', { jobs })
        } catch (error) {
            console.log(error)
        }
    }
    // static jobDetails = async (req, res) => {
    //     try {
    //         const id = req.params.id
    //         const job = await JobModel.findById(id)
    //         // console.log(job)
    //         res.render('jobdetail', { job })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    static jobDetails = async (req, res) => {
        try {
            const jobId = req.params.id;
            const job = await JobModel.findById(jobId);

            let alreadyApplied = false;

            if (req.user) {
                const existingApplication = await applicationModel.findOne({
                    jobId: jobId,
                    userId: req.user.id
                });

                alreadyApplied = !!existingApplication;
            }

            res.render("jobdetail", {
                job: job,
                name: req.user?.name,
                alreadyApplied,
                success: req.flash('success'),
                error: req.flash('error')
            });
        } catch (error) {
            console.log(error);
            res.redirect("/joblist");
        }
    };

    static jobApply = async (req, res) => {
        try {
            // Cloudinary upload stream (for PDFs/Word docs)
            const bufferStream = streamifier.createReadStream(req.file.buffer);
            const jobId = req.params.id
            // अब req.file.buffer में आपका resume file as a buffer (RAM में store) है।
            // फिर इस buffer को Cloudinary पर upload किया जाता है।
            //         जब आप कोई file memory में upload करते हो (जैसे multer.memoryStorage() के साथ), तो वो file RAM में Buffer के रूप में होती है।

            // अब Cloudinary जैसे कुछ services file को stream के रूप में लेती हैं — ना कि सीधे buffer.

            // तो streamifier.createReadStream(buffer) इस buffer को stream में convert करता है ताकि आप उसे .pipe() करके किसी destination (जैसे Cloudinary) तक भेज सको।
            console.log(bufferStream);
            const cloudinaryUpload = () =>
                new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "student_resume",
                            resource_type: "raw",
                        },
                        (error, result) => {
                            if (error) return reject(error);
                            resolve(result);
                        }
                    );
                    bufferStream.pipe(stream);
                });

            const result = await cloudinaryUpload();
            await applicationModel.create({
                userId: req.user.id,
                jobId: jobId,
                resume: {
                    public_id: result.public_id,
                    url: result.secure_url,
                },
                coverLetter: req.body.coverLetter,
            })
            req.flash("success", "You have successfully applied for the job.");
            res.redirect("/jobdetails/" + jobId);
            // console.log(result);
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = FrontController
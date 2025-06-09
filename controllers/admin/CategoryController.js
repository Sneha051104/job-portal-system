const CategoryModel = require('../../models/category')
class CategoryController{
    static display =async(req,res)=>{
        try {
            const category = await CategoryModel.find() //data fetch
            // console.log(category)
            res.render('admin/category/display',{
                name : req.user.name ,
                c:category,
                success : req.flash('success')
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    static insertCategory =async(req,res)=>{
        try {
            // console.log(req.body)
            const {title} = req.body
            const result = await CategoryModel.create({
                title
            })
            req.flash('success',"Category insert Successfully")
            res.redirect('/category/display') //web.js

        } catch (error) {
            console.log(error)
        }
    }
    static viewCategory =async(req,res)=>{
        try {
            const id = req.params.id
            const category =await CategoryModel.findById(id) //data fetch mognobd
            // console.log(category)
            res.render('admin/category/view',{
                name:req.user.name,
                c:category,
                
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    static editCategory =async(req,res)=>{
        try {
            const id = req.params.id
            const category =await CategoryModel.findById(id) //data fetch mognobd
            // console.log(category)
            res.render('admin/category/edit',{
                name:req.user.name,
                c:category,
                
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    static UpdateCategory =async(req,res)=>{
        try {
            const id = req.params.id
            const {title} = req.body
            const category =await CategoryModel.findByIdAndUpdate(id,{
                title
            }) //data fetch mognobd
            req.flash('success',"Category update Successfully")
            res.redirect("/category/display");
             
        } catch (error) {
            console.log(error)
        }
    }

    static deleteCategory =async(req,res)=>{
        try {
            const id = req.params.id //get id
            // console.log(id)
            await CategoryModel.findByIdAndDelete(id)
            req.flash('success','Category deleted successfully')
            res.redirect('/category/display')
            
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports =CategoryController
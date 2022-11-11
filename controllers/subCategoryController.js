const { subCategory } = require("../config/db");
const db = require("../config/db");
const subCategories = db.subCategory;

module.exports = {
  createsubcategory: async (req, res) => {
    try{
        const checkin = new subCategory({
            category_id:req.body.category_id,
            subCategory:req.body.subCategory
        });
        const result = await checkin.save();
        res.send({success:true, message:"successfull"});
        console.log(result);
    }catch(err){
        console.log(err);
    }
  },

  Subcategoryget: async (req, res) => {
     

    // return
    const cateId = req.body.category_id;

    const data = await subCategory.find({category_id:cateId});
    const user = data.reverse()
    res.send({status:200,user});
    // console.log(data);
  },

  subcategoryUpdate: async (req, res) => {
    
    let _id = req.body._id;

    const result = await subCategory.findByIdAndUpdate(
      _id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.send({ success:true ,result,message: " update Successfully"});
    console.log("this is update" + { result });
  },

  subcategorydelete: async (req, res) => {
    const Delete = await subCategory.findByIdAndDelete(req.body._id);
    if(!Delete){
      return res.send({ success:false, message:'Sub Category id is required' });
    }

    res.status(200).json({ success: true, message: " deleted" });
  },
};

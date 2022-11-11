const { category } = require("../config/db");
const db = require("../config/db");
const subCategories = db.category;

module.exports = {
  createcategory: async (req, res) => {
    try{
        const checkin = new category({
            tittle:req.body.tittle
        });
        const result = await checkin.save();
        res.send({success:true, message:"successfull"});
        console.log(result);
    }catch(err){
        console.log(err);
    }
  },

  categoryget: async (req, res) => {
   
    const data = await category.find();
    const user = data.reverse()
    res.send(user);
    console.log(user);
  },

  categoryUpdate: async (req, res) => {
    
    let _id = req.body._id;

    const result = await category.findByIdAndUpdate(
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

  categorydelete: async (req, res) => {
    const Delete = await category.findByIdAndDelete(req.body._id);
    if(!Delete){
      return res.send({ success:false, message:'enter _id'})
    }

    res.status(200).json({ success: true, message: " deleted" });
  },
};

 const {designations}= require('../config/db');
const db = require('../config/db');
const  designation = db.designations

module.exports = {
 createdesignation: async (req, res) => {

    try {
      const EmpDesignation= new designation ({
        userid: req.body.userid,
        tittle: req.body.tittle,
        
      })
      const result = await EmpDesignation.save();
      console.log('desidnation :', result);
      return res.send({ success: true, message: "designation  Successfully !", });
    } catch (error) { console.log('eroor', error) }
  },

   designationget: async (req, res) => {
    const data = await designation.find();
    const user = data.reverse()
    res.send(user);
    console.log(user);
  },


  designationUpdate: async (req, res) => {
    let _id = req.params._id;

    const result = await designations.findByIdAndUpdate(_id, {
      $set: req.body
    }, {
      new: true
    });
    res.send({ success:true ,result,message: "Holiday update Successfully"});
    console.log("this is update" + { result });
  },

  designationdelete: async (req, res) => {
    const Delete = await designations.findByIdAndDelete(req.body._id);

    res.send({ success:true ,message: "Holiday Delete Successfully"});
    
  },

}
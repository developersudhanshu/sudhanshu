const { check } = require('../config/db');
const moment = require('moment');

module.exports = {

    // function name should be 
    check : async (req, res) => {

        try{
            let checkin = req.body.checkin;
            if(checkin == true){
                try{
                    const checkin = new check({
                        userid:req.body.userid,
                        type:req.body.type,
                        checkin_time:Date.now(),
                        status:"Present",
                    });
                    const result = await checkin.save();
                    res.send({success:true, message:"Check In Successfully !", data:result});
                    console.log(result);
                }catch(err){
                    console.log(err);
                }
            }


            let checkout = req.body.checkout;
            if(checkout == true){
                try{
                    let _id = req.body._id;
                    const result = await check.updateOne({ _id : _id }, {
                        $set: {
                            userid:req.body.userid,
                            type:req.body.type,
                            checkout_time:Date.now()
                        }
                    },{
                        new: true
                    });
                    console.log("result :", result)
                    const response = await check.findById(_id);
                    console.log('response :', response);
                    res.status(200).send({success:true, message:"Update successfully !", data: response });
                    // res.send({result});
                    // res.send(result);
                    // console.log("result :", result)
                    // res.status(200).send({success:true, message:"Update successfully !", data: result });

                }catch(err){
                    console.log(err);
                }
            }
        }
        catch(err){
            console.log('error :', err);
        }
    },

    updateCheck : async (req, res) => {
        console.log("data update check");
        let _id = req.params._id;
        let data = {
            present_select: req.body.present_select,
        }
        console.log("data 455 :", data);
        try{
                const result = await check.findByIdAndUpdate({_id : _id}, {
                    $set: data
                },{
                    new: true
                });
                try{
                    res.status(200).send({success:true, message:"Update successfully !", data: result });
                    console.log("data :- "+ result);
                }
                catch(err){
                    res.status(400).send({success:false, message: err });
                    console.log(err);
                }
            }catch(err){
                console.log(err);
            }
    }
}


const { holidays } = require("../config/db");
const db = require("../config/db");
const Holidays = db.holidays;

module.exports = {
  createholiday: async (req, res) => {
    console.log("aa gya bhai");

    try {
      const Empholiday = new Holidays({
        holidayTittle: req.body.holidayTittle,
        date: req.body.date,
      });
      const result = await Empholiday.save();
      console.log("Holiday:", result);
      return res.send({
        success: true,
        message: "Holiday message send Successfully !",
      });
    } catch (error) {
      console.log("eroor", error);
    }
  },

  holidayget: async (req, res) => {
    const data = await Holidays.find();
    const user = data.reverse()
    res.send(user);
    console.log(user);
  },

  holidayUpdate: async (req, res) => {
    
    let _id = req.params._id;

    const result = await holidays.findByIdAndUpdate(
      _id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.send({ success:true ,result,message: "Holiday update Successfully"});
    console.log("this is update" + { result });
  },

  holidaydelete: async (req, res) => {
    const Delete = await holidays.findByIdAndDelete(req.body._id);

    res.status(200).json({ success: true, message: "user has been deleted" });
  },
};

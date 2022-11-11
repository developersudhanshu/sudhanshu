const { leave } = require("../config/db");

const db = require("../config/db");
const leaves = db.leave;
var mongoose = require("mongoose");

module.exports = {
  createLeave: async (req, res) => {
    try {
      const EmpCreateLeave = new leave({
        userid: req.body.userid,
        leaveTitle: req.body.leaveTitle,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        leaveMessage: req.body.leaveMessage,
        leaveStatus: "Pending",
        readOrNot: "true",
        userReadOrNot: "unseen",
      });
      const result = await EmpCreateLeave.save();
      console.log("Leave :", result);
      res.send({
        success: true,
        message: "Leave message send Successfully !",
        data: result,
      });
    } catch (error) {
      console.log("error :", error);
    }
  },

  leaveUpdate: async (req, res) => {
    let _id = req.params._id;
    let data = {
      leaveTitle: req.body.leaveTitle,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      leaveMessage: req.body.leaveMessage,
    };
    const result = await leave.findByIdAndUpdate(
      { _id: _id },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    try {
      res
        .status(200)
        .send({
          success: true,
          message: "Update Leave Successfully !",
          data: result,
        });
      console.log("update Leave :- ", result);
    } catch (err) {
      res.status(400).send({ success: false, message: err });
      console.log(err);
    }
  },

  deleteUserLeave: async (req, res) => {
    let _id = req.params._id;
    try {
      const leaveData = await leave.findOne({ _id: _id });
      let leaveStatusData = leaveData.leaveStatus;
      console.log("foundUser 448DD:", leaveStatusData);
      if (leaveStatusData == "Pending") {
        const result = await leave.findByIdAndDelete({ _id: _id });
        try {
          res
            .status(200)
            .send({
              success: true,
              message: "Delete Leave Successfully !",
              data: result,
            });
        } catch (err) {
          res.status(400).send({ success: false, message: err });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },

  changeLeaveStatus: async (req, res) => {
    let _id = req.params._id;
    let data = {
      leaveStatus: req.body.leaveStatus,
    };
    try {
      const result = await leave.findByIdAndUpdate(
        { _id: _id },
        {
          $set: data,
        },
        {
          new: true,
        }
      );
      try {
        res
          .status(200)
          .send({
            success: true,
            message: "Update Leave Status Successfully !",
            data: result,
          });
        console.log("data :- ", result);
      } catch (err) {
        res.status(400).send({ success: false, message: err });
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },

  adminLeaveUpdate: async (req, res) => {
    let _id = req.params._id;
    console.log("_id :", _id);
    let data = {
      leaveTitle: req.body.EmpLeaveTitle,
      fromDate: req.body.EmpFromDate,
      toDate: req.body.EmpToDate,
      leaveMessage: req.body.EmpLeaveMessage,
    };
    const result = await leave.findByIdAndUpdate(
      { _id: _id },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    try {
      res
        .status(200)
        .send({
          success: true,
          message: "Admin Update user Leave Successfully !",
          data: result,
        });
      console.log("update Leave :- ", result);
    } catch (err) {
      res.status(400).send({ success: false, message: err });
      console.log(err);
    }
  },

  adminDeleteUserLeave: async (req, res) => {
    let _id = req.params._id;
    try {
      const result = await leave.findByIdAndDelete({ _id: _id });
      try {
        res
          .status(200)
          .send({
            success: true,
            message: "Delete User Leave Successfully !",
            data: result,
          });
      } catch (err) {
        res.status(400).send({ success: false, message: err });
      }
    } catch (err) {
      console.log(err);
    }
  },

  adminNotificationUserReadOrNot: async (req, res) => {
    let _id = req.params._id;
    console.log("_id :", _id);
    let data = {
      readOrNot: req.body.EmpReadOrNot,
    };
    const result = await leave.findByIdAndUpdate(
      { _id: _id },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    try {
      res
        .status(200)
        .send({
          success: true,
          message: "Admin Update Notification Successfully !",
          data: result,
        });
      console.log("update Leave :- ", result);
    } catch (err) {
      res.status(400).send({ success: false, message: err });
      console.log(err);
    }
  },

  userNotificationUserReadOrNot: async (req, res) => {
    let _id = req.params._id;
    console.log("_id :", _id);
    let data = {
      userReadOrNot: req.body.EmpUserReadOrNot,
    };
    const result = await leave.findByIdAndUpdate(
      { _id: _id },
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    try {
      res
        .status(200)
        .send({
          success: true,
          message: "Admin Update Notification Successfully !",
          data: result,
        });
      console.log("update Leave :- ", result);
    } catch (err) {
      res.status(400).send({ success: false, message: err });
      console.log(err);
    }
  },
};

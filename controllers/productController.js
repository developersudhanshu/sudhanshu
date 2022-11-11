const { product } = require('../config/db')
const db = require('../config/db')
const products = db.product
const appRoot = require("app-root-path")


const fs = require('fs');

module.exports = {
    createProduct: async (req, res) => {
        const filename = req.files[0].filename

        // let avatar =
        //     'http://' + req.get('host') + '/upload/' + req.files[0].filename
            let avatar =
           req.files[0].filename
        console.log(avatar)
        try {
            const products = new product({
                avatar: avatar,
                product_Name: req.body.productName,
                vendor: req.body.vendor,
                mrp_Price: req.body.mrpPrice,
                price: req.body.price,
                stock_Quantity: req.body.stockQuantity,
                category: req.body.category,
                sub_Category: req.body.subCategory,
                brand_Name: req.body.brandName,
                manage_Stock: req.body.manage_Stock,
                discription: req.body.discription,
                keywords: req.body.keywords,
                varient_lable: req.body.varient_lable,
                status: req.body.status,
            })

            const created = await products.save()

            console.log(created)
            res.send({ message: 'successfully' })
        } catch (err) {
            console.log(err)
        }

    },
    getallproducts: async (req, res) => {
        const allproduct = await product.find()
        try {
            res.send(allproduct)

        } catch (e) {
            console.log(e);
        }
    },
    updateproduct: async (req, res) => {
        let _id = req.params._id;
        const userDatas = await product.findById(_id)
        // console.log(userDatas['avatar']);
        var filePath = '/upload/'+userDatas['avatar'];
        
        console.log(filePath);
        // return;

        try {
            filePath = appRoot + filePath;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }

        } catch (e) {
            console.log('error in remove file', e.message)
        }
       
    
        

        let avatar =
        req.files[0].filename



        const result = await product.findByIdAndUpdate(
          _id,
          {
            avatar: avatar,
            product_Name: req.body.productName,
            vendor: req.body.vendor,
            mrp_Price: req.body.mrpPrice,
            price: req.body.price,
            stock_Quantity: req.body.stockQuantity,
            category: req.body.category,
            sub_Category: req.body.subCategory,
            brand_Name: req.body.brandName,
            manage_Stock: req.body.manage_Stock,
            discription: req.body.discription,
            keywords: req.body.keywords,
            varient_lable: req.body.varient_lable,
            status: req.body.status,

          },
          {
            new:true,
          }

        );
        res.send({ success: true, _id, message: "update Successfully" });
        console.log("this is update", _id);
        

    },
    deleteproduct: async (req, res) => {
        const Delete = await product.findByIdAndDelete(req.params._id);
        

        res.status(200).json({ success: true, message: "product has been deleted" });
    }
}

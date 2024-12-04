const router = require("express").Router();
let Product = require("../models/product");
const multer = require('multer'); // Import Multer for handling file uploads

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CRUD - Add with Image
router.route("/add").post(upload.single('image'), (req, res) => {
    const name = req.body.name;
    const pid = Number(req.body.pid);
    const category = req.body.category;
    const description = req.body.description;
    const rentalPrice = req.body.rentalPrice;
    const availability = true;
    const isSelect = false;


    // Check if file was uploaded
    let image = null;
    if (req.file) {
        image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    const newProduct = new Product({
        name,
        pid,
        category,
        description,
        rentalPrice,
        availability,
        isSelect,
        image
    });

    newProduct.save()
        .then(() => {
            res.json("Product Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error: Product not added");
        });
});


//CRUD - read
router.route("/").get((req,res)=>{

    Product.find().then((product)=>{ //can modify .find function
        res.json(product)
    }).catch((err)=>{
        console.log(err); 
    }) 
})

//CRUD - update
router.route("/update/:id").put(async (req,res) => {
    let productId = req.params.id;
    const {name,pid,category} = req.body;

    const updateProduct = {
        name,
        pid,
        category
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

//CRUD - delete
router.route("/delete/:id").delete(async (req,res) => {
    let productId = req.params.id;

    await Product.findByIdAndDelete(productId).then(() => {
        res.status(200).send({status: "Product Deleted"}) 
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with delete product", error: err.message}); 
    })

})

//CRUD - read(Single product)
router.route("/get/:id").get(async (req, res) => {
    let productId = req.params.id;
    const user = await Product.findById(productId).then( (product) => {
        res.status(200).send({status: "Product fletched", product}) 
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error ", error: err.message}); 
    })

})

// Get count of all documents
router.route("/count").get(async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

// Get from category wise
router.route("/categorySingle/:category").get((req, res) => {
    let productCategory = req.params.category;

    Product.find({ category: productCategory }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal server error" }); // Optionally, you can send an error response to the client
    });
});


//get low stocked items
router.route("/lowCount").get(async (req, res) => {
    try {
        const count = await Product.countDocuments({ pid: { $lt: 10 } });
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

//Add Damage Items
router.route("/addDamage/:id").put(async (req,res) => {
    let productId = req.params.id;
    const {pid,isDamaged,DamagedQty} = req.body;

    const updateProduct = {
        pid,
        isDamaged,
        DamagedQty 
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

// Get All damaged
router.route("/getDamaged").get((req, res) => {
    Product.find({ isDamaged: true }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
    });
});

// Delete Damaged Items
router.route("/deleteDamaged/:id").put(async (req,res) => {
    let productId = req.params.id;

    const isDamaged = false;


    const updateProduct = {
        isDamaged
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

//---------------------------

//Add Disposed Items
router.route("/addDispoed/:id").put(async (req,res) => {
    let productId = req.params.id;
    const {qty,isDisposed,DisposedQty} = req.body;

    const pid = qty - DisposedQty;

    const updateProduct = {
        pid,
        isDisposed,
        DisposedQty 
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

// Get All Disposed
router.route("/getDisposed").get((req, res) => {
    Product.find({ isDisposed: true }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
    });
});

// Delete Disposed Items
router.route("/deleteDisposed/:id").put(async (req,res) => {
    let productId = req.params.id;

    const isDisposed = false;


    const updateProduct = {
        isDisposed
    }

    const update = await Product.findByIdAndUpdate(productId,updateProduct).then(()=>{
        res.status(200).send({status: "Product updated" }) //user sure na
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with update data", error: err.message}); 
    })

})

// Damage Item Count
router.route("/damagedItemCount").get(async (req, res) => {
    try {
        const count = await Product.countDocuments({ isDamaged: true });
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

// Disposed Item Count
router.route("/disposedItemCount").get(async (req, res) => {
    try {
        const count = await Product.countDocuments({ isDisposed: true });
        res.status(200).json({ count });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});


// CRUD - Read (Single product) - with images
router.route("/getImages/:id").get(async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ status: "Error", message: "Product not found" });
        }

        // Convert binary image data to base64
        const imageData = product.image ? product.image.data.toString('base64') : null;

        // Send response with product details and image data
        res.status(200).json({ status: "Product fetched", product: { ...product.toJSON(), image: imageData } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

//low stocked list

router.route("/getLowStockLIst").get((req, res) => {
    Product.find({ pid: { $lt: 10 } }).then((products) => {
        res.json(products);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

//CRUD - delete by category
router.route("/deleteCat/:name").delete(async (req,res) => {
    let categoryName = req.params.name;

    await Product.deleteMany({ category: categoryName })
        .then(() => {
            res.status(200).send({ status: "Category Deleted" }) 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with delete category", error: err.message }); 
        });
});

// Check if a product with a given name already exists
router.route("/check/:productName").get((req, res) => {
    const productName = req.params.productName;

    Product.findOne({ name: productName }).then((product) => {
        if (product) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    });
});








module.exports = router;
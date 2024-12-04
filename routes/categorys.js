const router = require("express").Router();
let Category = require("../models/category");
const multer = require('multer'); // Import Multer for handling file uploads

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// CRUD - Add with Image
router.route("/add").post(upload.single('image'), (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    // Check if file was uploaded
    let image = null;
    if (req.file) {
        image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    const newCategory = new Category({
        name,
        description,
        image
    });

    newCategory.save()
        .then(() => {
            res.json("Category Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Error: Category not added");
        });
});

//CRUD - read
router.route("/").get((req,res)=>{

    Category.find().then((category)=>{ //can modify .find function
        res.json(category)
    }).catch((err)=>{
        console.log(err); 
    }) 
})

//get all with images
router.route("/getAllImages").get(async (req, res) => {
    try {
        // Retrieve all category
        const category = await Category.find();

        // Check if there are no category
        if (!category || category.length === 0) {
            return res.status(404).json({ status: "Error", message: "No category found" });
        }

        // Convert binary image data to base64 for each category
        const categoryWithImages = category.map(category => {
            // Check if category.image is defined
            const imageData = category.image && category.image.data ? category.image.data.toString('base64') : null;
            return { ...category.toJSON(), image: imageData };
        });

        // Send response with category details and image data
        res.status(200).json({ status: "category fetched", category: categoryWithImages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});

//CRUD - delete
router.route("/delete/:name").delete(async (req,res) => {
    let categoryName = req.params.name;

    await Category.findOneAndDelete({ name: categoryName })
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

    Category.findOne({ name: productName }).then((category) => {
        if (category) {
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
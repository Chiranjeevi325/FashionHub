const express = require('express');
const {
    getDashboardStats,
    createProduct,
    getBrandProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/brandController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { verifyProductOwnership } = require('../middleware/brandMiddleware');
const { upload } = require('../config/cloudinary');

const router = express.Router();

// All brand routes require authentication and brand role
router.use(protect);
router.use(authorize('brand'));

router.get('/dashboard', getDashboardStats);

router.route('/products')
    .get(getBrandProducts)
    .post(upload.array('images', 5), createProduct);

router.route('/products/:id')
    .get(verifyProductOwnership, getProductById)
    .put(verifyProductOwnership, upload.array('images', 5), updateProduct)
    .delete(verifyProductOwnership, deleteProduct);

module.exports = router;

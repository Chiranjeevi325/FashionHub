import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import brandService from '../../services/brandService';
import toast from 'react-hot-toast';
import { Plus, X, Upload, Package, Image, Link2 } from 'lucide-react';
import './AddProduct.css';

const CATEGORIES = [
    'Men', 'Women', 'Kids', 'Shoes', 'Accessories',
    'Sports', 'Outerwear', 'Electronics', 'Home', 'Other'
];

const AddProduct = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadMode, setUploadMode] = useState('url'); // 'file' or 'url'
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        status: 'published',
    });
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (files.length + selectedFiles.length > 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }
        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);
    };

    const removeFile = (index) => {
        URL.revokeObjectURL(previews[index]);
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const addImageUrl = () => {
        if (!imageUrl.trim()) return;
        if (imageUrls.length >= 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }
        setImageUrls([...imageUrls, imageUrl.trim()]);
        setImageUrl('');
    };

    const removeUrl = (index) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.description || !form.price || !form.category) {
            toast.error('Please fill in all required fields');
            return;
        }

        const hasImages = uploadMode === 'file' ? files.length > 0 : imageUrls.length > 0;
        if (!hasImages) {
            toast.error('Please add at least one image');
            return;
        }

        setIsSubmitting(true);
        try {
            if (uploadMode === 'file') {
                // Try Cloudinary file upload
                const formData = new FormData();
                formData.append('name', form.name);
                formData.append('description', form.description);
                formData.append('price', parseFloat(form.price));
                formData.append('category', form.category);
                formData.append('status', form.status);
                files.forEach(file => formData.append('images', file));
                await brandService.uploadProduct(formData);
            } else {
                // Send image URLs as JSON
                await brandService.createProduct({
                    ...form,
                    price: parseFloat(form.price),
                    images: imageUrls,
                });
            }
            toast.success('Product created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Create product error:', error);
            const msg = error.response?.data?.message || 'Failed to create product';
            if (msg.includes('cloud_name') && uploadMode === 'file') {
                toast.error('Cloudinary is not configured. Please use Image URL mode instead.');
            } else {
                toast.error(msg);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-product-page">
            <header className="add-product-header">
                <div className="header-icon">
                    <Package size={28} />
                </div>
                <div>
                    <h1>Add New Product</h1>
                    <p>Fill in the details to list a new product.</p>
                </div>
            </header>

            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Left Column — Product Details */}
                    <div className="form-section">
                        <h3 className="section-title">Product Details</h3>

                        <div className="form-group">
                            <label htmlFor="product-name">Product Name *</label>
                            <input
                                id="product-name"
                                type="text"
                                name="name"
                                placeholder="e.g. Classic White Sneakers"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="product-description">Description *</label>
                            <textarea
                                id="product-description"
                                name="description"
                                placeholder="Describe your product in detail..."
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="product-price">Price (₹) *</label>
                                <input
                                    id="product-price"
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="product-category">Category *</label>
                                <select
                                    id="product-category"
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="product-status">Status</label>
                            <select
                                id="product-status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column — Images */}
                    <div className="form-section">
                        <h3 className="section-title">Product Images</h3>

                        {/* Upload mode toggle */}
                        <div className="upload-toggle">
                            <button
                                type="button"
                                className={`toggle-btn ${uploadMode === 'url' ? 'active' : ''}`}
                                onClick={() => setUploadMode('url')}
                            >
                                <Link2 size={16} /> Image URL
                            </button>
                            <button
                                type="button"
                                className={`toggle-btn ${uploadMode === 'file' ? 'active' : ''}`}
                                onClick={() => setUploadMode('file')}
                            >
                                <Upload size={16} /> File Upload
                            </button>
                        </div>

                        {uploadMode === 'file' ? (
                            <>
                                <label className="file-upload-area" htmlFor="image-upload">
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg"
                                        multiple
                                        onChange={handleFiles}
                                        style={{ display: 'none' }}
                                    />
                                    <Image size={32} />
                                    <p>Click to upload images</p>
                                    <span>JPG, JPEG, PNG — Max 5 images</span>
                                </label>

                                {previews.length > 0 && (
                                    <div className="image-preview-grid">
                                        {previews.map((url, i) => (
                                            <div key={i} className="image-preview-card">
                                                <img src={url} alt={`Preview ${i + 1}`} />
                                                <button type="button" className="remove-image-btn" onClick={() => removeFile(i)}>
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="url-input-row">
                                    <input
                                        type="text"
                                        placeholder="Paste image URL (e.g. from Unsplash)"
                                        value={imageUrl}
                                        onChange={e => setImageUrl(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); } }}
                                    />
                                    <button type="button" className="btn-add-url" onClick={addImageUrl}>
                                        <Plus size={18} />
                                    </button>
                                </div>

                                {imageUrls.length > 0 && (
                                    <div className="image-preview-grid">
                                        {imageUrls.map((url, i) => (
                                            <div key={i} className="image-preview-card">
                                                <img src={url} alt={`Image ${i + 1}`} />
                                                <button type="button" className="remove-image-btn" onClick={() => removeUrl(i)}>
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {imageUrls.length === 0 && (
                                    <div className="image-empty">
                                        <Link2 size={40} />
                                        <p>No images added yet</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={() => navigate('/dashboard')}>
                        Cancel
                    </button>
                    <button type="submit" className="btn-create" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Search, X, Loader2, Image as ImageIcon, UploadCloud, Check } from 'lucide-react';
import { toast } from 'sonner'; // ସବୁବେଳେ Sonner ବ୍ୟବହାର ହେବ
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/apiService';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const fileInputRef = useRef(null);

  const initialFormState = {
    name: '',
    mrp: '',
    originalPrice: '',
    description: '',
    department: 'women',
    productType: 'saree',
    collectionType: [], // Array ରହିବ
    curatedCollection: [], // Array ରହିବ
    sizes: [{ sizeName: 'free_size', stock: 10, additionalPrice: 0 }],
    productDetails: { fabric: '', work: '', inclusions: '' }
  };
  const [formData, setFormData] = useState(initialFormState);

  // ───────────── OPTIONS (ବେଟର୍ UI ପାଇଁ ଡାଟା) ─────────────
  const collectionOptions = [
    { value: 'festive_wears', label: 'Festive Wears' },
    { value: 'wedding_collections', label: 'Wedding Collections' },
    { value: 'everyday_casuals', label: 'Everyday Casuals' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const curatedOptions = [
    { value: 'new_arrivals', label: 'New Arrivals' },
    { value: 'best_sellers', label: 'Best Sellers' },
    { value: 'trending', label: 'Trending' }
  ];

  // ───────────── API FETCH ─────────────
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getAllProducts({ limit: 50 });
      if (response && response.products) setProducts(response.products);
    } catch (error) {
      toast.error("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ───────────── MODAL HANDLERS ─────────────
  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setSelectedFiles([]);
    setImagePreviews([]);
    setExistingImages([]);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      mrp: product.mrp || '',
      originalPrice: product.originalPrice || '',
      description: product.description || '',
      department: product.department || 'women',
      productType: product.productType || 'saree',
      collectionType: product.collectionType || [],
      curatedCollection: product.curatedCollection || [],
      sizes: product.sizes?.length > 0 ? product.sizes : [{ sizeName: 'free_size', stock: 10, additionalPrice: 0 }],
      productDetails: product.productDetails || { fabric: '', work: '', inclusions: '' }
    });

    setSelectedFiles([]);
    setImagePreviews([]);
    setExistingImages(product.productImages || []);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ───────────── INPUT HANDLERS ─────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // [NEW] Premium Chip/Pill Multi-Select Logic
  const toggleMultiSelect = (field, value) => {
    const currentArray = formData[field];
    if (currentArray.includes(value)) {
      // ଯଦି ଆଗରୁ ଅଛି, ତେବେ ତାକୁ ହଟାଇଦିଅନ୍ତୁ (Deselect)
      setFormData({ ...formData, [field]: currentArray.filter(item => item !== value) });
    } else {
      // ନୂଆ ଥିଲେ ଯୋଡିଦିଅନ୍ତୁ (Select)
      setFormData({ ...formData, [field]: [...currentArray, value] });
    }
  };

  const handleProductDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      productDetails: { ...formData.productDetails, [name]: value }
    });
  };

  // ───────────── SIZE ARRAY HANDLERS ─────────────
  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const newSizes = [...formData.sizes];
    newSizes[index] = { ...newSizes[index], [name]: name === 'sizeName' ? value : Number(value) };
    setFormData({ ...formData, sizes: newSizes });
  };

  const addSizeRow = () => setFormData({ ...formData, sizes: [...formData.sizes, { sizeName: 's', stock: 0, additionalPrice: 0 }] });
  const removeSizeRow = (index) => setFormData({ ...formData, sizes: formData.sizes.filter((_, i) => i !== index) });

  // ───────────── FILE UPLOAD HANDLERS ─────────────
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setSelectedFiles([...selectedFiles, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeNewImage = (index) => {
    const newFiles = [...selectedFiles]; newFiles.splice(index, 1); setSelectedFiles(newFiles);
    const newPreviews = [...imagePreviews]; newPreviews.splice(index, 1); setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index) => {
    const newExisting = [...existingImages]; newExisting.splice(index, 1); setExistingImages(newExisting);
  };

  // ───────────── SUBMIT LOGIC ─────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.originalPrice || !formData.mrp) {
      return toast.error("Name, MRP, and Original Price are required.");
    }

    setIsSubmitting(true);
    try {
      const submitData = new FormData();

      submitData.append('name', formData.name);
      submitData.append('mrp', formData.mrp);
      submitData.append('originalPrice', formData.originalPrice);
      submitData.append('description', formData.description);
      submitData.append('department', formData.department);
      submitData.append('productType', formData.productType);

      submitData.append('collectionType', JSON.stringify(formData.collectionType));
      submitData.append('curatedCollection', JSON.stringify(formData.curatedCollection));
      submitData.append('sizes', JSON.stringify(formData.sizes));
      submitData.append('productDetails', JSON.stringify(formData.productDetails));

      selectedFiles.forEach((file) => submitData.append('productImages', file));
      if (editingId) existingImages.forEach(imgUrl => submitData.append('productImages', imgUrl));

      if (editingId) {
        await updateProduct(editingId, submitData);
        toast.success("Product updated successfully! 🛍️");
      } else {
        await createProduct(submitData);
        toast.success("New product created successfully! ✨");
      }

      closeModal();
      fetchProducts();
    } catch (error) {
      toast.error(error.msg || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted permanently. 🗑️");
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      toast.error(error.msg || "Failed to delete product.");
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Product Management</h1>
            <p className="text-sm text-gray-500 mt-1">Add, edit, or delete your store's inventory.</p>
          </div>
          <button onClick={openAddModal} className="bg-[#800020] hover:bg-[#600018] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md transition-colors whitespace-nowrap">
            <Plus size={20} /> Add New Product
          </button>
        </div>

        {/* --- SEARCH --- */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center">
          <Search className="text-gray-400 mr-3" size={20} />
          <input type="text" placeholder="Search products by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent border-none focus:outline-none text-gray-900" />
        </div>

        {/* --- TABLE --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold">Product</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan="4" className="p-10 text-center text-gray-500"><Loader2 className="animate-spin mx-auto mb-2 text-[#800020]" size={32} />Loading...</td></tr>
                ) : filteredProducts.length === 0 ? (
                  <tr><td colSpan="4" className="p-10 text-center text-gray-500">No products found.</td></tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-md bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                          {product.productImages && product.productImages[0] ? (
                            <img src={product.productImages[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-full h-full p-3 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-500">ID: {product._id.slice(-6).toUpperCase()}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600 capitalize">{product.department || 'N/A'}</td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{formatPrice(product.originalPrice)}</p>
                        {product.mrp > product.originalPrice && <p className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</p>}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-md"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(product._id, product.name)} className="text-red-600 hover:text-red-800 p-2 bg-red-50 rounded-md"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───────────── ADD / EDIT MODAL ───────────── */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-900"><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">

                {/* 1. Basic Info */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#800020] border-b pb-2">Basic Information</h4>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Product Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">MRP (₹) *</label>
                      <input type="number" name="mrp" value={formData.mrp} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Selling Price (₹) *</label>
                      <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020] h-24" />
                  </div>
                </div>

                {/* 2. Categories & Taxonomy */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#800020] border-b pb-2">Categories</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Department</label>
                      <select name="department" value={formData.department} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>
                        <option value="unisex">Unisex</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Product Type</label>
                      <select name="productType" value={formData.productType} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                        <option value="saree">Saree</option>
                        <option value="lehenga">Lehenga</option>
                        <option value="suit_set">Suit Set</option>
                        <option value="jewelry">Jewelry</option>
                        <option value="tshirt">T-Shirt</option>
                      </select>
                    </div>
                  </div>

                  {/* [NEW] BETTER UI: Multi-Select Chips / Pills */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Collection Type Chips */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Collection Type</label>
                      <div className="flex flex-wrap gap-2">
                        {collectionOptions.map((opt) => {
                          const isSelected = formData.collectionType.includes(opt.value);
                          return (
                            <button
                              type="button"
                              key={opt.value}
                              onClick={() => toggleMultiSelect('collectionType', opt.value)}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 transition-colors ${isSelected
                                  ? 'bg-[#800020] text-white border-[#800020]'
                                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                              {isSelected && <Check size={12} />}
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Curated Collection Chips */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Curated Collection</label>
                      <div className="flex flex-wrap gap-2">
                        {curatedOptions.map((opt) => {
                          const isSelected = formData.curatedCollection.includes(opt.value);
                          return (
                            <button
                              type="button"
                              key={opt.value}
                              onClick={() => toggleMultiSelect('curatedCollection', opt.value)}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1 transition-colors ${isSelected
                                  ? 'bg-[#800020] text-white border-[#800020]'
                                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                              {isSelected && <Check size={12} />}
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Product Details */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#800020] border-b pb-2">Product Details</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Fabric</label>
                      <input type="text" name="fabric" value={formData.productDetails.fabric} onChange={handleProductDetailsChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Work</label>
                      <input type="text" name="work" value={formData.productDetails.work} onChange={handleProductDetailsChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-gray-700">Inclusions</label>
                      <input type="text" name="inclusions" value={formData.productDetails.inclusions} onChange={handleProductDetailsChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-[#800020]" />
                    </div>
                  </div>
                </div>

                {/* 4. Sizes & Inventory */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h4 className="font-bold text-[#800020]">Sizes & Stock</h4>
                    <button type="button" onClick={addSizeRow} className="text-sm font-bold text-[#800020] hover:underline flex items-center gap-1"><Plus size={16} /> Add Size</button>
                  </div>
                  {formData.sizes.map((sizeObj, idx) => (
                    <div key={idx} className="flex gap-4 items-end bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-gray-500">Size</label>
                        <select name="sizeName" value={sizeObj.sizeName} onChange={(e) => handleSizeChange(idx, e)} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                          <option value="xs">XS</option><option value="s">S</option><option value="m">M</option>
                          <option value="l">L</option><option value="xl">XL</option><option value="xxl">XXL</option>
                          <option value="free_size">Free Size</option>
                        </select>
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-gray-500">Stock</label>
                        <input type="number" name="stock" value={sizeObj.stock} onChange={(e) => handleSizeChange(idx, e)} className="w-full p-2 border border-gray-300 rounded-md" min="0" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-gray-500">+ Price (Optional)</label>
                        <input type="number" name="additionalPrice" value={sizeObj.additionalPrice} onChange={(e) => handleSizeChange(idx, e)} className="w-full p-2 border border-gray-300 rounded-md" />
                      </div>
                      {formData.sizes.length > 1 && (
                        <button type="button" onClick={() => removeSizeRow(idx)} className="p-2 mb-0.5 text-red-500 hover:bg-red-50 rounded-md"><Trash2 size={18} /></button>
                      )}
                    </div>
                  ))}
                </div>

                {/* 5. Image Upload */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#800020] border-b pb-2">Product Images</h4>

                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-[#800020] transition-colors cursor-pointer"
                  >
                    <UploadCloud size={40} className="mb-2 text-[#800020]" />
                    <p className="font-medium">Click to upload images</p>
                    <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept="image/*" className="hidden" />
                  </div>

                  {(imagePreviews.length > 0 || existingImages.length > 0) && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {existingImages.map((imgUrl, idx) => (
                        <div key={`ext-${idx}`} className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-gray-200">
                          <img src={imgUrl} alt="Existing" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeExistingImage(idx)} className="absolute top-1 right-1 bg-white/90 text-red-600 p-1 rounded-full shadow-sm hover:bg-red-50"><X size={14} /></button>
                        </div>
                      ))}
                      {imagePreviews.map((previewUrl, idx) => (
                        <div key={`new-${idx}`} className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-green-500 border-2 shadow-sm">
                          <img src={previewUrl} alt="New Preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeNewImage(idx)} className="absolute top-1 right-1 bg-white/90 text-red-600 p-1 rounded-full shadow-sm hover:bg-red-50"><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 sticky bottom-0 bg-white pb-2">
                  <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-[#800020] text-white font-bold rounded-lg hover:bg-[#600018] flex justify-center items-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (editingId ? 'Update Product' : 'Publish Product')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
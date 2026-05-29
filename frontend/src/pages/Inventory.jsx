// src/pages/Inventory.jsx
import * as React from 'react';
import { useState } from 'react';
import { Search, Plus, Trash2, Edit, AlertTriangle, Tag, Layers, Landmark, ImageIcon, X, LayoutGrid, List } from 'lucide-react';
import { APP_STRINGS } from '../constants/strings';

const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: "Finolex 1.5 Sqmm 3-Core Flexible Cable", 
    brand: "Finolex", 
    category: "Electrical", 
    quantity: 12, 
    unit: "bundle", 
    rate: 1850, 
    purchaseRate: 1500, 
    dealerName: "Rupani Electrical Wholesalers",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&auto=format&fit=crop&q=80" // Sample wire image
  },
  { 
    id: 2, 
    name: "M10 Steel Hex Nut & Bolt Set (Zinc)", 
    brand: "Local Fasteners", 
    category: "Hardware", 
    quantity: 3, 
    unit: "box", 
    rate: 450, 
    purchaseRate: 310, 
    dealerName: "Apex Hardware Corp",
    image: "https://images.unsplash.com/photo-1610992015762-46dcca2f7035?w=400&auto=format&fit=crop&q=80" // Sample hardware fasteners image
  },
  { 
    id: 3, 
    name: "Philips 9W Stella LED Bright Bulb", 
    brand: "Philips", 
    category: "Electrical", 
    quantity: 65, 
    unit: "pcs", 
    rate: 95, 
    purchaseRate: 70, 
    dealerName: "Diamond Light Distributors",
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?w=400&auto=format&fit=crop&q=80" // Sample lighting image
  }
];

export default function Inventory() {
  const { INVENTORY_FORM, INVENTORY_VIEWS, CATEGORIES, UNITS } = APP_STRINGS;
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // Tracks layout orientation: 'grid' or 'list'
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    product_name: '',
    brand: '',
    category: CATEGORIES[0],
    quantity: '',
    unit: UNITS[0],
    rate: '',
    purchaseRate: '',
    dealerName: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: formData.product_name,
      brand: formData.brand,
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      rate: Number(formData.rate),
      purchaseRate: Number(formData.purchaseRate),
      dealerName: formData.dealerName || "N/A",
      image: imagePreview
    };

    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    setImagePreview(null);
    setFormData({ product_name: '', brand: '', category: CATEGORIES[0], quantity: '', unit: UNITS[0], rate: '', purchaseRate: '', dealerName: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* FILTER & VIEW CONFIGURATION ACTION PLINTH */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-white p-4 rounded-xl shadow-xs border border-slate-200">
        
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search items, brands..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Dynamic View Control Toggles */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <LayoutGrid size={15} /> <span className="hidden sm:inline">{INVENTORY_VIEWS.GRID}</span>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <List size={15} /> <span className="hidden sm:inline">{INVENTORY_VIEWS.LIST}</span>
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>

      </div>

      {/* RENDER VIEW GRID PATTERN */}
      {viewMode === 'grid' ? (
        
        /* ================= E-COMMERCE CARD GRID VIEW ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-slate-300 transition-all relative">
              
              {/* Product Card Top Deck */}
              <div>
                {/* Image Container Section */}
                <div className="h-44 w-full bg-slate-100 border-b border-slate-100 relative overflow-hidden flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="text-slate-400 flex flex-col items-center gap-1">
                      <ImageIcon size={32} strokeWidth={1.5} />
                    </div>
                  )}

                  {/* Stock Warning Absolute Badges */}
                  {product.quantity <= 0 ? (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">{INVENTORY_VIEWS.OUT_OF_STOCK}</span>
                  ) : product.quantity <= 5 ? (
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-xs">
                      <AlertTriangle size={11} /> {INVENTORY_VIEWS.LOW_STOCK}
                    </span>
                  ) : null}

                  {/* Categorization Accent Badge */}
                  <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                </div>

                {/* Text Context Padding Blocks */}
                <div className="p-4 space-y-2">
                  <div className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                    <Tag size={10} /> {product.brand}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm tracking-tight line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h4>
                  
                  {/* Stock counter indicators */}
                  <div className="text-xs font-semibold text-slate-500">
                    Remaining Stock: <span className={`font-bold ${product.quantity <= 5 ? 'text-rose-600' : 'text-slate-900'}`}>{product.quantity} {product.unit}</span>
                  </div>
                </div>
              </div>

              {/* Product Card Price Bottom Footer */}
              <div className="px-4 pb-4 pt-2 border-t border-slate-50 flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs bg-slate-50 p-2 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">{INVENTORY_VIEWS.BUYING_PRICE}</span>
                    <span className="font-mono text-slate-500 font-semibold">₹{product.purchaseRate}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-medium">{INVENTORY_VIEWS.SELLING_PRICE}</span>
                    <span className="font-mono text-slate-900 font-black text-base">₹{product.rate}</span>
                  </div>
                </div>

                {/* Edit Actions Overlay Strip */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                    <Edit size={14}/> Modify
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="flex items-center justify-center gap-1.5 py-2 border border-rose-100 rounded-xl text-xs font-bold text-rose-600 bg-rose-50/40 hover:bg-rose-600 hover:text-white transition-all cursor-pointer">
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        
        /* ================= REGULAR ADMINISTRATIVE TABLE VIEW ================= */
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Item & Brand</th>
                  <th className="px-6 py-4">Classification</th>
                  <th className="px-6 py-4">Stock Qty</th>
                  <th className="px-6 py-4">Purchase Price</th>
                  <th className="px-6 py-4">Selling Price</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded-xl border border-slate-200 shadow-xs bg-slate-50" />
                      ) : (
                        <div className="h-12 w-12 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400"><ImageIcon size={18} /></div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{product.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Tag size={12}/>{product.brand}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-200/50">{product.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${product.quantity <= 5 ? 'text-rose-600 bg-rose-50 px-2 py-1 rounded-sm' : 'text-slate-900'}`}>{product.quantity} {product.unit}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono">₹{product.purchaseRate}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 font-mono">₹{product.rate}</td>
                    <td className="px-6 py-4 text-right space-x-1 whitespace-nowrap">
                      <button className="text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-100 transition-colors"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(product.id)} className="text-slate-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-rose-50 transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DYNAMIC FORM MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="text-amber-500" size={20} /> {INVENTORY_FORM.MODAL_TITLE}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer">{INVENTORY_FORM.CLOSE_BTN}</button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* IMAGE FILE UPLOAD FIELD */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.IMAGE_LABEL}</label>
                {imagePreview ? (
                  <div className="relative h-32 w-full border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                    <img src={imagePreview} alt="Preview" className="h-full object-contain" />
                    <button type="button" onClick={() => setImagePreview(null)} className="absolute top-2 right-2 bg-rose-600 text-white p-1 rounded-full shadow-xs cursor-pointer"><X size={16} /></button>
                  </div>
                ) : (
                  <label className="h-28 w-full border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-xl bg-slate-50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors p-4 group">
                    <ImageIcon className="text-slate-400 group-hover:text-amber-500 transition-colors" size={28} />
                    <span className="text-xs font-medium text-slate-500 group-hover:text-slate-700">{INVENTORY_FORM.IMAGE_PLACEHOLDER}</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {/* Product Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.PRODUCT_NAME}</label>
                <input type="text" name="product_name" required value={formData.product_name} onChange={handleInputChange} placeholder="e.g., Philips 9W LED Bulb" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500" />
              </div>

              {/* Brand & Category Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.BRAND}</label>
                  <input type="text" name="brand" required value={formData.brand} onChange={handleInputChange} placeholder="e.g., Philips" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-hidden" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.CATEGORY}</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Volume Metrics Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.QUANTITY}</label>
                  <input type="number" name="quantity" required min="0" value={formData.quantity} onChange={handleInputChange} placeholder="QTY" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.UNIT}</label>
                  <select name="unit" value={formData.unit} onChange={handleInputChange} className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white">
                    {UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                </div>
              </div>

              {/* Cost Accounting Configuration */}
              <div className="grid grid-cols-2 gap-4 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                <div>
                  <label className="block text-xs font-bold text-amber-900 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.PURCHASE_RATE}</label>
                  <input type="number" name="purchaseRate" required min="0" value={formData.purchaseRate} onChange={handleInputChange} placeholder="Cost price ₹" className="w-full p-2.5 border border-amber-200 rounded-xl text-sm bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-900 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.RATE}</label>
                  <input type="number" name="rate" required min="0" value={formData.rate} onChange={handleInputChange} placeholder="Selling price ₹" className="w-full p-2.5 border border-amber-200 rounded-xl text-sm bg-white" />
                </div>
              </div>

              {/* Vendor Attribution Input */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1"><Landmark size={14}/> {INVENTORY_FORM.DEALER_NAME}</label>
                <input type="text" name="dealerName" value={formData.dealerName} onChange={handleInputChange} placeholder="Supplier details" className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white" />
              </div>

              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md cursor-pointer">{INVENTORY_FORM.SUBMIT_BTN}</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
// src/pages/Inventory.jsx
import * as React from 'react';
import { useState } from 'react';
import { Search, Plus, Trash2, Edit, AlertTriangle, Tag, Layers, Landmark } from 'lucide-react';
import { APP_STRINGS } from '../constants/strings';

// Comprehensive mock data representing your actual stock parameters
const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: "Finolex 1.5 Sqmm 3-Core Cable", 
    brand: "Finolex", 
    category: "Electrical", 
    quantity: 12, 
    unit: "bundle", 
    rate: 1850, 
    purchaseRate: 1500, 
    dealerName: "Rupani Electrical Wholesalers" 
  },
  { 
    id: 2, 
    name: "M10 Steel Hex Nut & Bolt Set", 
    brand: "Local Fasteners", 
    category: "Hardware", 
    quantity: 250, 
    unit: "pcs", 
    rate: 8, 
    purchaseRate: 4, 
    dealerName: "Apex Hardware Corp" 
  }
];

export default function Inventory() {
  const { INVENTORY_FORM, CATEGORIES, UNITS } = APP_STRINGS;
  
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State explicitly structured after your requirements
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: Date.now(), // Generate a unique mock ID
      name: formData.product_name,
      brand: formData.brand,
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      rate: Number(formData.rate),
      purchaseRate: Number(formData.purchaseRate),
      dealerName: formData.dealerName || "N/A"
    };

    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    
    // Reset form fields
    setFormData({
      product_name: '',
      brand: '',
      category: CATEGORIES[0],
      quantity: '',
      unit: UNITS[0],
      rate: '',
      purchaseRate: '',
      dealerName: ''
    });
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
      
      {/* SEARCH AND ACTION TOPBAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-xs border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products or brands..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* COMPREHENSIVE DATA LEDGER */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">Item & Brand</th>
                <th className="px-6 py-4">Classification</th>
                <th className="px-6 py-4">Stock Qty</th>
                <th className="px-6 py-4">Purchase Price</th>
                <th className="px-6 py-4">Selling Price</th>
                <th className="px-6 py-4">Supplier / Dealer</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Tag size={12}/>{product.brand}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-800 text-xs px-2.5 py-1 rounded-md font-medium border border-slate-200/50">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${product.quantity <= 5 ? 'text-rose-600 bg-rose-50 px-2 py-1 rounded-sm' : 'text-slate-900'}`}>
                      {product.quantity} {product.unit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono">₹{product.purchaseRate}</td>
                  <td className="px-6 py-4 font-bold text-slate-900 font-mono">₹{product.rate}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs truncate max-w-[150px]" title={product.dealerName}>
                    {product.dealerName}
                  </td>
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

      {/* DYNAMIC FORM MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 animate-fade-in">
            
            {/* Modal Title Banner */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="text-amber-500" size={20} />
                {INVENTORY_FORM.MODAL_TITLE}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {INVENTORY_FORM.CLOSE_BTN}
              </button>
            </div>

            {/* Core Inputs Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Product Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.PRODUCT_NAME}</label>
                <input 
                  type="text" name="product_name" required 
                  value={formData.product_name} onChange={handleInputChange} 
                  placeholder="e.g., Poly外 2.5 Sqmm Wire 90m" 
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all" 
                />
              </div>

              {/* Brand & Category Configuration Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.BRAND}</label>
                  <input 
                    type="text" name="brand" required 
                    value={formData.brand} onChange={handleInputChange} 
                    placeholder="e.g., Anchor, Havells, Bajaj" 
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.CATEGORY}</label>
                  <select 
                    name="category" value={formData.category} onChange={handleInputChange} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* Volume Metrics Configuration Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.QUANTITY}</label>
                  <input 
                    type="number" name="quantity" required min="0"
                    value={formData.quantity} onChange={handleInputChange} 
                    placeholder="e.g., 50" 
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.UNIT}</label>
                  <select 
                    name="unit" value={formData.unit} onChange={handleInputChange} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all"
                  >
                    {UNITS.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                  </select>
                </div>
              </div>

              {/* Cost Accounting Configuration Row */}
              <div className="grid grid-cols-2 gap-4 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                <div>
                  <label className="block text-xs font-bold text-amber-900 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.PURCHASE_RATE}</label>
                  <input 
                    type="number" name="purchase_rate" required min="0" step="any"
                    value={formData.purchaseRate} onChange={(e) => setFormData({...formData, purchaseRate: e.target.value})} 
                    placeholder="Cost price ₹" 
                    className="w-full p-2.5 border border-amber-200 rounded-xl text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-900 mb-1.5 uppercase tracking-wider">{INVENTORY_FORM.RATE}</label>
                  <input 
                    type="number" name="rate" required min="0" step="any"
                    value={formData.rate} onChange={handleInputChange} 
                    placeholder="Selling price ₹" 
                    className="w-full p-2.5 border border-amber-200 rounded-xl text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all" 
                  />
                </div>
              </div>

              {/* Vendor Attribution Input */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Landmark size={14}/> {INVENTORY_FORM.DEALER_NAME}
                </label>
                <input 
                  type="text" name="dealerName" 
                  value={formData.dealerName} onChange={handleInputChange} 
                  placeholder="e.g., Diamond Hardware Wholesalers, Mumbai" 
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all" 
                />
              </div>

              {/* Form Dispatch Submission Button */}
              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-sm transition-colors shadow-md hover:shadow-lg cursor-pointer mt-2"
              >
                {INVENTORY_FORM.SUBMIT_BTN}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
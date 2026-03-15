import React, { useState, useEffect } from 'react';
import { Search, Loader2, Eye, X, Package, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { getAllOrdersAdmin, updateOrderStatusAdmin } from '../services/apiService';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // ମୋଡାଲ୍ ପାଇଁ ଷ୍ଟେଟ୍
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ───────────── FETCH DATA ─────────────
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getAllOrdersAdmin();
      if (response && response.data) {
        setOrders(response.data); // ବ୍ୟାକେଣ୍ଡ୍ ରୁ ଆସୁଥିବା ଡାଟା ଷ୍ଟ୍ରକ୍ଚର୍ ଅନୁସାରେ
      }
    } catch (error) {
      toast.error(error.msg || "Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ───────────── UPDATE STATUS ─────────────
  const handleStatusChange = async (orderId, field, newValue) => {
    try {
      // ତୁରନ୍ତ UI କୁ ଅପଡେଟ୍ କରିବା (Optimistic Update)
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, [field]: newValue } : order
        )
      );

      const payload = { [field]: newValue };
      
      // ବ୍ୟାକେଣ୍ଡ୍ କୁ ଅପଡେଟ୍ ପଠାଇବା
      await updateOrderStatusAdmin(orderId, payload);
      toast.success(`Order status updated to ${newValue}`);
      
    } catch (error) {
      toast.error("Failed to update status. Reverting...");
      fetchOrders(); // ଯଦି ଫେଲ୍ ହୁଏ, ପୁଣିଥରେ ପ୍ରକୃତ ଡାଟା ଫେଚ୍ କରିବା
    }
  };

  // ───────────── UTILS ─────────────
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'processing': case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'out_for_delivery': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // ସର୍ଚ୍ଚ ଫିଲ୍ଟର୍ (ID କିମ୍ବା ଗ୍ରାହକଙ୍କ ନାମ ଦ୍ୱାରା)
  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">View and update customer orders.</p>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center">
          <Search className="text-gray-400 mr-3" size={20} />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name, or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none text-gray-900"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
                  <th className="p-4 font-bold">Order ID & Date</th>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Payment Status</th>
                  <th className="p-4 font-bold">Order Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-500">
                      <Loader2 className="animate-spin mx-auto mb-2 text-[#800020]" size={32} />
                      Loading orders...
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-500">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-gray-900">ORD-{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-900">{order.name}</p>
                        <p className="text-xs text-gray-500">{order.phone}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-[#800020]">{formatPrice(order.pricing.totalPrice)}</p>
                        <p className="text-xs text-gray-500">{order.paymentMethod === 'online' ? 'Online' : 'COD'}</p>
                      </td>
                      
                      {/* Payment Status Dropdown */}
                      <td className="p-4">
                        <select 
                            value={order.paymentStatus}
                            onChange={(e) => handleStatusChange(order._id, 'paymentStatus', e.target.value)}
                            className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full border outline-none cursor-pointer ${getStatusColor(order.paymentStatus)}`}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                        </select>
                      </td>

                      {/* Order Status Dropdown */}
                      <td className="p-4">
                        <select 
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, 'orderStatus', e.target.value)}
                            className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full border outline-none cursor-pointer ${getStatusColor(order.orderStatus)}`}
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <button 
                            onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}
                            className="text-blue-600 hover:text-blue-800 p-2 bg-blue-50 rounded-md transition-colors inline-flex items-center gap-1 text-sm font-bold"
                        >
                            <Eye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───────────── VIEW ORDER MODAL ───────────── */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
                <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900">Order Details</h3>
                    <p className="text-sm text-gray-500">ORD-{selectedOrder._id.toUpperCase()}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                  
                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Phone size={16} className="text-[#800020]"/> Customer & Shipping</h4>
                      <p className="text-sm text-gray-700"><span className="font-bold">Name:</span> {selectedOrder.name}</p>
                      <p className="text-sm text-gray-700"><span className="font-bold">Phone:</span> {selectedOrder.phone}</p>
                      <div className="mt-2 flex gap-2 items-start text-sm text-gray-700">
                          <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
                          <p>
                              {selectedOrder.shippingAddress.flat}, {selectedOrder.shippingAddress.area},<br/>
                              {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                          </p>
                      </div>
                  </div>

                  {/* Items List */}
                  <div>
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Package size={16} className="text-[#800020]"/> Ordered Items ({selectedOrder.products.length})</h4>
                      <div className="space-y-3">
                          {selectedOrder.products.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                  <div>
                                      {/* API ରୁ populate ହୋଇ ଆସିଥିଲେ ନାମ ଦେଖାଇବ, ନଚେତ୍ Product ID */}
                                      <p className="font-bold text-gray-900">{item.product?.name || `Product ID: ${item.product}`}</p>
                                      <p className="text-xs text-gray-500">Size: <span className="uppercase">{item.size}</span> | Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                          <span>Subtotal</span>
                          <span>{formatPrice(selectedOrder.pricing.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                          <span>GST</span>
                          <span>{formatPrice(selectedOrder.pricing.gst)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-[#800020] pt-2">
                          <span>Total Amount</span>
                          <span>{formatPrice(selectedOrder.pricing.totalPrice)}</span>
                      </div>
                  </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
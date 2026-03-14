import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  CheckCircle2, Download, Home, CreditCard, MapPin, 
  Printer, ArrowRight, FileText 
} from 'lucide-react';

export default function SuccessPage() {
  const location = useLocation();
  const containerRef = useRef(null);
  
  // --- MOCK DATA ---
  const orderData = location.state || {
    orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toLocaleDateString(),
    method: 'upi',
    customer: {
        name: "Rajesh Kumar",
        mobile: "+91 98765 43210"
    },
    items: [
        {
            id: 1,
            name: "Promotional Brochures",
            type: "Print",
            details: "A4 Tri-fold",
            hsn: "4901",
            rate: 15,
            qty: 500,
            unit: "pcs",
            gstRate: 5,
            baseAmount: 7500
        },
        {
            id: 2,
            name: "Wall Calendars",
            type: "Print",
            details: "12-Page Matte Finish",
            hsn: "4910",
            rate: 250,
            qty: 50,
            unit: "pcs",
            gstRate: 12,
            baseAmount: 12500
        },
        {
            id: 3,
            name: "Employee ID Cards",
            type: "Stationery",
            details: "PVC with Lanyard", 
            hsn: "4820",
            rate: 85,
            qty: 100,
            unit: "pcs",
            gstRate: 18,
            baseAmount: 8500
        }
    ]
  };

  // --- CALCULATIONS ---
  const totals = orderData.items.reduce((acc, item) => {
      const itemTax = item.baseAmount * (item.gstRate / 100);
      return {
          subtotal: acc.subtotal + item.baseAmount,
          totalTax: acc.totalTax + itemTax
      };
  }, { subtotal: 0, totalTax: 0 });

  const grandTotal = totals.subtotal + totals.totalTax;

  // --- ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".left-col", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".right-col", { x: 50, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  // --- PDF GENERATION (Keeps HSN/GST for Official Use) ---
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22); doc.setTextColor(0, 0, 0);
    doc.text("MoGraphics Agency", 14, 20);
    doc.setFontSize(10); doc.setTextColor(100);
    doc.text("Bhubaneswar, Odisha", 14, 26);
    doc.text("GSTIN: 21AAAAA0000A1Z5", 14, 31);

    // Invoice Meta
    doc.setFontSize(12); doc.setTextColor(0);
    doc.text("TAX INVOICE", 150, 20, { align: 'right' });
    doc.setFontSize(10);
    doc.text(`Invoice #: ${orderData.orderId}`, 150, 26, { align: 'right' });
    doc.text(`Date: ${orderData.date}`, 150, 31, { align: 'right' });

    // Customer
    doc.line(14, 35, 196, 35);
    doc.text(`Bill To: ${orderData.customer.name}`, 14, 42);
    doc.text(`Mobile: ${orderData.customer.mobile}`, 14, 47);

    // Table Data (Detailed for PDF)
    const tableRows = orderData.items.map(item => [
        item.name + `\n(${item.details})`, 
        item.hsn,
        item.gstRate + "%",
        item.qty,
        formatPrice(item.baseAmount)
    ]);

    doc.autoTable({
        startY: 55,
        head: [['Description', 'HSN', 'GST', 'Qty', 'Taxable Val']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [20, 20, 20], textColor: [255, 255, 255] },
        styles: { fontSize: 9, cellPadding: 3, valign: 'middle' },
        columnStyles: { 0: { cellWidth: 70 }, 4: { halign: 'right' } }
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    
    // Totals
    doc.text("Total Taxable Value:", 140, finalY);
    doc.text(formatPrice(totals.subtotal), 196, finalY, { align: 'right' });

    doc.text("Total GST:", 140, finalY + 6);
    doc.text(formatPrice(totals.totalTax), 196, finalY + 6, { align: 'right' });

    doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("Grand Total:", 140, finalY + 16);
    doc.text(formatPrice(grandTotal), 196, finalY + 16, { align: 'right' });

    doc.save(`Invoice_${orderData.orderId}.pdf`);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-20 overflow-x-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* --- LEFT COLUMN: Message & Actions --- */}
        <div className="left-col pt-10">
            <div className="w-20 h-20 bg-green-500 text-black rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_-10px_rgba(34,197,94,0.5)]">
                <CheckCircle2 size={40} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
                Order <br/> <span className="text-[#D4E821]">Confirmed</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-md leading-relaxed mb-10">
                Your order <strong>#{orderData.orderId}</strong> has been successfully placed. We've sent a confirmation email to your registered address.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                 <button 
                    onClick={handleDownloadPDF}
                    className="flex-1 bg-[#D4E821] text-black font-bold uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-colors group"
                 >
                    <Download size={20} /> 
                    <span>Download Invoice</span>
                 </button>
                 
                 <Link to="/" className="flex-1 bg-[#1a1a1a] border border-white/10 text-white font-bold uppercase py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#222] transition-colors">
                    <Home size={20} /> 
                    <span>Back to Home</span>
                 </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-4">What happens next?</h4>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">1</div>
                        <div>
                            <p className="text-sm font-bold text-white">Order Processing</p>
                            <p className="text-xs text-gray-500">We verify your requirements and files.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">2</div>
                        <div>
                            <p className="text-sm font-bold text-white">Design & Production</p>
                            <p className="text-xs text-gray-500">Our team starts working on your assets.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: The Invoice UI --- */}
        <div className="right-col w-full">
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                 {/* Top Decor */}
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4E821] to-transparent opacity-50"></div>

                 <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 pb-8 border-b border-white/10">
                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-tighter">Receipt</h3>
                            <p className="text-xs text-gray-500 font-mono mt-1">{orderData.date}</p>
                        </div>
                        <div className="text-right">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-bold uppercase mb-2">
                                <CheckCircle2 size={12} /> Paid
                             </div>
                             <p className="text-sm text-gray-400 font-mono">
                                {orderData.method === 'upi' ? 'Online (UPI)' : 'Cash'}
                             </p>
                        </div>
                    </div>

                    {/* Simple Item List (No HSN/GST Columns) */}
                    <div className="mb-8">
                        <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">
                            <span>Item Description</span>
                            <span>Amount</span>
                        </div>
                        
                        <div className="space-y-6">
                            {orderData.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-base font-bold text-white leading-tight">{item.name}</h4>
                                        <p className="text-xs text-gray-500 font-mono mt-1">
                                            {item.details} • {item.qty} {item.unit}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-base font-mono text-white">
                                            {formatPrice(item.baseAmount)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals Section */}
                    <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/5 space-y-3">
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Subtotal</span>
                            <span className="font-mono">{formatPrice(totals.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                            <span>Total GST</span>
                            <span className="font-mono">{formatPrice(totals.totalTax)}</span>
                        </div>
                        <div className="border-t border-white/10 pt-4 flex justify-between items-end mt-2">
                            <span className="text-base font-bold uppercase text-white">Grand Total</span>
                            <span className="text-3xl font-bold text-[#D4E821] font-mono leading-none">
                                {formatPrice(grandTotal)}
                            </span>
                        </div>
                    </div>

                 </div>

                 <div className="bg-[#1a1a1a] p-4 text-center border-t border-white/5 flex items-center justify-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
                    <FileText size={14} /> Official Tax Invoice available via download
                 </div>
            </div>
        </div>

      </div>

    </div>
  );
}
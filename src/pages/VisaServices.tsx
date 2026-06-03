import { useState } from 'react';
import { Send, FileText, Check, MessageSquare, ClipboardCheck } from 'lucide-react';
import { visasData } from '../store/mockData';
import { useAppStore } from '../store/useAppStore';

export default function VisaServices() {
  const onAddLead = useAppStore(state => state.addLead);
  const [selectedCountry, setSelectedCountry] = useState<string>('Dubai (UAE)');
  
  // Chatbot State
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; docs?: string[] }>>([
    {
      sender: 'assistant',
      text: 'Hello! I am your Bookaro Visa Assistant. Pick a country from the popular list above or type your question below! I can fetch visa fees, requirements, and processing times instantly.',
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [formCountry, setFormCountry] = useState('Dubai (UAE)');
  const [travelDate, setTravelDate] = useState('');
  const [success, setSuccess] = useState(false);

  const activeVisa = visasData.find(v => v.country === selectedCountry) || visasData[0];

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setFormCountry(country);
    
    const info = visasData.find(v => v.country === country);
    if (!info) return;

    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: `Tell me about visa details for ${country}.`
      },
      {
        sender: 'assistant',
        text: `Here are the official visa guidelines for **${country}**:\n\n• **Fees:** ${info.fee}\n• **Processing Time:** ${info.processingTime}\n• **Eligibility:** ${info.eligibility}\n\n**Here are the core documents you'll need to submit:**`,
        docs: info.documents
      }
    ]);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.toLowerCase();
    setMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');

    setTimeout(() => {
      // Find matching country
      const matched = visasData.find(v => query.includes(v.country.toLowerCase()) || v.country.toLowerCase().includes(query));
      
      if (matched) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: `Perfect, here is what I found for **${matched.country}**:\n\n• **Fees:** ${matched.fee}\n• **Processing Time:** ${matched.processingTime}\n• **Eligibility:** ${matched.eligibility}`,
            docs: matched.documents
          }
        ]);
      } else if (query.includes('fee') || query.includes('cost') || query.includes('price')) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: 'Visa fees range from ₹3,200 (Singapore) to ₹15,500 (US). You can click on the popular countries grid above to see exact fee breakups instantly.'
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            text: "I didn't quite catch the specific country you are traveling to. Please choose one of our highly requested visas above: **Dubai, Singapore, Thailand, Schengen, US, or China**!"
          }
        ]);
      }
    }, 500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onAddLead({
      name,
      phone,
      destination: formCountry,
      travelDate,
      type: 'visa',
      status: 'new',
      source: `Visa Assistance: ${formCountry}`
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setTravelDate('');
    }, 2000);
  };

  return (
    <div className="pt-20 min-h-screen pb-20 bg-slate-50">
      {/* Hero Banner */}
      <div className="relative h-64 bg-slate-900 flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80" 
          alt="Visa Services" 
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-heading font-extrabold text-white mb-2">
            Fast & Reliable Visa Services
          </h1>
          <p className="text-slate-300 text-sm font-body">
            Professional visa guidance and processing from Ambernath to destinations worldwide.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Popular Visas Grid */}
        <div className="mb-12">
          <h2 className="font-heading font-extrabold text-2xl text-darktext mb-6">Popular Countries</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {visasData.map((visa, idx) => (
              <div
                key={idx}
                onClick={() => handleCountrySelect(visa.country)}
                className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                  selectedCountry === visa.country
                    ? 'bg-white border-primary-purple shadow-md ring-2 ring-primary-purple/20'
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'
                }`}
              >
                <span className="text-4xl block mb-2">{visa.flag}</span>
                <span className="font-heading font-bold text-sm text-slate-800 block">{visa.country}</span>
                <span className="text-[10px] text-primary-purple font-heading font-semibold mt-1 block">
                  {visa.fee.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visa Core Info & Assistant Chat Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Info Board & Interactive Chat */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Visual Document Checker Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-100 mb-6">
                <ClipboardCheck className="h-5 w-5 text-primary-purple" />
                <h3 className="font-heading font-extrabold text-lg text-darktext">
                  Visa Overview: {activeVisa.country}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-2xl">
                  <p className="text-[10px] text-primary-purple uppercase tracking-wider font-heading font-bold">Standard Fee</p>
                  <p className="text-lg font-heading font-extrabold text-slate-850 mt-1">{activeVisa.fee}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <p className="text-[10px] text-trust-blue uppercase tracking-wider font-heading font-bold">Processing Time</p>
                  <p className="text-sm font-heading font-bold text-slate-850 mt-1">{activeVisa.processingTime}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl">
                  <p className="text-[10px] text-[#10B981] uppercase tracking-wider font-heading font-bold">Eligibility</p>
                  <p className="text-[10px] text-slate-600 font-body leading-relaxed mt-1">{activeVisa.eligibility}</p>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs text-slate-500 uppercase tracking-widest mb-3">Required Documents</h4>
                <div className="space-y-2">
                  {activeVisa.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 font-body">
                      <div className="h-5 w-5 rounded-full bg-slate-100 text-[#10B981] flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="mt-0.5">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Visa FAQ Chatbot assistant */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[400px]">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-3xl flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <MessageSquare className="h-4 w-4 text-primary-purple" />
                <span className="font-heading font-bold text-xs text-slate-700">Bookaro Visa Assistant</span>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs ${
                      msg.sender === 'user' 
                        ? 'bg-primary-purple text-white' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      {msg.docs && (
                        <div className="mt-3 space-y-1 bg-white/40 p-2.5 rounded-xl border border-white/20">
                          {msg.docs.map((doc, dIdx) => (
                            <div key={dIdx} className="flex items-center space-x-1.5 text-[10px] text-slate-800">
                              <FileText className="h-3.5 w-3.5 flex-shrink-0 text-slate-650" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Ask a question about visa docs or fees..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-primary-purple"
                />
                <button
                  type="submit"
                  className="bg-primary-purple hover:bg-primary-dark text-white p-2 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Visa Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-24">
              <h3 className="font-heading font-extrabold text-lg text-darktext mb-1">Visa Enquiry Form</h3>
              <p className="text-xs text-lighttext mb-6">Drop your details. Our visa processing unit will connect with you.</p>

              {success ? (
                <div className="text-center py-8">
                  <div className="h-10 w-10 bg-green-100 text-[#10B981] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-800">Request Sent!</h4>
                  <p className="text-[10px] text-lighttext mt-1">We will review details & ping you on WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patil"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Destination Country
                    </label>
                    <select
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                    >
                      {visasData.map((visa, idx) => (
                        <option key={idx} value={visa.country}>{visa.country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Expected Travel Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary-purple"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-purple to-accent-pink text-white py-3 rounded-xl font-heading font-bold text-xs shadow-md"
                  >
                    Request Visa Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

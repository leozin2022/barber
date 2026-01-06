
import React, { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: string;
  availableServices?: string[];
  whatsappNumber: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedService, availableServices = [], whatsappNumber }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    data: '',
    horario: '',
    tipoServico: 'Corte e Barba'
  });

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, tipoServico: selectedService }));
    } else if (availableServices.length > 0) {
      setFormData(prev => ({ ...prev, tipoServico: availableServices[0] }));
    }
  }, [selectedService, availableServices]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Olá! Gostaria de agendar um horário.%0A%0A*Detalhes:*%0A- *Serviço:* ${formData.tipoServico}%0A- *Nome:* ${formData.nome}%0A- *Telefone:* ${formData.telefone}%0A- *Data:* ${formData.data}%0A- *Horário:* ${formData.horario}`;
    
    // Usa o número dinâmico do Sheets
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-background-card border border-white/10 p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold text-white">Redirecionando...</h3>
            <p className="text-gray-400 mt-2">Abrindo seu WhatsApp.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-6">Agendar Horário</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Serviço</label>
                <select name="tipoServico" value={formData.tipoServico} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-primary outline-none">
                  {availableServices.map(s => <option key={s} value={s} className="bg-background-card">{s}</option>)}
                </select>
              </div>
              <input required name="nome" value={formData.nome} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-primary outline-none" placeholder="Seu Nome" />
              <input required type="tel" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-primary outline-none" placeholder="Telefone" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="date" name="data" value={formData.data} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-primary outline-none [color-scheme:dark]" />
                <input required type="time" name="horario" value={formData.horario} onChange={handleChange} className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-primary outline-none [color-scheme:dark]" />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-primary text-black font-bold rounded-xl hover:bg-primary-dark transition-all">
                Confirmar no WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;


import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import { SERVICES, CONTACT, HERO_IMAGE, MAP_IMAGE } from './constants';

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  
  const brandName = "Barbearia Gold";
  const whatsappNumber = "5589999867161";

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background-dark font-display text-white selection:bg-primary selection:text-black">
      <Navbar onAgendar={() => openBooking()} brandName={brandName} />

      <main className="flex flex-col">
        {/* HERO */}
        <section id="inicio" className="relative flex min-h-[750px] w-full items-center justify-center px-6 py-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] scale-105" 
              style={{ backgroundImage: `url(${HERO_IMAGE})`, animation: 'slow-zoom 30s linear infinite alternate' }}
            ></div>
          </div>
          
          <div className="relative z-20 mx-auto flex max-w-[900px] flex-col items-center text-center gap-8">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-[10px] font-black text-primary uppercase tracking-[0.4em] backdrop-blur-md">
              Desde 2024 • Excelência
            </span>
            <h1 className="text-7xl font-black leading-[0.85] tracking-tighter text-white md:text-[120px] drop-shadow-2xl">
              ESTILO & <span className="text-primary">TRADIÇÃO</span>
            </h1>
            <p className="max-w-xl text-lg text-gray-300 font-medium md:text-xl opacity-90 leading-relaxed">
              Onde a técnica clássica encontra o luxo moderno. Sua melhor versão começa aqui.
            </p>
            <button 
              onClick={() => openBooking()}
              className="mt-4 h-16 min-w-[280px] rounded-2xl bg-primary px-8 text-sm font-black text-black shadow-2xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Agendar Visita
            </button>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 bg-background-dark px-6" id="servicos">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-black text-white md:text-6xl mb-4 tracking-tighter uppercase">Nossos Serviços</h2>
              <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {SERVICES.map((service) => (
                <div key={service.id} className="group flex flex-col overflow-hidden rounded-[40px] bg-background-card border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-2xl">
                  <div className="aspect-[12/10] overflow-hidden bg-white/5">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-10">
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{service.name}</h3>
                      <span className="text-xl font-black text-primary">{service.price}</span>
                    </div>
                    <p className="mb-10 text-gray-500 text-sm leading-relaxed flex-1">{service.description}</p>
                    <button 
                      onClick={() => openBooking(service.name)}
                      className={`w-full py-5 rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase transition-all ${
                        service.popular 
                        ? 'bg-primary text-black hover:brightness-110 shadow-lg shadow-primary/20' 
                        : 'border border-primary/40 text-primary hover:bg-primary hover:text-black'
                      }`}
                    >
                      Reservar Agora
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCALIZAÇÃO */}
        <section className="py-32 bg-[#0a0a0a]" id="localizacao">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-5xl font-black text-white md:text-7xl mb-12 tracking-tighter uppercase leading-none">Estamos no <br/><span className="text-primary">Coração</span> da Cidade</h2>
                <div className="space-y-10">
                  <div className="flex items-start gap-8">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary">
                      <span className="material-symbols-outlined text-3xl">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest opacity-50">Local</h4>
                      <p className="text-gray-300 text-xl font-medium leading-tight">{CONTACT.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary">
                      <span className="material-symbols-outlined text-3xl">schedule</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest opacity-50">Horários</h4>
                      <p className="text-gray-300 font-medium">{CONTACT.hours.week}</p>
                      <p className="text-gray-300 font-medium">{CONTACT.hours.saturday}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[550px] rounded-[50px] overflow-hidden border border-white/10 relative group shadow-3xl bg-white/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] group-hover:scale-110 opacity-60" 
                  style={{ backgroundImage: `url(${MAP_IMAGE})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} 
                  target="_blank" rel="noreferrer"
                  className="absolute bottom-10 left-10 right-10 bg-white text-black py-5 rounded-2xl font-black text-center shadow-2xl hover:bg-primary transition-all uppercase tracking-[0.2em] text-[10px]"
                >
                  Traçar Rota no Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-24 border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
            <div className="mx-auto size-20 bg-primary text-black rounded-[25px] flex items-center justify-center mb-10 shadow-2xl shadow-primary/20">
              <span className="material-symbols-outlined text-4xl">content_cut</span>
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">{brandName}</h3>
            <p className="text-gray-600 mb-12 text-xs tracking-[0.5em] uppercase">Estilo • Tradição • Luxo</p>
            <div className="flex justify-center gap-12 mb-16 text-sm font-black uppercase tracking-widest">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="text-primary hover:text-white transition-colors">WhatsApp</a>
              <span className="text-gray-400">{CONTACT.phone}</span>
            </div>
            <p className="text-[10px] text-gray-800 font-bold uppercase tracking-[0.8em]">© {new Date().getFullYear()} {brandName}</p>
        </div>
      </footer>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedService={selectedService}
        availableServices={SERVICES.map(s => s.name)}
        whatsappNumber={whatsappNumber}
      />

      <style>{`
        @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        ::selection { background: #eebd2b; color: #000; }
      `}</style>
    </div>
  );
};

export default App;

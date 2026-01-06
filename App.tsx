
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import { SERVICES, CONTACT, HERO_IMAGE, MAP_IMAGE } from './constants';

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  
  // Usando diretamente os dados de constants.tsx
  const brandName = "Barbearia Gold";
  const whatsappNumber = "5589999867161"; // Seu número padrão
  const logoUrl = ""; // Deixe vazio para usar o ícone padrão ou cole o link aqui

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background-dark font-display text-white selection:bg-primary selection:text-black">
      <Navbar onAgendar={() => openBooking()} brandName={brandName} logoUrl={logoUrl} />

      <main className="flex flex-col">
        {/* HERO SECTION */}
        <section id="inicio" className="relative flex min-h-[700px] w-full items-center justify-center px-6 py-20 lg:min-h-[850px]">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat animate-slow-zoom" 
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            ></div>
          </div>
          <div className="relative z-20 mx-auto flex max-w-[1000px] flex-col items-center text-center gap-10">
            <div className="flex flex-col items-center gap-6">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-bold text-primary uppercase tracking-[0.3em] backdrop-blur-md">
                Experiência Premium
              </span>
              <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-white md:text-9xl drop-shadow-2xl">
                BARBEARIA <span className="text-primary">GOLD</span>
              </h1>
              <p className="max-w-xl text-lg text-gray-200 font-medium md:text-xl leading-relaxed opacity-90">
                Onde a tradição encontra a modernidade. Reserve seu momento premium com nossos especialistas.
              </p>
            </div>
            <button 
              onClick={() => openBooking()}
              className="h-16 min-w-[260px] rounded-xl bg-primary px-8 text-lg font-black text-background-dark shadow-xl hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Agendar Agora
            </button>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-background-dark px-6" id="servicos">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-20 text-center">
              <h2 className="text-4xl font-black text-white md:text-5xl mb-6 tracking-tighter uppercase">Nossos Serviços</h2>
              <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <div key={service.id} className="group flex flex-col overflow-hidden rounded-3xl bg-background-card border border-white/5 transition-all hover:border-primary/30 shadow-lg">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800')}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors uppercase">{service.name}</h3>
                      <span className="text-lg font-black text-primary">{service.price}</span>
                    </div>
                    <p className="mb-8 text-gray-400 text-sm leading-relaxed flex-1">{service.description}</p>
                    <button 
                      onClick={() => openBooking(service.name)}
                      className={`w-full py-4 rounded-xl font-black text-xs tracking-widest uppercase transition-all ${
                        service.popular 
                        ? 'bg-primary text-background-dark hover:brightness-110' 
                        : 'border border-primary/30 text-primary hover:bg-primary hover:text-background-dark'
                      }`}
                    >
                      {service.popular ? 'Mais Procurado' : 'Reservar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION SECTION */}
        <section className="py-24 bg-[#121212]" id="localizacao">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-4xl font-black text-white md:text-5xl mb-10 tracking-tighter uppercase">Localização</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-wider">Endereço</h4>
                      <p className="text-gray-400 text-lg leading-relaxed">{CONTACT.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="material-symbols-outlined text-primary">schedule</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1 uppercase text-sm tracking-wider">Horários</h4>
                      <p className="text-gray-400">{CONTACT.hours.week}</p>
                      <p className="text-gray-400">{CONTACT.hours.saturday}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[450px] rounded-[32px] overflow-hidden border-4 border-white/5 relative group shadow-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110" 
                  style={{ backgroundImage: `url(${MAP_IMAGE})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} 
                  target="_blank" rel="noreferrer"
                  className="absolute bottom-8 left-8 right-8 bg-white text-black py-4 rounded-xl font-black text-center shadow-2xl hover:bg-primary transition-all uppercase tracking-widest text-xs"
                >
                  Abrir no Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-20 border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
            <div className="mx-auto size-16 bg-primary text-black rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl">content_cut</span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">{brandName}</h3>
            <p className="text-gray-500 mb-10 text-sm tracking-widest uppercase">Estilo e Tradição</p>
            <div className="flex justify-center gap-8 mb-12">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="text-primary font-bold hover:underline">WhatsApp</a>
              <span className="text-white/10">|</span>
              <span className="text-gray-400 font-bold">{CONTACT.phone}</span>
            </div>
            <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em]">© {new Date().getFullYear()} {brandName}</p>
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
        @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        .animate-slow-zoom { animation: slow-zoom 20s ease-in-out infinite alternate; }
        ::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
      `}</style>
    </div>
  );
};

export default App;

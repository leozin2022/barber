
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BookingModal from './components/BookingModal';
import { SERVICES as INITIAL_SERVICES, CONTACT as INITIAL_CONTACT, HERO_IMAGE as INITIAL_HERO, MAP_IMAGE as INITIAL_MAP } from './constants';
import { Service, ContactInfo } from './types';

/**
 * 💡 DICA PARA O VERCEL:
 * No painel do Vercel, vá em Settings > Environment Variables e adicione:
 * Key: VITE_SHEET_ID
 * Value: (O ID da sua planilha)
 */
const SHEET_ID = (import.meta as any).env?.VITE_SHEET_ID || '1QW5L9H8X_Exemplo_Copie_O_Seu_ID_Aqui'; 

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  
  // Estados dinâmicos iniciados com os valores de constants.tsx (Fallback)
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [contact, setContact] = useState<ContactInfo>(INITIAL_CONTACT);
  const [heroImage, setHeroImage] = useState(INITIAL_HERO);
  const [mapImage, setMapImage] = useState(INITIAL_MAP);
  const [brandName, setBrandName] = useState('Barbearia Gold');
  const [logoUrl, setLogoUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('5589999867161');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Se for o ID de exemplo, não tenta buscar e usa o local imediatamente
      if (SHEET_ID.includes('Exemplo')) {
        console.log('Ambiente de exemplo detectado. Usando dados locais.');
        setIsLoading(false);
        return;
      }

      try {
        const servicesUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Servicos`;
        const configUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=Configuracoes`;

        const parseSheet = (text: string) => {
          const json = JSON.parse(text.substring(47).slice(0, -2));
          return json.table.rows.map((row: any) => row.c.map((cell: any) => cell?.v));
        };

        const [resServices, resConfig] = await Promise.all([
          fetch(servicesUrl).then(r => {
            if (!r.ok) throw new Error('Falha ao buscar serviços');
            return r.text();
          }),
          fetch(configUrl).then(r => {
            if (!r.ok) throw new Error('Falha ao buscar configurações');
            return r.text();
          })
        ]);

        const servicesDataRaw = parseSheet(resServices);
        const configDataRaw = parseSheet(resConfig);

        // Processar Configurações
        const config: any = {};
        configDataRaw.forEach((row: any) => {
          if (row[0]) config[row[0]] = row[1];
        });

        if (config.nome_barbearia) setBrandName(String(config.nome_barbearia));
        if (config.logo_url) setLogoUrl(String(config.logo_url));
        if (config.hero_image) setHeroImage(String(config.hero_image));
        if (config.map_image) setMapImage(String(config.map_image));
        if (config.whatsapp_numero) setWhatsappNumber(String(config.whatsapp_numero).replace(/\D/g, ''));

        setContact({
          address: String(config.endereco || INITIAL_CONTACT.address),
          phone: String(config.telefone || INITIAL_CONTACT.phone),
          email: String(config.email || INITIAL_CONTACT.email),
          hours: {
            week: String(config.horario_semana || INITIAL_CONTACT.hours.week),
            saturday: String(config.horario_sabado || INITIAL_CONTACT.hours.saturday)
          }
        });

        // Processar Serviços
        const hasHeader = servicesDataRaw[0][0] === 'ID' || servicesDataRaw[0][1] === 'Nome';
        const rows = hasHeader ? servicesDataRaw.slice(1) : servicesDataRaw;

        const mappedServices: Service[] = rows
          .map((s: any) => ({
            id: String(s[0] || Math.random()),
            name: String(s[1] || 'Serviço'),
            price: String(s[2] || 'Sob consulta'),
            description: String(s[3] || ''),
            image: String(s[4] || ''),
            popular: String(s[5] || '').toLowerCase().includes('sim')
          }))
          .filter(s => s.name && s.name !== 'undefined' && s.name !== 'null');

        if (mappedServices.length > 0) setServices(mappedServices);

      } catch (error) {
        console.error('Sincronização falhou. Mantendo dados locais de segurança.', error);
        // Não resetamos para os iniciais aqui porque o estado já começou com eles
      } finally {
        // Garantimos um tempo mínimo de loading para a animação não "piscar"
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchData();
  }, []);

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-dark">
        <div className="flex flex-col items-center gap-6">
          <div className="relative size-20">
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/20"></div>
            <div className="flex h-full w-full items-center justify-center rounded-full border-b-4 border-primary animate-spin"></div>
          </div>
          <p className="font-display font-black text-primary animate-pulse text-xl tracking-[0.3em] uppercase">Preparando Estilo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark font-display text-white selection:bg-primary selection:text-black">
      <Navbar onAgendar={() => openBooking()} brandName={brandName} logoUrl={logoUrl} />

      <main className="flex flex-col">
        {/* HERO SECTION */}
        <section id="inicio" className="relative flex min-h-[750px] w-full items-center justify-center px-6 py-20 lg:min-h-[900px]">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/50 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <div 
              className="h-full w-full bg-cover bg-center bg-no-repeat animate-slow-zoom" 
              style={{ backgroundImage: `url(${heroImage})` }}
            ></div>
          </div>
          <div className="relative z-20 mx-auto flex max-w-[1000px] flex-col items-center text-center gap-12">
            <div className="flex flex-col items-center gap-6">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-bold text-primary uppercase tracking-[0.2em] backdrop-blur-md">
                {brandName} • Desde 2015
              </div>
              <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-white md:text-[100px] lg:text-[120px] drop-shadow-2xl">
                O SEU <span className="text-primary">ESTILO</span>,<br/>NOSSA ARTE.
              </h1>
              <p className="max-w-2xl text-lg text-gray-200 font-medium md:text-2xl drop-shadow-md leading-relaxed opacity-90">
                Onde a tradição encontra a modernidade. Reserve seu momento premium com nossos especialistas.
              </p>
            </div>
            <button 
              onClick={() => openBooking()}
              className="h-20 min-w-[280px] rounded-2xl bg-primary px-10 text-xl font-black text-background-dark shadow-[0_20px_50px_-10px_rgba(238,189,43,0.4)] hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Agendar Horário
            </button>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-32 bg-background-dark px-6" id="servicos">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-24 text-center">
              <h2 className="text-5xl font-black text-white md:text-6xl mb-8 tracking-tighter uppercase">Nossos Serviços</h2>
              <div className="h-2 w-32 bg-primary mx-auto rounded-full shadow-[0_0_20px_rgba(238,189,43,0.5)]"></div>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.id} className="group relative flex flex-col overflow-hidden rounded-[32px] bg-background-card border border-white/5 transition-all hover:border-primary/40 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-900">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                      onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800')}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-10">
                    <div className="mb-6 flex items-start justify-between">
                      <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight uppercase">{service.name}</h3>
                      <span className="text-xl font-black text-primary drop-shadow-sm">{service.price}</span>
                    </div>
                    <p className="mb-10 text-gray-400 text-lg leading-relaxed flex-1">{service.description}</p>
                    <button 
                      onClick={() => openBooking(service.name)}
                      className={`w-full py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all shadow-lg ${
                        service.popular 
                        ? 'bg-primary text-background-dark hover:brightness-110 shadow-primary/20' 
                        : 'border-2 border-primary/20 text-primary hover:bg-primary hover:text-background-dark'
                      }`}
                    >
                      {service.popular ? 'Agendar (Mais Procurado)' : `Agendar ${service.name}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCATION SECTION */}
        <section className="py-32 bg-[#121212] relative overflow-hidden" id="localizacao">
          <div className="mx-auto max-w-[1200px] px-6 relative z-10">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-5xl font-black text-white md:text-6xl mb-12 tracking-tighter uppercase">Localização</h2>
                <div className="space-y-12">
                  <div className="flex items-start gap-8">
                    <div className="size-16 rounded-[20px] bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-4xl">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-2xl mb-3 uppercase tracking-wider">Onde estamos</h4>
                      <p className="text-2xl text-gray-400 font-medium leading-relaxed">{contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="size-16 rounded-[20px] bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-4xl">schedule</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-2xl mb-3 uppercase tracking-wider">Expediente</h4>
                      <p className="text-gray-400 text-xl mb-1 font-medium">{contact.hours.week}</p>
                      <p className="text-gray-400 text-xl font-medium">{contact.hours.saturday}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-[550px] rounded-[48px] overflow-hidden border-8 border-white/5 relative group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-110" 
                  style={{ backgroundImage: `url(${mapImage})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`} 
                  target="_blank" rel="noreferrer"
                  className="absolute bottom-10 left-10 right-10 bg-white text-black py-6 rounded-3xl font-black text-center shadow-2xl hover:bg-primary transition-all uppercase tracking-[0.2em] text-sm"
                >
                  Ver Rota no Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-32 border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-center text-center gap-12">
            <div className="flex flex-col items-center gap-8">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-28 w-auto rounded-[32px] shadow-2xl border-4 border-white/5" />
              ) : (
                <div className="size-24 bg-primary text-black rounded-[2.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(238,189,43,0.3)]">
                  <span className="material-symbols-outlined text-5xl">content_cut</span>
                </div>
              )}
              <div>
                <h3 className="text-5xl font-black text-white tracking-tighter mb-4">{brandName.toUpperCase()}</h3>
                <p className="text-gray-500 max-w-md text-xl italic font-medium opacity-70">Sua melhor versão começa aqui.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10">
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="group flex items-center gap-3 text-gray-400 hover:text-primary transition-all font-bold text-lg">
                <span className="size-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors uppercase text-[10px]">WA</span>
                WhatsApp
              </a>
              <span className="text-white/10 hidden md:block self-center h-4 w-px bg-white/20"></span>
              <p className="flex items-center gap-3 text-gray-400 font-bold text-lg">
                <span className="material-symbols-outlined text-primary">call</span>
                {contact.phone}
              </p>
            </div>

            <div className="w-full max-w-4xl h-px bg-white/5 my-12"></div>
            <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl gap-6 opacity-30">
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">© {new Date().getFullYear()} {brandName} • TODOS OS DIREITOS RESERVADOS</p>
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">BARBER SHOP & GROOMING HOUSE</p>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedService={selectedService}
        availableServices={services.map(s => s.name)}
        whatsappNumber={whatsappNumber}
      />

      <style>{`
        @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        .animate-slow-zoom { animation: slow-zoom 30s ease-in-out infinite alternate; }
        ::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </div>
  );
};

export default App;

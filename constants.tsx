
import { Service, ContactInfo } from './types';

export const SERVICES: Service[] = [
  {
    id: 'corte-classico',
    name: 'Corte Clássico',
    price: 'R$ 60,00',
    description: 'Corte completo com lavagem, secagem e finalização com produtos premium. Tesoura ou máquina.',
    image: 'https://images.unsplash.com/photo-1621605815841-28d9447ad2b1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'barba-terapia',
    name: 'Barba Terapia',
    price: 'R$ 50,00',
    description: 'Modelagem da barba com toalha quente, esfoliação facial e hidratação com óleos essenciais.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'combo-completo',
    name: 'Combo Completo',
    price: 'R$ 95,00',
    description: 'A experiência definitiva. Corte de cabelo e barba terapia completa com desconto especial.',
    image: 'https://images.unsplash.com/photo-1593702295094-222440960579?q=80&w=800&auto=format&fit=crop',
    popular: true
  }
];

export const CONTACT: ContactInfo = {
  address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100',
  phone: '(11) 99999-9999',
  email: 'contato@barbeariagold.com.br',
  hours: {
    week: 'Seg - Sex: 09:00 - 20:00',
    saturday: 'Sáb: 09:00 - 18:00'
  }
};

export const HERO_IMAGE = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1920&auto=format&fit=crop';
export const MAP_IMAGE = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop';

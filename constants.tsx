
import { Service, ContactInfo } from './types';

export const SERVICES: Service[] = [
  {
    id: 'corte-classico',
    name: 'Corte Clássico',
    price: 'R$ 60,00',
    description: 'Corte completo com lavagem, secagem e finalização com produtos premium. Tesoura ou máquina.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBayj17ZRnor2zpMlClm0fO6Iy2RwXgatWWkaHiIMh-c-Ns0oi8f6RfR2hsp-IRYCozhEsEfdy6lwROVVcPY7uasxyWcJAaIKmyWz2xUsWZpVZ8_lt1OhvtxY8XBZ2xkkQ7H3tCYaxUZDs3gypCQSG2tCFp2zeTUkYWgUU0kskk3ql9WKaruH5Uzj6nWJvyvqEF6HyX9neUKFOPFl3m4IcPa8iFYNs-g9GKLoNIVKMWfabxUt-5GPVBJ-4LUNYrPma6p4pN50fv9Hhv'
  },
  {
    id: 'barba-terapia',
    name: 'Barba Terapia',
    price: 'R$ 50,00',
    description: 'Modelagem da barba com toalha quente, esfoliação facial e hidratação com óleos essenciais.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWRDPwNBds3-zwwwWlGwmYl-7JzQJth6CRIgPAQup51kQlDHC3g_X9P1ztgSORNXxLdpNt0Yc_Ur9dH9J6s_lyJkRtp97LZbbYHEAioBUHzMmWSN0o9YOKYfjQkR4Eq-E4WBm6DagCKI_Y1sk9KnxGueWq95x_gJDgvM2JmLu6Ul1g7XNCGK4BmtQ_Nwxx3bPmTp4YHjmC02HIUOkHvIxhaDwnHRh5xy_-sAhRrbUouPvrDtNOpaiX7-cu892oDtrCEosLe5XQbX7M'
  },
  {
    id: 'combo-completo',
    name: 'Combo Completo',
    price: 'R$ 95,00',
    description: 'A experiência definitiva. Corte de cabelo e barba terapia completa com desconto especial.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaFvVijn2xm4JLmrQEBHAAFBvye3lf6gVhKV7bE7o1oye2fmGPnxH44NnGAP_Iux6AGLx6K-zyHOPnWxi5dPE2yzrbMrg6Xp2nAuH2MovvfDxHRQTdkNzkeofsEvDKMd4ZESO2aI4h7Zhmdj635zr8qNQFGaUkbCX5xLSNrHUUScri0Bua_WjE-EACWCK-h20VZZhfZnSsERLfNiKHQ1vDPBDc1vzDrYFmai5AJIDCBCjgWcbOiJjZLHs9PXvqO-_S99QAYetCjFmu',
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

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDceaUlpgctcAgdaLPUQz5yUNUQx_pJgOIErMbiroQCE2iiAZve5AXf_Th6g9hSzr4iNd8sCh7Un14ab-pF2-9GPEec60sBDajbtdPUbMbjAbqcgA-DqL41mvteRCEy6EK_8S2zkM18UxdeZgTlmpIbyhj3POJYgG0gb_Qapewq1XBEBC1uzO0fk30ns6Y3wWVzQcKmH7Nr2eDJND9GCY3pdXVr9bmwsUujnDXD8tlDgulCPYG4BrcSXucf_DnI6DigP_QcvP7Fe7V7';
export const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrJgWa4BI6H7MLH3aBtEF4HujHtLZ_P9g1jGPVK3fd2fdv5tdCqAMZw9S1Tm90Q8dprz87Swe01oTRJL5qT5m5ATZTGqsNVvm_BvD_Kc7Kc3Gts80uVkMhnqfXuMrI8XSbNcVivh5UuWQGAv-BFaMT0RrF1X74DAUUGqybnVG6EGP19VmUdA083RpeGf6t1U6aYws7F7rpORZuxZrOjx5buciec869llWKSlOa8gvPX9LgHAdm6QOXAskqTNQutVo5J4NiyXsaO2LZ';

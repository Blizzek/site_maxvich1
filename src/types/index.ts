/**
 * Типы данных для проекта Rem-Maxvich-Stroi
 */

export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  features: string[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  duration: string;
  area: string;
}

export interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  date: string;
  avatar?: string;
  videoUrl?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message?: string;
}

export interface CalculatorFormData {
  area: number;
  roomType: string;
  repairType: string;
  name: string;
  phone: string;
}

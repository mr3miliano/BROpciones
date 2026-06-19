export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: 'house' | 'apartment' | 'land' | 'commercial' | 'warehouse';
  status: 'sale' | 'rent';
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // en m2
  lat?: number;
  lng?: number;
  images: string[];
  features: string[];
  featured: boolean;
  agentId?: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  propertyName?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  method: 'whatsapp' | 'call' | 'form';
  status: 'new' | 'contacted' | 'scheduled' | 'closed' | 'discarded';
  agentId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  role: 'admin' | 'agent';
  phone: string;
  email: string;
  avatar: string;
}

export interface AgentContact {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- CRUD PROPIEDADES (PÚBLICO) ---

export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_URL}/properties`);
    if (!res.ok) throw new Error('Error al obtener propiedades');
    return await res.json();
  } catch (error) {
    console.error('Error en getProperties:', error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const res = await fetch(`${API_URL}/properties/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Error al obtener propiedad');
    }
    return await res.json();
  } catch (error) {
    console.error(`Error en getPropertyById (${id}):`, error);
    return null;
  }
}

// --- OBTENER CONTACTO DEL AGENTE DE UNA PROPIEDAD ---

export async function getAgentForProperty(propertyId: string): Promise<AgentContact> {
  const fallback: AgentContact = {
    name: 'Aura Hábitat',
    phone: '525512345678',
    email: 'contacto@aurahabitat.com',
    avatar: '/images/default-avatar.png',
  };

  try {
    // 1. Obtener la propiedad para saber quién es el agente
    const property = await getPropertyById(propertyId);
    if (!property || !property.agentId) {
      return fallback;
    }

    // 2. Buscar al agente en la lista de usuarios
    const resUsers = await fetch(`${API_URL}/users`);
    if (!resUsers.ok) return fallback;
    const users: User[] = await resUsers.json();
    
    const agent = users.find(u => u.id === property.agentId);
    if (!agent) {
      // Si el agente no existe, buscar el admin por rol
      const admin = users.find(u => u.role === 'admin');
      if (admin) {
        return {
          name: admin.name,
          phone: admin.phone,
          email: admin.email,
          avatar: admin.avatar,
        };
      }
      return fallback;
    }

    return {
      name: agent.name,
      phone: agent.phone,
      email: agent.email,
      avatar: agent.avatar,
    };
  } catch (error) {
    console.error('Error en getAgentForProperty:', error);
    return fallback;
  }
}

// --- CRUD LEADs / CONSULTAS (PÚBLICO) ---

export async function createInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const res = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiryData),
  });

  if (!res.ok) {
    throw new Error('Error al registrar consulta');
  }

  return await res.json();
}

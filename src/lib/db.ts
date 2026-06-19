import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

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

// --- CRUD PROPIEDADES (PÚBLICO) ---

export async function getProperties(): Promise<Property[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    const list: Property[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Property);
    });
    // Ordenar por fecha de creación descendente
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error en getProperties:', error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return null;
    }
    return docSnap.data() as Property;
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

    // 2. Buscar al agente en la colección de usuarios
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: User[] = [];
    querySnapshot.forEach((docSnap) => {
      users.push(docSnap.data() as User);
    });
    
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
  try {
    let propertyName = '';
    let agentId = inquiryData.agentId;

    if (inquiryData.propertyId) {
      const prop = await getPropertyById(inquiryData.propertyId);
      if (prop) {
        propertyName = prop.title;
        if (!agentId && prop.agentId) {
          agentId = prop.agentId;
        }
      }
    }

    const newInquiryId = `inq-${Date.now()}`;
    const newInquiry: Inquiry = {
      ...inquiryData,
      propertyName: propertyName || inquiryData.propertyName || 'Consulta General',
      agentId: agentId || null || undefined,
      id: newInquiryId,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Añadir a Firestore usando el ID generado como nombre de documento
    await addDoc(collection(db, "inquiries"), newInquiry);
    return newInquiry;
  } catch (error) {
    console.error('Error en createInquiry:', error);
    throw new Error('Error al registrar consulta');
  }
}

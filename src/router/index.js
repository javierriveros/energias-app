import Home from '@/components/Home';
import Cables from '@/components/Cables';
import Demand from '@/components/Demand';
import Panels from '@/components/Panels';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/demanda',
    name: 'demand',
    component: Demand
  },
  {
    path: '/cables',
    name: 'cables',
    component: Cables
  },
  {
    path: '/paneles',
    name: 'panels',
    component: Panels
  }
]
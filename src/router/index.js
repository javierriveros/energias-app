import Home from '@/components/Home';
import Cables from '@/components/Cables';
import Demand from '@/components/Demand';
import DemandBuildings from '@/components/DemandBuildings';
import DemandPublic from '@/components/DemandPublic';
import Panels from '@/components/Panels';
import About from '@/components/About';

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
    path: '/demanda/edificios',
    name: 'edificios',
    component: DemandBuildings
  },
  {
    path: '/demanda/publicos',
    name: 'publicos',
    component: DemandPublic
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
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
]
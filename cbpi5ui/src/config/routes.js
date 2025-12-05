/**
 * Configuração Centralizada de Rotas e Navegação
 * 
 * Este arquivo centraliza todas as rotas e itens do menu lateral.
 * Para adicionar uma nova página:
 * 1. Crie o componente da página em src/components/
 * 2. Adicione a rota aqui no array routes
 * 3. Se quiser no menu lateral, adicione também no array menuItems
 * 
 * Estrutura de uma rota:
 * - path: caminho da URL (ex: "/settings")
 * - component: componente React a ser renderizado
 * - exact: se a rota deve ser exata (padrão: false)
 * - menuItem: se deve aparecer no menu lateral (padrão: false)
 * - menuLabel: label no menu (se menuItem: true)
 * - menuIcon: componente de ícone do Material-UI
 * - menuOrder: ordem de exibição no menu (menor = mais acima)
 */

import DashboardIcon from '@material-ui/icons/Dashboard';
import BallotIcon from '@material-ui/icons/Ballot';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SettingsIcon from '@material-ui/icons/Settings';
import TimelineIcon from '@material-ui/icons/Timeline';
import PowerIcon from '@material-ui/icons/Power';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ComputerIcon from '@material-ui/icons/Computer';
import InfoIcon from '@material-ui/icons/Info';
// Importações dos componentes
import About from '../components/about';
import Upload from '../components/upload';
import CBPiSystem from '../components/system';
import { Dashboard2, FixDashboard } from '../components/dashboard/Dashboard';
import Hardware from '../components/hardware';
import ActorForm from '../components/hardware/ActorForm';
import KettleForm from '../components/hardware/KettleForm';
import FermenterForm from '../components/hardware/FermenterForm';
import SensorForm from '../components/hardware/SensorForm';
import Plugins from '../components/plugins';
import MashProfile from '../components/mashprofile';
import FermenterProfile from '../components/fermenterprofile';
import Settings from '../components/settings';
import StepForm from '../components/mashprofile/StepForm';
import FermenterStepForm from '../components/fermenterprofile/FermenterStepForm';
import Recipes from '../components/recipes';
import FermenterRecipes from '../components/fermenterrecipes';
import RecipeEditor from '../components/recipes/RecipeEditor';
import FermenterRecipeEditor from '../components/fermenterrecipes/FermenterRecipeEditor';
import { Charting } from '../components/charting';

/**
 * Configuração de todas as rotas da aplicação
 */
export const routes = [
  // Dashboard (página inicial)
  {
    path: '/',
    component: Dashboard2,
    exact: true,
    menuItem: true,
    menuLabel: 'Dashboard',
    menuIcon: DashboardIcon,
    menuOrder: 1,
  },
  
  // Dashboard fixo (rota especial)
  {
    path: '/fixdash/:dashboardid',
    component: FixDashboard,
    exact: true,
    menuItem: false,
  },

  // Mash Profile
  {
    path: '/mashprofile',
    component: MashProfile,
    exact: true,
    menuItem: true,
    menuLabel: 'Mash Profile',
    menuIcon: BallotIcon,
    menuOrder: 2,
  },
  {
    path: '/step',
    component: StepForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/step/:id',
    component: StepForm,
    exact: true,
    menuItem: false,
  },

  // Fermenter Profile
  {
    path: '/fermenterprofile',
    component: FermenterProfile,
    exact: true,
    menuItem: true,
    menuLabel: 'Fermenter Profile',
    menuIcon: BallotIcon,
    menuOrder: 3,
  },
  {
    path: '/fermenterprofile/:fermenterid',
    component: FermenterProfile,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenterstep',
    component: FermenterStepForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenterstep/:fermenterid',
    component: FermenterStepForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenterstep/:id/:fermenterid',
    component: FermenterStepForm,
    exact: true,
    menuItem: false,
  },

  // Hardware
  {
    path: '/hardware',
    component: Hardware,
    exact: true,
    menuItem: true,
    menuLabel: 'Hardware',
    menuIcon: DeveloperBoardIcon,
    menuOrder: 4,
  },
  {
    path: '/kettle',
    component: KettleForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/kettle/:id',
    component: KettleForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenter',
    component: FermenterForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenter/:id',
    component: FermenterForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/actor',
    component: ActorForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/actor/:id',
    component: ActorForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/sensor',
    component: SensorForm,
    exact: true,
    menuItem: false,
  },
  {
    path: '/sensor/:id',
    component: SensorForm,
    exact: true,
    menuItem: false,
  },

  // Settings (Configurações)
  {
    path: '/settings',
    component: Settings,
    exact: true,
    menuItem: true,
    menuLabel: 'Settings',
    menuIcon: SettingsIcon,
    menuOrder: 5,
  },

  // Analytics
  {
    path: '/charting',
    component: Charting,
    exact: true,
    menuItem: true,
    menuLabel: 'Analytics',
    menuIcon: TimelineIcon,
    menuOrder: 6,
  },

  // Plugins
  {
    path: '/plugins',
    component: Plugins,
    exact: true,
    menuItem: true,
    menuLabel: 'Plugins',
    menuIcon: PowerIcon,
    menuOrder: 7,
  },

  // Recipe Upload
  {
    path: '/upload',
    component: Upload,
    exact: true,
    menuItem: true,
    menuLabel: 'Recipe Upload',
    menuIcon: CloudUploadIcon,
    menuOrder: 8,
  },

  // System
  {
    path: '/system',
    component: CBPiSystem,
    exact: true,
    menuItem: true,
    menuLabel: 'System',
    menuIcon: ComputerIcon,
    menuOrder: 9,
  },

  // About
  {
    path: '/about',
    component: About,
    exact: true,
    menuItem: true,
    menuLabel: 'About',
    menuIcon: InfoIcon,
    menuOrder: 10,
  },

  // Recipes (rotas sem menu)
  {
    path: '/recipes',
    component: Recipes,
    exact: true,
    menuItem: false,
  },
  {
    path: '/recipe/:id',
    component: RecipeEditor,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenterrecipes',
    component: FermenterRecipes,
    exact: true,
    menuItem: false,
  },
  {
    path: '/fermenterrecipe/:id',
    component: FermenterRecipeEditor,
    exact: true,
    menuItem: false,
  },
];

/**
 * Itens do menu lateral (filtrados e ordenados)
 */
export const menuItems = routes
  .filter(route => route.menuItem === true)
  .sort((a, b) => (a.menuOrder || 999) - (b.menuOrder || 999));

/**
 * Função auxiliar para obter uma rota por path
 */
export const getRouteByPath = (path) => {
  return routes.find(route => route.path === path);
};

/**
 * Função auxiliar para verificar se uma rota existe
 */
export const routeExists = (path) => {
  return routes.some(route => route.path === path);
};


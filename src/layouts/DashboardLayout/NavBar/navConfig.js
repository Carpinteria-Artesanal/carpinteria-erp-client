import { PieChart as PieChartIcon, ShoppingCart, Users as UsersIcon } from 'react-feather';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EuroIcon from '@material-ui/icons/Euro';
import DescriptionIcon from '@material-ui/icons/Description';

const year = new Date().getFullYear();

export const navConfig = [
  {
    items: [
      {
        title: 'Inicio',
        icon: PieChartIcon,
        href: '/app/informes/inicio',
      },
    ],
  },
  {
    subheader: 'Clientes',
    items: [
      {
        title: 'Clientes',
        icon: UsersIcon,
        href: '/app/clientes/listado',
      },
      {
        title: 'Pagos',
        icon: EuroIcon,
        href: '/app/clientes/pagos',
      },
      {
        title: 'Libros',
        icon: MenuBookIcon,
        href: '/app/clientes/libro',
        items: [
          {
            title: 'Facturas',
            href: `/app/clientes/libro/facturas/${year}`,
          },
          {
            title: 'Albaranes',
            href: `/app/clientes/libro/albaranes/${year}`,
          },
          {
            title: 'Presupuestos',
            href: `/app/clientes/libro/presupuestos/${year}`,
          },
        ],
      },
      {
        title: 'Productos',
        icon: ShoppingCart,
        href: '/app/clientes/productos',
      },
    ],
  },
  {
    subheader: 'Proveedores',
    items: [
      {
        title: 'Provedores',
        icon: UsersIcon,
        href: '/app/proveedores',
      },
      {
        title: 'Pagos',
        icon: EuroIcon,
        href: '/app/pagos',
      },
      {
        title: 'Libro',
        icon: MenuBookIcon,
        href: `/app/libro/${year}`,
      },
      {
        title: 'Facturación',
        icon: DescriptionIcon,
        href: `/app/informes/facturacion/${year}`,
      },
    ],
  },
];

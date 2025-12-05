/**
 * Componente de Menu Lateral com suporte a submenus
 * 
 * Este componente renderiza o menu lateral usando a configuração centralizada de rotas.
 * Para adicionar um novo item ao menu, edite o arquivo src/config/routes.js
 * 
 * Suporta dropdowns para itens com subplugins (ex: BrewStation)
 */

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { menuItems } from '../../config/routes';

// Importar ícones comuns do Material-UI para uso dinâmico
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TimelineIcon from '@material-ui/icons/Timeline';
import PowerIcon from '@material-ui/icons/Power';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ComputerIcon from '@material-ui/icons/Computer';
import BallotIcon from '@material-ui/icons/Ballot';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import LocalBarIcon from '@material-ui/icons/LocalBar';

// Mapeamento de nomes de ícones para componentes
const iconMap = {
    'Info': InfoIcon,
    'Settings': SettingsIcon,
    'Dashboard': DashboardIcon,
    'Timeline': TimelineIcon,
    'Power': PowerIcon,
    'CloudUpload': CloudUploadIcon,
    'Computer': ComputerIcon,
    'Ballot': BallotIcon,
    'DeveloperBoard': DeveloperBoardIcon,
    'LocalBar': LocalBarIcon,
};

/**
 * Componente de item do menu simples
 */
const MenuItem = ({ onClose, label, path = "/", icon: Icon }) => {
    const history = useHistory();

    const goTo = (key) => {
        history.push(key);
        if (onClose) {
            onClose();
        }
    };

    return (
        <ListItem button onClick={() => goTo(path)}>
            <ListItemIcon>
                {Icon ? <Icon /> : null}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItem>
    );
};

/**
 * Componente de item do menu com subitens (dropdown)
 */
const MenuItemWithSubmenu = ({ onClose, label, icon: Icon, subItems }) => {
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const goTo = (path) => {
        history.push(path);
        if (onClose) {
            onClose();
        }
    };

    // Função para carregar ícone dinamicamente
    const getIconComponent = (iconName) => {
        if (!iconName) return null;
        return iconMap[iconName] || null;
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    {Icon ? <Icon /> : null}
                </ListItemIcon>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {subItems.map((subItem, index) => {
                        const SubIcon = getIconComponent(subItem.icon);
                        
                        return (
                            <ListItem 
                                key={subItem.path || `subitem-${index}`}
                                button 
                                onClick={() => goTo(subItem.path)}
                                style={{ paddingLeft: 32 }}
                            >
                                <ListItemIcon>
                                    {SubIcon ? <SubIcon /> : null}
                                </ListItemIcon>
                                <ListItemText primary={subItem.label} />
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};

/**
 * Componente principal do menu lateral
 * Renderiza todos os itens do menu baseado na configuração centralizada
 * 
 * Suporta itens com subitens através da propriedade 'subItems' na rota
 */
const Menu = ({ onClose }) => {
    const [menuItemsWithSubmenus, setMenuItemsWithSubmenus] = useState({});

    // Carregar subitens dinamicamente de plugins que fornecem API
    useEffect(() => {
        const loadSubmenus = async () => {
            const submenus = {};
            
            // Carregar subplugins do BrewStation (exemplo de plugin que fornece subitens)
            try {
                const response = await fetch('/api/brewstation/subplugins');
                if (response.ok) {
                    const data = await response.json();
                    if (data.subplugins && data.subplugins.length > 0) {
                        submenus['/brewstation'] = data.subplugins;
                    }
                }
            } catch (error) {
                // Plugin não está instalado ou não respondeu - ignorar silenciosamente
            }
            
            // Aqui podem ser adicionados outros plugins que fornecem subitens
            // Exemplo: '/api/outro-plugin/subitems'
            
            setMenuItemsWithSubmenus(submenus);
        };

        loadSubmenus();
        
        // Recarregar a cada 10 segundos para detectar novos subitens
        const interval = setInterval(loadSubmenus, 10000);
        
        return () => clearInterval(interval);
    }, []);

    // Garante que menuItems existe e é um array
    if (!menuItems || !Array.isArray(menuItems) || menuItems.length === 0) {
        return (
            <List>
                <ListItem>
                    <ListItemText primary="Nenhum item de menu disponível" />
                </ListItem>
            </List>
        );
    }

    return (
        <List>
            {menuItems.map((route, index) => {
                // Valida se a rota tem as propriedades necessárias
                if (!route.menuLabel || !route.path) {
                    return null;
                }

                const IconComponent = route.menuIcon;
                
                // Verificar se a rota tem subitens (da API ou definidos na rota)
                const subItems = route.subItems || menuItemsWithSubmenus[route.path] || [];
                
                if (subItems.length > 0) {
                    return (
                        <MenuItemWithSubmenu
                            key={route.path || `menu-item-${index}`}
                            onClose={onClose}
                            label={route.menuLabel}
                            icon={IconComponent}
                            subItems={subItems}
                        />
                    );
                }
                
                return (
                    <MenuItem
                        key={route.path || `menu-item-${index}`}
                        onClose={onClose}
                        label={route.menuLabel}
                        path={route.path}
                        icon={IconComponent}
                    />
                );
            })}
        </List>
    );
};

export default Menu;


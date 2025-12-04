/**
 * Componente de Menu Lateral
 * 
 * Este componente renderiza o menu lateral usando a configuração centralizada de rotas.
 * Para adicionar um novo item ao menu, edite o arquivo src/config/routes.js
 */

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useHistory } from "react-router-dom";
import { menuItems } from '../../config/routes';

/**
 * Componente de item do menu
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
 * Componente principal do menu lateral
 * Renderiza todos os itens do menu baseado na configuração centralizada
 */
const Menu = ({ onClose }) => {
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


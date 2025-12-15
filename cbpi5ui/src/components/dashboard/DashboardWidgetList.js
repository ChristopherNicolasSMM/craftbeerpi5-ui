import { Collapse, ListItemIcon, Paper, Tooltip } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AppsIcon from "@mui/icons-material/Apps";
import React, { useContext } from "react";
import "../../App.css";
import { CBPiGrainIcon, CBPiHopsIcon, CBPiLiquidIcon, CBPiPipeIcon, CBPiYeastIcon } from "../util/icons/CBPiSensorIcon";
import { DashboardContext } from "./DashboardContext";
// Using MUI v5 `sx` props instead of makeStyles for lightweight styling

const Icon = ({ icon }) => {
  const WidgetIcon = icon;
  return <WidgetIcon />;
};

const DashboardSidebarListItem = ({ item }) => {
  const { state, actions } = useContext(DashboardContext);
  const selected = state.selected === item.id;

  return (
    <Tooltip title={item.name} placement="right">
    <ListItem
      key={item.id}
      button
      selected={selected}
      onClick={() => {
        actions.add(item);
      }}
    >
      <ListItemIcon sx={{ minWidth: "30px" }}>{item.icon ? <Icon icon={item.icon} /> : null}</ListItemIcon>
    
    </ListItem></Tooltip>
  );
};

const DashboardWidgetList = () => {
  const { actions, state } = useContext(DashboardContext);
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Paper>
      <List component="nav" disableGutters={true} dense aria-label="">
        <ListItem disablePadding key="path" button onClick={handleClick} sx={{ pl: 1 }} selected={open}>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <AppsIcon />
          </ListItemIcon>
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" dense disablePadding>
            {state.widget_list.map((item) => (
              <DashboardSidebarListItem key={item.name} item={item} />
            ))}
            <ListItem
              key="path"
              button
              onClick={() => {
                actions.add_path();
              }}
            >
              <ListItemIcon sx={{ minWidth: "30px" }}><CBPiPipeIcon/></ListItemIcon>
              
            </ListItem>
            
          </List>
        </Collapse>
      </List>
      
    </Paper>
  );
};

export default DashboardWidgetList;

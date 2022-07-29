import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

const HorizontalMenuDrawer = ({menuList, drawerWidth,onClick}) => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
            }}
        >
            <Toolbar/>
            <Box sx={{overflow: 'auto'}}>
                <List>
                    {menuList.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton key={index}>
                                <ListItemIcon>
                                    <MenuIcon/>
                                </ListItemIcon>
                                <ListItemText primary={text} onClick={(e)=>onClick(text)}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
export default HorizontalMenuDrawer;
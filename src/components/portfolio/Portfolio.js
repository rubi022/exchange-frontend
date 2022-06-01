import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Divider } from "@mui/material";

const drawerWidth = 300;

function Portfolio(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "40px",
            marginTop: "10px",
          }}
        >
          <Divider />
          <Link
            style={{
              paddingTop: "10px",
              fontWeight: "700",
              fontSize: "17px",
              paddingBottom: "10px",
              color: "black",
            }}
            to="overview"
          >
            Overview
          </Link>
          <Divider />
          <Link
            style={{
              paddingTop: "10px",
              fontWeight: "700",
              fontSize: "17px",
              paddingBottom: "10px",
              color: "black",
            }}
            to="orders"
          >
            Orders
          </Link>
          <Divider />
          <Link
            style={{
              paddingTop: "10px",
              fontWeight: "700",
              fontSize: "17px",
              paddingBottom: "10px",
              color: "black",
            }}
            to="history"
          >
            History
          </Link>
          <Divider />
          <Link
            style={{
              paddingTop: "10px",
              fontWeight: "700",
              fontSize: "17px",
              paddingBottom: "10px",
              color: "black",
            }}
            to="position"
          >
            Position
          </Link>
          <Divider />
        </Box>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  /* if (!user) return <Navigate to="/login" />; */

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      }
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

Portfolio.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Portfolio;

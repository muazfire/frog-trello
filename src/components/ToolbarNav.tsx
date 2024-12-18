import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Leaf } from "lucide-react";
import { useRouter } from "next/router";

const navItems = ["Home", "Tadpole Support"];

export default function ToolbarNav() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter(); 

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateHome = () => {
    router.push("/"); 
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#22c55e",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        {/* Logo / Brand Name */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #4ade80",
              marginRight: 2,
            }}
          >
            <Leaf
              style={{
                width: 24,
                height: 24,
                color: "#fff",
                transform: "rotate(45deg)",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Roboto, Arial, sans-serif",
              fontWeight: 700,
              color: "#fff",
              fontSize: "1.25rem",
            }}
          >
            FroggyTasks
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            backgroundColor: "#22c55e",
            borderRadius: "9999px",
            border: "1px solid #4ade80",
            padding: "6px 16px",
            margin: "0 16px",
            width: 200,
          }}
        >
          <input
            placeholder="Search Ponds"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              width: "100%",
              outline: "none",
            }}
          />
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <Button
              key={item}
              onClick={item === "Home" ? handleNavigateHome : undefined} 
              sx={{
                fontFamily: "Roboto, Arial, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#22c55e",
                  borderRadius: "9999px",
                },
                margin: "0 4px",
                padding: "6px 16px",
                textTransform: "none",
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{
              "&:hover": {
                backgroundColor: "#22c55e",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#f0fdf4",
                borderRadius: 2,
                border: "1px solid #86efac",
              },
            }}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item}
                onClick={() => {
                  handleMenuClose();
                  if (item === "My Ponds") handleNavigateHome(); 
                }}
                sx={{
                  color: "#15803d",
                  "&:hover": {
                    backgroundColor: "#dcfce7",
                  },
                }}
              >
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

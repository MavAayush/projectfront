import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { LoginContext } from "../context/ContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import "./rightheader.css";

const Rightheader = ({ logclose }) => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  // Added for avatar menu logic
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);

  const handleCartClick = () => {
    logclose();
    navigate("/buynow");
  };

  const logoutuser = async () => {
    try {
      await signOut(); // Clerk's logout
  
      toast.success("Logout Successful", {
        position: "top-center",
        icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>,
        style: {
          background: "#fff",
          color: "#000",
        },
        progressStyle: {
          background: "#D7A86E",
        },
      });
  
      setTimeout(() => {
        logclose();
        navigate("/");
        setAccount(false);
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
      });
    }
  };
  

  return (
    <div className="rightheader">
      <div className="right_nav">
        {isSignedIn ? (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "40px",
                  height: "40px",
                  border: "2px solid #D7A86E",
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                },
                userButtonAvatarImage: {
                  width: "42px",
                  height: "42px",
                },
                userButtonPopoverCard: {
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                },
                userButtonPopoverActionButton: {
                  color: "#000",
                  padding: "10px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                },
              },
            }}
          />
        ) : account ? (
          <Avatar
            className="avtar2"
            sx={{ 
              bgcolor: "#D7A86E", 
              color: "black",
              width: 60,
              height: 60,
              fontSize: 28,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {account.fname[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar
            className="avtar"
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        )}
      </div>

      <div className="nav_btn" onClick={logclose}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Shop by Category</NavLink>
        <hr
          style={{
            width: "100%",
            border: "1px solid #ccc",
            marginLeft: "-20px",
          }}
        />
        
        {!isSignedIn && (
          <NavLink to="/clerk">Sign In</NavLink>
        )}

        <div className="cart_redirect navlink-style" onClick={handleCartClick}>
          Your Cart
        </div>

        <hr
          style={{
            width: "100%",
            border: "1px solid #ccc",
            marginLeft: "-20px",
          }}
        />
        
        {isSignedIn && (
          <div className="navlink-style flag" onClick={logoutuser}>
            <LogoutIcon
              style={{ fontSize: 16, fontWeight: 600, marginRight: 5 }}
            />
            Sign Out
          </div>
        )}
      </div>
    </div>
  );
};

export default Rightheader;

import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from "../context/ContextProvider";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import "./navbar.css";
import { useUser, UserButton } from "@clerk/clerk-react";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const Navbar = () => {
    const { user, isSignedIn } = useUser();
    const { account, setAccount } = useContext(LoginContext);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text, setText] = useState("");
    console.log(text);
    const [liopen, setLiopen] = useState(true);

    const { products } = useSelector((state) => state.getproductsdata);

    const [dropen, setDropen] = useState(false);

    const handleopen = () => {
        setDropen(true);
    }

    const handledrclose = () => {
        setDropen(false);
    }

    const logoutuser = async () => {
        const res2 = await fetch("/lougout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        console.log(data2);

        if (res2.status !== 201) {
            console.log("error");
        } else {
            console.log("data valid log");

            toast.success("Logout Successful", {
                position: "top-center",
                icon: <span style={{ color: "#D7A86E", fontSize: "20px" }}>✔</span>, // custom icon with color
                style: {
                    background: "#fff",
                    color: "#000",
                },
                progressStyle: {
                    background: "#D7A86E",
                },
            });

            setTimeout(() => {
                handleClose(); 
            }, 1000);

            history("/");
            setAccount(false);
        }

    };

    const getText = (iteams) => {
        setText(iteams);
        setLiopen(false);
    }

    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>

                    <Drawer open={dropen} onClose={handledrclose}>
                        <Rightheader logclose={handledrclose} />
                    </Drawer>

                    <div className="navlogo">
                        <NavLink to="/"><img src={`${BASE_URL}/images/Logo.png`} className="logo-desktop" alt="logo" /></NavLink>

                        <NavLink to="/">
                            <img src={`${BASE_URL}/images/Logo.png`} className="logo-mobile" alt="mobile-logo" />
                        </NavLink>
                    </div>


                    <div className="nav_searchbar">
                        <input type="text" placeholder='Search Items'
                            onChange={(e) => getText(e.target.value)}
                            name=" " id=" " />
                        <div className="search_icon">
                            <IoMdSearch id="search" />
                        </div>
                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                                {
                                    products
                                        .filter(product => product.title.shortTitle.toLowerCase().includes(text.toLowerCase()))
                                        .map(product => (
                                            <ListItem>
                                                <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                    {product.title.shortTitle}
                                                </NavLink>
                                            </ListItem>
                                        ))
                                }
                            </List>
                        }
                    </div>
                </div>

                <div className='right'>
                    {!isSignedIn && (
                        <div className="nav_btn">
                            <NavLink to="/login">Sign In</NavLink>
                        </div>
                    )}
                    <div className="cart_btn">
                        <NavLink to={account ? "/buynow" : "/buynow"} className="cart_link">
                            <Badge badgeContent={account?.carts?.length || 0}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        backgroundColor: '#D7A86E',
                                        color: 'black',
                                    }
                                }}
                            >
                                <ShoppingCartIcon id="icon" />
                            </Badge>
                            <p>Cart</p>
                        </NavLink>
                        <ToastContainer
                            position="top-center"
                            closeOnClick={true}
                            draggable={false}
                            pauseOnHover={true}
                            closeButton={true}
                            toastClassName="custom-toast"
                            bodyClassName="custom-toast-body"
                            progressClassName="custom-progress"
                        />
                    </div>
                    {
                        isSignedIn ? (
                           
                            <UserButton style={{width: "100px", height: "100px"}} />
                           
                           
                        ) : account ? (
                            <Avatar
                                className="avtar2"
                                sx={{
                                    bgcolor: '#D7A86E',
                                    color: 'black',
                                }}
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                {account.fname[0].toUpperCase()}
                            </Avatar>
                        ) : (
                            <Avatar
                                className="avtar"
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                        )
                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            isSignedIn ?
                                <MenuItem onClick={handleClose}>My Account</MenuItem> :
                                <MenuItem onClick={() => {
                                    handleClose();
                                    toast.warning("Sign In to Access ", {
                                        position: "top-center",
                                        icon: "🔒",
                                        style: {
                                            background: "#fff",
                                            color: "#000",
                                        },
                                        progressStyle: {
                                            background: "#D7A86E",
                                        },
                                    });
                                    history("/login");
                                }}>
                                    My Account
                                </MenuItem>
                        }

                        {
                            isSignedIn ?
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        logoutuser();
                                    }}
                                >
                                    <LogoutIcon style={{ fontSize: 17, marginRight: 3 }} />Sign Out
                                </MenuItem> : ""
                        }
                    </Menu>
                </div>
            </nav>
        </header>
    )
}

export default Navbar






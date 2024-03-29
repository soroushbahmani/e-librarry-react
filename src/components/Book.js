import React, { useContext, useEffect, useState } from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions, IconButton } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";
import { blue, purple, teal } from '@mui/material/colors';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Auth from './AuthContext';
import axios from "axios";
import { toast } from 'react-toastify';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ShareIcon from '@mui/icons-material/Share';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';


const colorText = blue[800];
const colorText1 = purple[600];
const colorText2 = teal[900];
var host = window.location.origin;
export default function Book(props) {

    // console.log(props);
    const token = useContext(Auth)
    const [data, setData] = useState();


    const addLibrary = (id) => {
        //axios
        axios.post(`api/book/${id}`, null, {
            headers: {
                'Authorization': `Bearer ${token.token}`,
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                toast.error(`سرور با خطا مواجه شده است`, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
            })

    }

    useEffect(() => {
        if (data) {
            toast.success(`${data.data}`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
        }
    }, [data])

    const goSignin = () => {
        toast.error(`کاربر عزیز شما وارد سایت نشدید`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }

    const deleteBook = (id) => {
        //axios
        axios.post(`api/delete/book/${id}`, null,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    'Accept': 'application/json'
                }
            })
            .then(res => {
                console.log(res);
                setData(res.data)
                toast.success(`${data.data}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                })

            })
            .catch(error => {
                console.log(error);
            })
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>

            {

                <Grid sx={{ my: 2, mx: 2, mt:7, direction: 'rtl' }}>
                    <Card sx={{ maxWidth: 245, width: 400, height: '420px', mx: 'auto', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                        <CardActionArea sx={{ textAlign: 'right' }}>
                            <CardMedia

                                sx={{  p: 1, height: "188px" }}
                                component="img"

                                image={props.image}
                                alt={'img ' + props.title + 'book'}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {props.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                                    <b>نویسنده : </b>
                                    {

                                        props.author ?
                                            props.author
                                            :
                                            "  توضیحاتی ندارد  "
                                    }
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'justify', textOverflow: 'ellipsis', mt: 2 }}>
                                    <b>توضیحات : </b>
                                    {
                                        props.description ?
                                            props.description.substr(0, 43)
                                            :
                                            "  توضیحاتی ندارد  "
                                    }
                                    {props.description ? props.description.length >= 80 ? '...' : '' : ''}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ justifyContent: 'right' }}>
                            {props.token ?
                                props.deletBook &&
                                <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Tooltip title="حذف از کتابخانه" placement="left">
                                        <IconButton aria-label="delete" size="large" color="error" onClick={() => deleteBook(props.id)}>
                                            <BookmarkRemoveIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                : ''
                            }
                            {
                                props.token ?
                                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="جزئیات کتاب" placement="right">
                                            <Link to={`/ditails/${props.id}`} style={{ textDecoration: 'none', color: colorText1 }} variant="body2"> <RemoveRedEyeIcon /></Link>
                                        </Tooltip>
                                    </Grid> :
                                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="جزئیات کتاب" placement="right">
                                            <Button onClick={goSignin} style={{ textDecoration: 'none', color: colorText1 }} variant="body2"> <RemoveRedEyeIcon /></Button>
                                        </Tooltip>
                                    </Grid>
                            }
                            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <Tooltip title="اشتراک گذاشتن" placement="bottom">
                                    <Button   id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} style={{ textDecoration: 'none', color: colorText2 }} variant="body2"> <ShareIcon /></Button>
                                </Tooltip>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <a target='_blank' rel="noreferrer"  href={`https://wa.me/${host}/ditails/${props.id}`} style={{textDecoration:'none', color:colorText}}>whatsapp</a>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <a target='_blank' rel="noreferrer"  href={`https://telegram.me/${host}/ditails/${props.id}`} style={{textDecoration:'none', color:colorText}}>telegram</a>
                                    </MenuItem>
                             
                                </Menu>

                            </Grid>
                            {
                                props.token ?
                                    props.saveHide &&
                                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="اضافه به کتابخانه" placement="left">
                                            <Button onClick={() => addLibrary(props.id)} style={{ textDecoration: 'none', color: colorText }} variant="body2"> <BookmarkAddIcon /></Button>
                                        </Tooltip>
                                    </Grid>
                                    :
                                    props.saveHide &&
                                    <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="اضافه به کتابخانه" placement="left">
                                            <Button onClick={goSignin} style={{ textDecoration: 'none', color: colorText }} variant="body2"> <BookmarkAddIcon /></Button>
                                        </Tooltip>
                                    </Grid>

                            }



                        </CardActions>

                    </Card>
                </Grid>

            }



        </>
    )
}

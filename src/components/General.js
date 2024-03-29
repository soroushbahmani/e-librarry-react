import React, { useContext, useEffect, useState } from 'react';
import MenuTop from './MenuTop';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Book from './Book';
import Auth from './AuthContext';
import axios from "axios";
import Loading from './Loading';
import { Alert, AlertTitle, Button, Stack, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slide.css'
import imageOne from './slide0.svg'
import imagetwo from './slide1.svg'
import imagethree from './slide2.svg'
import imagefor from './slide3.svg'
import imagefive from './slide5.svg'
import { toast } from 'react-toastify';
import { lime } from '@mui/material/colors';
const colorText = lime['300'];


export default function BasicGrid() {
    const Navigation = useNavigate();
    const token = useContext(Auth)
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)
    const [moreList, setMoreList] = useState([])
    const [nextPageurl, setnaxtPageurl] = useState('')
    const [Search, setSearch] = useState('')
    const [open, setOpen] = useState(false);
    const [randomBook, setRandomBook] = useState({});

    // slider 2
    const settings = {
        lazyLoad: 'ondemand',
        cssEase: 'linear',
        centerMode: true,
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        rtl: true,
        responsive: [
            {
                breakpoint: 0,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1
                }
            }
        ]
    };
    useEffect(() => {
        let one = "api/books"
        let two = "api/books/random"

        var requestOne = axios.get(one);
        var requestTwo = axios.get(two);

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const data = responses[0]
            const random = responses[1]
            setData(data.data);
            setnaxtPageurl(data.data.next_page_url)
            setRandomBook(random.data);
            setLoading(true)
        })).catch(errors => {
            setLoading(true)
            Navigation('/')
        })

    }, [])


    useEffect(() => {
        (Search === '' || Search === null) &&
            axios.get('api/books')
                .then(res => {
                    setData(res.data);
                    setnaxtPageurl(res.data.next_page_url)
                    setLoading(false)
                })
                .catch(error => {
                    Navigation('/')
                })

    }, [Search])


    const nextPage = () => {
        setOpen(true)
        axios.get(`${nextPageurl}`,
            {
                headers: {
                    'Authorization': `Bearer ${token.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                setMoreList(res.data)
                setnaxtPageurl(res.data.next_page_url)
                setOpen(false)

            })
            .catch(error => {
                Navigation('/')
            })
    }

    const submithandler = (event) => {
        event.preventDefault();
        setOpen(true)
        //axios
        axios.get(`api/books/search/${Search}`)
            .then(res => {
                setData(res.data);
                setnaxtPageurl(res.data.next_page_url)
                setOpen(false)
                window.scrollTo({
                    top: 880,
                    behavior: 'smooth',
                })

            })
            .catch(error => {
                Navigation('/')
            })
    }

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
    return (

        <div className='general'>
            {loading ? <Loading /> :

                <>
                    <MenuTop />

                    {/* search */}
                    <Stack sx={{ width: '100%', my: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: '50px', zIndex: '222', textAlign: 'center' }} spacing={2}>
                        <Paper
                            onSubmit={submithandler}
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "50%", textAlign: 'center' }}
                        >

                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="جستوجو در کتاب ها"
                                onChange={e => setSearch(e.target.value)}
                                value={Search}
                            />
                            <IconButton type='submit' sx={{ p: '10px' }} >
                                <SearchIcon />
                            </IconButton>

                        </Paper>
                    </Stack>

                    {/* slider 1 */}
                    <>
                        <div className="slide-container">
                            <Slide duration={'2500'} transitionDuration={'500'} infinite={'true'} autoplay={'true'}>
                                <div className="each-fade">
                                    <div>
                                        <img src={imageOne} alt='image0' />
                                    </div>
                                    <div className='slide-text' style={{ padding: '10px 30px', textAlign: 'justify', direction: 'rtl' }}>

                                        مرجع قانونی دانلود کتاب الکترونیکی  است که امکان دسترسی به هزاران کتاب، رمان، مجله و کتاب صوتی و همچنین خرید کتاب الکترونیک از طریق موبایل تبلت و رایانه برای شما فراهم می‌کند. شما با استفاده از کتابراه همیشه و همه جا به کتاب‌ها و کتابخانه خود دسترسی دارید و می‌توانید به سادگی از هر فرصتی برای مطالعه استفاده کنید. در کتابراه برای همه سلیقه‌ها از داستان، رمان و شعر تا روانشناسی، تاریخی، علمی، موفقیت و... کتاب‌هایی پیدا می شود. همچنین در کتابراه هزاران کتاب رایگان نیز قابل دانلود است. اپلیکیشن کتابخوان  برای اندروید، IOS و ویندوز در دسترس است.
                                    </div>
                                </div>
                                <div className="each-fade">

                                    <div className='slide-text'>
                                        <ul dir='rtl' style={{ textAlign: 'right' }}>
                                            <li>با بیش از 100000 منبع الکترونیکی رایگان به زبان فارسی ، عربی و انگلیسی</li>
                                            <li>    !   کتابی که تو را با سخت و آسان زندگی آدمی معرف همراه می کند</li>
                                            <li> اینجــــا یک کتابخانه دیجیتالی است</li>
                                            <li>  کتاب های  موفقیت و خودیاری</li>
                                            <li>  امکان دریافت +۲۰ هزار کتاب رایگان</li>
                                            <li>  ! کتاب هایی برای افزایش اطلاعات عمومی</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <img src={imagetwo} alt='image1' />
                                    </div>
                                </div>
                                <div className="each-fade">
                                    <div>
                                        <img src={imagethree} alt='image2' />
                                    </div>
                                    <div className='slide-text' style={{ padding: '10px 30px', textAlign: 'justify', direction: 'rtl' }}>

                                        با  کتابخانه الکترونیکی آزمون و خطایی در انتخاب و خرید کتاب در کار نخواهد بود. بهترین و تحسین‌شده‌ترین کتاب‌ های سراسر این کره‌ی خاکی در انواع سبک های گوناگون گرد هم آمده‌اند تا برای کسانی که تمایل به خرید کتاب های ارزشمند دارند، هیچ دغدغه‌ای وجود نداشته باشد. با انتخاب از میان کتاب های متنوع و دست‌چین شده‌ی ایران کتاب، می‌توانید مطمئن باشید که کتابی که خریده اید، ارزش زمانی که برای آن صرف می‌کنید را دارد. ایران‌کتاب، رسالت خود را ارائه‌ی اطلسی جامع از برترین کتاب‌ها و معتبرترین جوایز ادبی سراسر دنیا می‌داند و بر آن است تا با خلق آرمان‌شهری ادبی، بهترین‌ها را در اختیار علاقه‌مندان قرار دهد.
                                    </div>
                                </div>
                                <div className="each-fade">
                                    <div className='slide-text' style={{ padding: '10px 30px', textAlign: 'justify', direction: 'rtl' }}>


                                        گستره‌ای از کتاب‌ها و مجلات متنوع برای طیف وسیعی از کاربران تجربه فوق‌العاده خریدکتاب و خواندن آن در دستگاه‌های هوشمند را فراهم کند.در فیدیبو با خرید کتاب از بهترین ناشران ایرانی در موضوعات مختلف، کاربران می‌توانند در اپلیکیشن کتابخانه‌ای‌ شخصی برای خود بسازند و از امکانات منحصر به فرد آن استفاده کنند. برای تیم فیدیبو هدف خرید کتاب نیست بلکه ایجاد محیطی بری ارتباط بیشتر اهالی کتاب است.شایان ذکر است که فیدیبو بعد از خرید کتاب، با تیم پشتیبانی همیشه پاسخگوی کاربران محترم خواهد بود. با دانلود هزاران کتاب صوتی، کتاب دانشگاهی، شعر عاشقانه، رمان عاشقانه ، مادر و کودک و پادکست از فیدیبو، خواندن کتاب را به گونه ای متفاوت تجربه کنیم.
                                    </div>
                                    <div>
                                        <img src={imagefor} alt='image3' />
                                    </div>
                                </div>
                                <div className="each-fade">

                                    <div>
                                        <img src={imagefive} alt='image4' />
                                    </div>

                                    <div className='slide-text'>
                                        <ul dir='rtl' style={{ textAlign: 'right' }}>
                                            <li>با بیش از 100000 منبع الکترونیکی رایگان به زبان فارسی ، عربی و انگلیسی</li>
                                            <li>    !   کتابی که تو را با سخت و آسان زندگی آدمی معرف همراه می کند</li>
                                            <li> اینجــــا یک کتابخانه دیجیتالی است</li>
                                            <li>  کتاب های  موفقیت و خودیاری</li>
                                            <li>  امکان دریافت +۲۰ هزار کتاب رایگان</li>
                                            <li>  ! کتاب هایی برای افزایش اطلاعات عمومی</li>
                                        </ul>
                                    </div>

                                </div>
                            </Slide>
                        </div>
                    </>

                    <br />
                    <br />
                    {/* slider 2 */}
                    <h2 className='titleh2' style={{ textAlign: 'center', marginTop: '80px' }}> کتاب های پیشنهادی</h2>
                    <Box sx={{ my: 10, p: 0, width: '100%' }}>
                        <Slider className='Slider' style={{ width: 'calc(100% - 100px)', margin: 'auto', padding: 0 }} {...settings}>
                            {(randomBook !== {} && randomBook !== null && randomBook !== false) ? randomBook.map((res, index) => <div  key={index}>
                                <img src={res.image}  alt='image3' />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h3  className='titleh3'>{res.title.substr(0, 12)}  {res.title? res.title.length >= 13 ? '...' : '' : 'تستی'}</h3>
                                    {token.token ?
                                        <Tooltip title="خواندن کتاب" placement="bottom">
                                            <Link style={{ textDecoration: 'none', color: colorText }} to={`/ditails/${res.id}`}>
                                                <MenuBookIcon />
                                            </Link>
                                        </Tooltip>
                                        :
                                        <Tooltip title="خواندن کتاب" placement="bottom">
                                            <Button onClick={goSignin} style={{ textDecoration: 'none', color: colorText }}>
                                                <MenuBookIcon />
                                            </Button>
                                        </Tooltip>
                                    }
                                </div>
                            </div>) : ''}

                        </Slider>
                    </Box>

                    {/* alert */}
                    {!data.data.length > 0 &&
                        <Stack sx={{ width: '80%', mx: 'auto', direction: 'rtl', mt: 5 }} spacing={2}>
                            <Alert severity="warning">
                                <AlertTitle>کاربر عزیز</AlertTitle>
                                کتاب مورد نظر پیدا نشد!
                            </Alert>
                        </Stack>
                    }
                    {data.data.length > 0 &&
                        <h2  className='titleh2' style={{ textAlign: 'center' }}> همه ی کتاب ها  </h2>
                    }

                    {/* books */}
                    <Box sx={{ mx: 'auto', mt: 2 }}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            {data.data.map(res => <Book key={res.id} saveHide={true} token={token.token}  {...res} />)}
                            {(moreList.data && data.data.length > 0) && moreList.data.map(res => <Book key={res.id} saveHide={true} token={token.token}  {...res} />)}
                        </Grid>
                        {nextPageurl &&
                            <Stack sx={{ width: '50%', mx: 'auto', py: 5, direction: 'rtl' }} spacing={2}>
                                <Button variant="contained" size='large' onClick={nextPage}>
                                    مشاهده ی کتاب های بیشتر
                                </Button>
                            </Stack>
                        }
                    </Box>
                    {/* loading */}
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={open}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>

            }
        </div>
    );
}



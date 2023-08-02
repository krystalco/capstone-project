import React from "react"
import axios from "axios"
import {useEffect, useState} from "react"
import Navbar from "../Navbar/Navbar"
import "./News.css";
import {Paper, CardContent, Typography, CardActions, Grid, Button,Link, Card, CardMedia, IconButton}from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const apiKey = import.meta.env.VITE_NEWS_API; // should be in environment file

export default function News({selectedDailyLanguage, userId, handleLogout, dailyLanguages,setSelectedDailyLanguage}){

    const [newsArticles, setNewsArticles] = useState([])
    const [loadNum, setLoadNum]  = useState(1) // manages page data
    const [displayedArticles, setDisplayArticles] = useState([])
    const [usersLanguages, setUsersLanguages] = useState([])
   

    // console.log("apiKey value: ", apiKey)

    let countryLanguage = ""; 

    if(selectedDailyLanguage === "1"){
        countryLanguage = "us"
      

    }else if(selectedDailyLanguage === "2"){
        countryLanguage = "fr"
       

    }else if(selectedDailyLanguage === "3"){
        countryLanguage = "de"
      

    }else if(selectedDailyLanguage === "4"){
        countryLanguage = "it"
       

    }else if(selectedDailyLanguage === "5"){
        countryLanguage = "mx"
       

    }else{
        countryLanguage = "se"
      
    }

    const handleLoadMore = () => {
        console.log("inside handleLoadMore function")
        let newNum = loadNum + 1;
        setLoadNum(newNum);
        setDisplayArticles(newsArticles.slice(0, (newNum*5)))
    }

    const handleLanguageChange =(event) =>{

        let selectedLang = event.target.value
        console.log("selectedLang value: ", selectedLang)
        setSelectedDailyLanguage(selectedLang)
        console.log("selectedDailyLang value: ", selectedDailyLanguage)

    }
    //will run whenever selectedDailyLanguage is updated
    useEffect(()=>{
            try{
                //API call for perigon news https://api.goperigon.com/v1/all?country=${countryLanguage}&apiKey=${apiKey} 
                //API call for News API https://newsapi.org/v2/top-headlines?country=${countryLanguage}&apiKey=${apiKey}
                axios.get(`https://api.goperigon.com/v1/all?country=${countryLanguage}&apiKey=${apiKey} `).then((response)=>{
                    setNewsArticles(response.data.articles)
                    setDisplayArticles(response.data.articles.slice(0, loadNum*5))
                    // setDisplayArticles(newsArticles.slice(0, (loadNum*10)))

                     console.log("news data articles: ", response.data.articles) 
                   
                })
    
            }catch(error){
                console.error(error)
            }
          
    },[selectedDailyLanguage])

    console.log("users languages: ", dailyLanguages)



    
    // console.log("news articles Imageurl: ", newsArticles.imageUrl)
    return(
        <>
              
             <div>
             <Navbar userId={userId} handleLogout={handleLogout} />
                <div className="daily-news-container">Daily News</div>

                <div className="dropdown-lang-containter">
                        {/* drop down menu for user to change language to get news articles in different languages */}
                        <label>Change Language </label>

                        <select onChange={handleLanguageChange}>
                                <option value={null}>Select a language</option>

                                    {dailyLanguages?.map((languages)=>(
                        
                                        <option className="lang-option" key={languages.linguaid} value={languages.linguaid}>{languages.linguaname}</option>
                        
                                    ))}

                        </select>
                </div>
                 

            <div className="articles-grid">
                {displayedArticles?.map((articles)=>{

                    return(
                        <>
                       
                            {/* square style={{textAlign: 'center', padding: 20, marginTop: 5, height:60, marginBottom:20}} */}
                            {/*  border: 2, borderColor:'brown', */}
                            <Grid>
                                <Grid item>
                                    {/* <Paper sx={{ maxWidth: 500, minWidth: 500, maxHeight:650, minHeight: 650, backgroundColor:'gold', paddingLeft:5, marginBottom:15}}> */}
                                    <Card variant="outlined" sx={{ maxWidth: 450, minWidth: 450, maxHeight:600, minHeight: 600, border: 4, borderColor:'brown'}}>
                                        <CardMedia
                                            sx={{ height: 200, objectFit: "contain"}}
                                            image={articles.imageUrl ? articles.imageUrl : "src/assets/snail.png"}
                                            alt="No picture"
                                          
                                        />

                                        <CardActions>
                                            <Link target="_blank" href={articles.url} underline="hover" style={{color:'black', fontSize: 24, textAlign:"center"}}>{articles.title}</Link>
                                        </CardActions>

                                        <CardContent>
                                            <Typography style={{color:'black', fontSize: 24, paddingTop:10, textAlign:"center"}}> {articles.description}</Typography>
                                        </CardContent>

                                       
                                        
                                    </Card>
                                    {/* </Paper> */}
                                    {/* <Paper elevation={3} style={{textAlign: 'center', padding: 20, marginTop: 5, minHeight:60, marginBottom:20, maxWidth: 1400, minWidth:1400}}>
                                        <img className="articles-images" src ={articles.imageUrl} /> */}
                                        {/* <Link target="_blank" href={articles.url} underline="hover" style={{color:'black', fontSize: 24}}>{articles.title}</Link> */}
                                        {/* <Typography style={{color:'black', fontSize: 24, paddingTop:10}}> {articles.description}</Typography> */}
                                      
                                        {/* <Link target="_blank" href={articles.url} underline="hover">{articles.url}</Link> */}
                                    {/* </Paper> */}
                                </Grid>
                            </Grid>
                        </>
                       
                    )
                })}
            
            
            </div>

            <div className="loadMore-btn-container">
                {/* icon button that triggers handleLoad more function when clicked */}
                   {/* <IconButton
                    size="large"
                    edge="start"
                    // color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2}}
                    style={{color: 'black'}}
                    onClick={handleLoadMore}
                   >
                    < ArrowForwardIosIcon />
                   </IconButton> */}
                   <Button  variant="outlined" style={{color: 'brown', borderColor: 'brown', border: 4, fontSize:24}} onClick={handleLoadMore}>Load More</Button>
            </div>      
           
            </div>
        </>
    )
}
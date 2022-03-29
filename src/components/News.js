import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const capitalizer = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setprogress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setprogress(30);
        setLoading(true);
        let data = await fetch(url);
        props.setprogress(50);
        let parseData = await data.json();
        setarticles(parseData.articles);
        setLoading(false);
        settotalResults(parseData.totalResults);
        props.setprogress(100);
    }

    useEffect(() => {
        document.title = `NewsMonkey - ${capitalizer(props.category)}`;
        updateNews();
         /* eslint-disable */ //this comment is for disable eslint warning
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
    };

    return (
        <>
            <div className="container" >
                <h2 className="text-center" style={{marginTop: '75px'}}>NewsGalaxy - Top {capitalizer(props.category)} Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={< Spinner />}
                >
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-lg-4 col-md-6" key={element.url}>
                                    <NewsItem
                                        title={
                                            element.title?element.title.slice(0, 100):""
                                        }
                                        description={
                                            element.description ? element.description.slice(0, 100) : ""
                                        }
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll >
            </div >
        </>
    );

}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
};
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News
import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="card my-3">
            <img style={{ height: "225px" }} src={imageUrl ? imageUrl : "https://t4.ftcdn.net/jpg/01/67/74/79/360_F_167747932_NE1da5cf9FM30QExtlFjbmk9ypItoJl2.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title ? title : ""} ...&nbsp;<span className="badge bg-danger">{source}</span></h5>
                <p className="card-text" style={{ height: "80px" }}>{description} ...</p>
                <a href={newsUrl} className="btn btn-dark">Read More</a>
                <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            </div>
        </div>
    )
}

export default NewsItem
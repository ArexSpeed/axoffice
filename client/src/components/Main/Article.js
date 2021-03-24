import React from 'react'

const Article = ({appName, title, logo, desc, img, imgMobile}) => {
  return (
    <article className="appsSection__article">
          <div className="appsSection__article-left" data-aos="fade-right">
              <div className="appsSection__article-left-title">
                <div className={`appsSection__article-left-square ${appName}`}></div>
                <button className={`button-icon ${appName}`}>{logo}</button>
                <span className="appsSection__apps-button-name"> {title}</span>
              </div>
              <p className="appsSection__article-left-desc">
                {desc} 
              </p>
          </div>
          <div className="appsSection__article-right" data-aos="fade-left">
            <img className="appsSection__article-right-img" src={img} alt="" />
            <img className="appsSection__article-right-img-mobile" src={imgMobile} alt="" />
          </div>
      </article>
  )
}

export default Article

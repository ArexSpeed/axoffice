import React from 'react'
import db from "../../firebase";
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';


const FolderEmpty = ({name,url,theme}) => {

  const host = new URL(url).host;
  const urlIco = `https://${host}/favicon.ico`


  return (
    <div className={`mainFolders__item ${theme}`}>
      <img className='mainFolders__item-img' src={urlIco} alt="" />
      <p className={`mainBudget__item-title ${theme}`}>{name}</p>
      <div>
        <a href={url} target="_blank" rel="noreferrer">
          <LaunchIcon />
        </a>
        <DeleteIcon />
      </div>
    </div>
  );
}

export default FolderEmpty

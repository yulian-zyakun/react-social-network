import React from "react";
import s from "./Post.module.css";

const Post = (props) => {
    return (  
      <div> 
        <div className={s.item}>
            <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/die-hard-joel-tesch.jpg" className="Ava" alt="Avatar" />
          {props.message}
          <div><span>Like: {props.likesCount}</span></div>
        </div>
      </div>
    );
}

export default Post;
import React from "react";
import Attachment from "./Svg/Attachment";

function MessageForm ({handleSubmit, text, setText, setImg}){

    return(
      
        <form className="message_form" onSubmit={handleSubmit}>
            <label><Attachment /></label>
            <input type='file' id='image' accept="image/*" onChange={e => setImg(e.target.files[0])}></input>
            <div>
                <input type='text' placeholder="Enter message" value={text} onChange={e => setText(e.target.value)}/>
            </div>
            <div>
                <button className="btn">Send</button>
            </div>
        </form>

    )

}

export default MessageForm;                                                                          
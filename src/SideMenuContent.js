import React from 'react';
import { Image } from 'react-bootstrap';


const SideMenuContent = () => {

    return (
        <React.Fragment>
           <div className="OverlayContent">
               
                    <Image className="profilePicture" src="profile_pic.jpg" roundedCircle style={{width: '30vh' }} />
            <div className="InnerContent">
              This application was created by me, Technical Sergeant Christopher McConkey, at my own 
               volition. The content of this website is not the product of the United States Air Force
               nor the Department of Defense. It has not been endorsed or approved by any government agency.  
               This tool is offered freely without warrantee or guarantee.
                <br /><br />
               If you have questions, concerns or ideas please hit me up! (I'm in the GAL or use my personal email: <a href="mailto:mcconkey@gmail.com">mcconkey@gmail.com</a>.)
                </div>
           </div>
        </React.Fragment>
    );
};

export default SideMenuContent;
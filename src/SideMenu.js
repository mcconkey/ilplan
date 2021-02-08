import React from 'react';
import { AiOutlineFileText, AiFillCloseCircle } from 'react-icons/ai';

import SideMenuContent from './SideMenuContent';



const SideMenu = ({showCard, hideCard, isVisible}) => {

    return (
        <React.Fragment>
            <div class="BottomRightMenu">
                <AiOutlineFileText cursor="pointer" size='2em' onClick={() => showCard("menuOverlay")} />
            </div>
            <div className={isVisible.menuOverlay ? 'sideMenuVisible sideMenu' : 'sideMenu'} onClick={() => hideCard("menuOverlay")} />
            <div className={isVisible.menuOverlay ? 'glassOverlayVisible GlassOverlay' : 'GlassOverlay'} >
                <div className="GlassOverlayBottom" >
                    <AiFillCloseCircle cursor="pointer" size='1.5em' onClick={() => hideCard("menuOverlay")} />
                </div>
                <SideMenuContent />
            
            </div>
        </React.Fragment>
    );
};

export default SideMenu;

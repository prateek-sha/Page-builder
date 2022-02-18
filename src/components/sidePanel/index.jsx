import React from 'react'
import { sideMenuItems } from '../../elements/lib/constants'
import { BlockCards } from '../blockCards'
import './index.css'

export const SidePanel = () => {
    return (
        <div className="side-panel-wrapper" >
            <div className="item-wrapper" >
                <div>
                    <div className="title">BLOCKS</div>
                </div>
                <div>
                    {/* A components to render the differetn block  
                        @prop: types : array of blocks items(object)
                    */}
                    <BlockCards types={sideMenuItems} />
                </div>
            </div>
        </div>
    )
}

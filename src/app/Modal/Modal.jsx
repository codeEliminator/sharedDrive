import React from 'react'
import "./Modal.css"
export default function Modal({active, setActive, children}) {
  return (
    
        <div className={active? "modal active": "modal"} onClick={() => setActive(false)}>
            <div className={active? "modalContent active": "modalContent"} onClick = {(evt) => evt.stopPropagation()}>
              <div className='content-item'>
                {children}
              </div>
            </div>
        </div>
  )
}
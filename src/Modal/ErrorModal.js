import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ErrorModal = (props) => {
  
  const content =  (<div className='modalContainer'>
                    <div className='modal'>
                      <div className='modal__header'>
                        <h2>"An Error Occurred!!"</h2>
                      </div>
                      <div className='modal__content'>
                        <p>{props.error}</p>
                      </div>
                      <footer className='modal__footer'>
                        <button onClick={props.onClear} className="btn">Okay</button>
                      </footer>
                    </div>
                    </div>
    )
   

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

export default ErrorModal;

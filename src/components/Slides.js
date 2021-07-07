import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import staticTexts from '../config/texts';

//images
import img1 from '../images/slides01.jpg';
import img2 from '../images/slides02.png';
import img3 from '../images/slides03.jpg';
// import img4 from '../images/slides04.jpg';
import '../css/global.css';


function Slides(props) {


    return(
        <div style={{width: '100%', textAlign: 'right', marginLeft:window.innerWidth-1300>0 && (window.innerWidth-1300)/2}}><Carousel style={{maxWidth:'1300px'}}>
            <Carousel.Item>
                <img
                    style={{padding:'20px'}}
                    className="d-block w-100"
                    src={img2}
                    alt=""
                />
                <Carousel.Caption>
                    <p>{staticTexts.slides02}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ padding: '20px' }}
                    className="d-block w-100"
                    src={img3}
                    alt=""
                />
                <Carousel.Caption>
                    <p>{staticTexts.slides03}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{ padding: '20px' }}
                    className="d-block w-100"
                    src={img1}
                    alt=""
                />
                <Carousel.Caption>
                    <p>{staticTexts.slides01}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    );
}

export default Slides;
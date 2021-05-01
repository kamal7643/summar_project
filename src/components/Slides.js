import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import staticTexts from '../config/texts';

//images
import img1 from '../images/slides01.jpg';
import img2 from '../images/slides02.jpg';
import img3 from '../images/slides03.jpg';
import img4 from '../images/slides04.jpg';


function Slides(props) {
    return(
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={img1}
                alt=""
                />
                <Carousel.Caption>
                <p>{staticTexts.slides01}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
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
                    className="d-block w-100"
                    src={img4}
                    alt=""
                />
                <Carousel.Caption>
                    <p>{staticTexts.slides04}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Slides;
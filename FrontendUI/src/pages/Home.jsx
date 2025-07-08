import React from 'react';
import Landscape from '../assets/images/Landscape.jpg';

const Home = () => {
    return (
        <div className='Conrainer-fluid'>
            <div>
                <h1 className='text-blue-950 text-5xl ml-10 text- mt-15'>Events organization with our <br /> professional team.</h1>
            </div>
            <div className='d-flex content-end place-items-end'>
            <div className=''>
                <img className='h-85 w-fit mt-35' src={Landscape} alt="" />
            </div>
            </div>
        </div>
    );
}

export default Home;

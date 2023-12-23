import {useState} from 'react'
import React from 'react'

const Restart = ({handleRestartBehave}:any) => {
  
  return (
    <div className='fixed top-0 left-0 w-full h-full '>
                    
                    <div className='fixed w-screen h-screen z-10 bg-black opacity-[50%]'></div>
                    <div className='fixed w-full flex flex-col items-center top-1/2 transform -translate-y-1/2 z-20 bg-primary opacity-[95%] py-10'>
                        <h1 className='uppercase text-white text-3xl'>restart game ?</h1>
                        <div className='flex w-[75%] sm:w-[42%] min-[503px]:w-[60%] min-[830px]:w-[35%] min-[990px]:w-[30%] min-[1130px]:w-[23%] min-[1290px]:w-[17.5%]  justify-between mt-5'>
                            <button onClick={() => handleRestartBehave('cancel')} className='uppercase bg-white transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-whiteHoverShadow font-bold  text-primary py-2 px-3 rounded-md '>no, cancel</button>
                            <button onClick={() => handleRestartBehave('restart')} className='uppercase bg-orangeO font-bold  text-primary py-2 px-3 rounded-md transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-oHoverShadow '>yes, restart</button>
                        </div>
                    </div>
                </div>
  )
}

export default Restart;
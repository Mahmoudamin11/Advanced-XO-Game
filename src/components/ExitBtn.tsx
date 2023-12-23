import React from 'react'

const ExitBtn = ({Exit, Cancel}:any) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full'>
                        
            <div className='fixed w-screen h-screen z-10 bg-black opacity-[20%]'></div>
            <div className='fixed w-full flex flex-col items-center top-1/2 transform -translate-y-1/2 z-20 bg-primary opacity-[92%] py-10'>
                <div className='flex items-center '>
                    <p className='text-3xl text-white font-bold'>Do you want to exit ?</p>
                </div>
                <div id='buttons' className='flex w-[60%] sm:w-[40%] min-[900px]:w-[30%] min-[1130px]:w-[20%] min-[1290px]:w-[15%] justify-between mt-5'>
                    <button onClick={Cancel} className='bg-white font-bold hover:animate-moveAsYeah  text-primary py-2 px-3 rounded-md'>No, cancel</button>
                    <button onClick={Exit} className='bg-exit font-bold hover:animate-moveAsNo  text-white py-2 px-3 rounded-md'>Yes, exit</button>
                </div>
            </div>
    </div>
  );
}

export default ExitBtn;
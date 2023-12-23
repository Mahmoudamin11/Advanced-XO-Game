import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faO } from "@fortawesome/free-solid-svg-icons";

// Handle the exit and play again buttons
const DeclareWinner = ({winner, exit, PlayAgain}:any) => {
    const [win] = useState(winner);
    return (
        <div className='fixed top-0 left-0 w-full h-full'>
                        
            <div className='fixed w-screen h-screen z-10 bg-black opacity-[20%]'></div>
            <div className='fixed w-full flex flex-col items-center top-1/2 transform -translate-y-1/2 z-20 bg-primary opacity-[92%] py-10'>
                <div className='flex items-center text-3xl'>
                    {win == 'x' ? <FontAwesomeIcon icon={faXmark} className='text-blueX' size="2xl" /> : win=='o' ? <FontAwesomeIcon icon={faO} className='text-orangeO' size="2xl" /> : <div><FontAwesomeIcon icon={faXmark} className='text-blueX' size="2xl" /><FontAwesomeIcon icon={faO} className='text-orangeO' size="xl" /></div>}
                    {win != 'tie' && <p className='ml-3 text-xl text-white font-bold'>Takes the round</p>}
                    {win == 'tie' && <p className='ml-3 text-xl text-white font-bold'>Nobody took the round</p>}
                </div>
                <div id='buttons' className='flex w-[50%] sm:w-[30%] min-[975px]:w-[25%] min-[1110px]:w-[15%] min-[1290px]:w-[12.5%] justify-between mt-5'>
                    <button onClick={exit} className={win != 'tie' ? 'bg-white font-bold  text-primary py-2 px-3 rounded-md hover:animate-moveAsNo' : ' bg-slate-700 font-bold  text-white py-2 px-3 rounded-md hover:animate-moveAsNo'}>Exit</button>
                    <button onClick={PlayAgain} className={win == 'x' ? 'bg-blueX font-bold  text-primary py-2 px-3 rounded-md hover:animate-moveAsYeah' : win == 'o' ? 'bg-orangeO font-bold  text-primary py-2 px-3 rounded-md hover:animate-moveAsYeah': 'bg-white font-bold  text-primary py-2 px-3 rounded-md hover:animate-moveAsYeah' }>Play Again</button>
                </div>
            </div>
        </div>
      )
}

export default DeclareWinner;
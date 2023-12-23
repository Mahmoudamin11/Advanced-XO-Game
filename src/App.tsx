import {useState} from 'react' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faO } from "@fortawesome/free-solid-svg-icons";
import logo from '/src/assets/XO.png'
import VsHuman from './components/VsHuman';
import VsPc from './components/VsPC';
const App = () =>  { 
    const [chosenMark, setChosenmark] = useState('x');
    const [clickedBtn, setClickedBtn] = useState(0);

    const handleVs =  (n:number) => { 
        if (n == 1)
          setClickedBtn(1)
        else if (n == 2)
          setClickedBtn(2)
    }

    const handleChosenMark = (mark:String) => { 
        if (mark == 'x')
            setChosenmark('x');
        else
            setChosenmark('o');
    }

    const Quit = () => { 
        setClickedBtn(0);
    }

    
    return(
        <div className='w-full sm:w-3/4 min-[810px]:w-2/3 min-[925px]:w-[60%] min-[1060px]:w-1/2 min-[1140px]:w-[40%] min-[1290px]:w-[30%] sm:m-auto  p-5'>
            {clickedBtn == 0 && <div className='flex flex-col justify-center items-center h-screen'>
                <img src={logo} className='w-[45px] mb-16' alt="" />
                <p className='font-bold text-xl mb-5 text-white'>Choose player 1's mark</p>
                <div id="chooseMark" className="bg-white rounded-[8px] mb-[65px] w-full grid grid-cols-2 place-content-center place-items-center p-[6px]">
                    <span onClick={() => handleChosenMark('x')}  className={chosenMark == 'x' ?"text-white cursor-pointer bg-cardColor py-[18px] w-full text-center rounded-[8px]":"text-primary cursor-pointer bg-white py-[18px] w-full text-center rounded-[8px]"}><FontAwesomeIcon className={chosenMark == 'x' ? 'animate-bounce' : ''}  icon={faXmark} size="lg" /></span>
                    <span onClick={() => handleChosenMark('o')} className={chosenMark == 'o' ?"text-white cursor-pointer bg-cardColor py-[18px] w-full text-center rounded-[8px]" :"text-primary cursor-pointer bg-white py-[18px] w-full text-center rounded-[8px]"}><FontAwesomeIcon className={chosenMark == 'o' ? 'animate-bounce' : ''} icon={faO} size="lg" /></span>
                </div>
                <button onClick={() => handleVs(1)} className='bg-blueX transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xHoverShadow shadow-xShadow mb-[35px] w-full text-primary py-5 rounded-[8px] font-bold text-2xl'>VS Computer</button>
                <button onClick={() => handleVs(2)} className="bg-orangeO transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-oHoverShadow shadow-oShadow mb-[35px] w-full text-primary py-5 rounded-[8px] font-bold text-2xl">VS Player</button>
            </div>}

            {clickedBtn == 1 && <VsPc Mark={chosenMark} Quit={Quit} />}
            {clickedBtn == 2 && <VsHuman Mark={chosenMark} Quit={Quit}/>}
            
            
        </div>
    );
}

export default App;
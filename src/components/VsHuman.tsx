import React from 'react';
import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faO } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Restart from './Restart';
import DeclareWinner from './DeclareWinner';
import ExitBtn from './ExitBtn';

const VsHuman = ({Mark, Quit}:any) => {
    const [chosenMark, setChosenmark] = useState(Mark);
    const  [cells, setCells] = useState(['', '', '', '', '', '', '', '', '']);
    const [winningCells, setwinningCells] = useState([false, false, false, false, false, false, false, false, false])
    const [restart, setRestart] = useState(false);
    const [declareWinner, setDeclareWinner] = useState('');
    const [clickedCellsCnt, setClickedCellsCnt] = useState(0);
    // number of x wins
    const [xWins, setXWins] = useState(0);
    // number of o wins
    const [oWins, setOWins] = useState(0);
    // number of ties
    const [ties, setTies] = useState(0);
    //Handle Exit state => Did user clicked the exit btn or not 
    const [exitState, setExitState] = useState(false);
    // ================
        // Handle Exit Button (Comp will appear)
    // ================
    const switchRestartState = () => { 
        if (restart)
            setRestart(false);
        else
            setRestart(true);
    }
    const handleRestartBehave = (str:String) => { 
        if (str == 'restart') { // you clicked restart
            setRestart(false);
            setChosenmark(Mark);
            handleRestart();
        } else if (str == 'cancel') { // you clicked cancel
            setRestart(false);
        }
      }

      const handleRestart = () => {  // call it when i restart 
        cells.map((cell, index) => { 
            cells[index] = '';
        });
        winningCells.map((cell, index) => { 
            winningCells[index] = false ;
        });
        setDeclareWinner('');
        setClickedCellsCnt(0);
        setXWins(0);
        setOWins(0);
        setTies(0);
      }

    const editArr = (id:number) =>  { 
        cells.map((cell, index) => { 
            if (index == id) { 
                if (cells[id] === '') { 

                    if (chosenMark == 'x') { 
                        cells[id] =  'x';
                        setChosenmark('o');
                    }
                    else { 
                        cells[id] =  'o';
                        setChosenmark('x');
                    }
                    setClickedCellsCnt(clickedCellsCnt + 1);
                    checkWinning();
                }
            }
            
        })
    }

    useEffect( () => { // handle tie 
        if (clickedCellsCnt == 9 && declareWinner == '') { 
            setTimeout(() => { 
                setDeclareWinner('tie');
            }, 500);
            IncrementWins();
        }
    }
    , [clickedCellsCnt]);

    const checkWinning = () => { 
        // 012|345|678|036|147|258|048|246
        checkWinVertical();
        checkWinHorizontal();
        checkWinDiagonal();
    }
    const checkWinVertical = () => { 
        // 036|147|258
        // check vertically 
        if (cells[0] == cells[3] && cells[3] == cells[6] && cells[0] != '') { 
            WhoTookTheRound(cells[0]);  
            colorizeWinningCells(0,3,6); 
        }
        else if (cells[1] == cells[4] && cells[4] == cells[7] && cells[1] != '') { 
            WhoTookTheRound(cells[1]);  
            colorizeWinningCells(1,4,7); 
        }
        
        else if (cells[2] == cells[5] && cells[5] == cells[8] && cells[2] != '') { 
            WhoTookTheRound(cells[2]);  
            colorizeWinningCells(2,5,8); 
        }
        
    }
    const checkWinHorizontal = () => { 
        // 012|345|678
        // check horizontally 
        if (cells[0] == cells[1] && cells[1] == cells[2] && cells[0] != '') { 
            WhoTookTheRound(cells[0]);  
            colorizeWinningCells(0,1,2); 
        }
        else if (cells[3] == cells[4] && cells[4] == cells[5] && cells[3] != '') { 
            WhoTookTheRound(cells[3]);  
            colorizeWinningCells(3,4,5); 
        }
        
        else if (cells[6] == cells[7] && cells[7] == cells[8] && cells[6] != '') { 
            WhoTookTheRound(cells[6]);  
            colorizeWinningCells(6,7,8); 
        }
        
    }
    
    const checkWinDiagonal = () => { 
        // 048|246
        // check diagonally 
        if (cells[0] == cells[4] && cells[4] == cells[8] && cells[0] != '') { 
            WhoTookTheRound(cells[0]);  
            colorizeWinningCells(0,4,8); 
        }
        else if (cells[2] == cells[4] && cells[4] == cells[6] && cells[2] != '') { 
            WhoTookTheRound(cells[2]); 
            colorizeWinningCells(2,4,6); 
        }
        
        
    }
    

    const WhoTookTheRound = (winner:string) => { 
        setTimeout(() => { 
            setDeclareWinner(winner);
        }, 500);
        if (winner == 'x') { 
            setXWins(xWins + 1);
        } else if (winner == 'o') { 
            setOWins(oWins + 1);
        }
    }

    const IncrementWins = () => { 
        if (declareWinner == 'x') { 
            setXWins(xWins + 1);
        } else if (declareWinner == 'o') { 
            setOWins(oWins + 1);
        } else { 
            setTies(ties + 1);
        }
    }

    const colorizeWinningCells = (n1:number, n2:number, n3:number) => { 
        winningCells[n1] = true ;
        winningCells[n2] = true ;
        winningCells[n3] = true ;
    }
    // Exit function
    const Exit = () => { 
        Quit();
    }
    // PlayAgain function
    const PlayAgain = () => { 
        cells.map((cell, index) => { 
            cells[index] = '';
        });
        winningCells.map((cell, index) => { 
            winningCells[index] = false ;
        });
        setDeclareWinner('');
        setClickedCellsCnt(0);
    }
    // ExitBtn
    const Exit_Btn = () => { 
            setExitState(true);
        }
        
    const CancelExit = () => { 
        setExitState(false);
    }

    

  return (
    <>
    <div className='group sm:m-auto text-left w-fit absolute top-8 left-5 sm:left-[7.5%] md:left-[15%] lg:left-[30%] sm:top-[7.5%] cursor-pointer transform transition-all duration-300'>
        <FontAwesomeIcon onClick={Exit_Btn} className='text-cardColor  group-hover:text-exit cursor-pointer transform transition-all duration-150' icon={faCircleXmark} size="2xl" /> 
    </div>
    <div className='w-full sm:w-3/4 min-[498px]:w-[73%] min-[498px]:m-auto min-[810px]:w-2/3 min-[925px]:w-[60%] min-[1060px]:w-[70%] min-[1140px]:w-[85%]   flex flex-col justify-center h-screen'>
                <div className='flex justify-between'>
                    <div className='flex items-center'><FontAwesomeIcon icon={faXmark} className='text-blueX' size="2xl" /><FontAwesomeIcon icon={faO} className='text-orangeO' size="xl" /></div>
                    {/* who is turn ?  */}
                    <span className=' bg-cardColor flex items-center text-white p-2 uppercase rounded-md shadow-cardShadow'>{chosenMark == 'x' ? <FontAwesomeIcon icon={faXmark} className='text-blueX mr-2' size="xl" /> : <FontAwesomeIcon icon={faO} className='text-orangeO mr-2' size="xl" />} turn</span>
                    <span onClick={() => switchRestartState()} className='w-10 bg-white rounded-md transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-whiteHoverShadow flex justify-center items-center cursor-pointer shadow-whiteShadow'>
                    <FontAwesomeIcon icon={faArrowRotateRight} /></span>
                </div>
                {/* Game */}
                <div className='grid grid-cols-3 gap-y-[14px] gap-x-0 place-items-center mt-8 text-2xl'>
                    {cells.map((cell, index) => (
                        <span onClick={() => editArr(index) } className={winningCells[index] == true && cells[index] == 'x' ? 'bg-blueX transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xHoverShadow  w-[100px] h-[100px] shadow-cardShadow rounded-md flex items-center justify-center cursor-pointer animate-changeOpacity' : winningCells[index] == true && cells[index] == 'o' ? 'bg-orangeO transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-oHoverShadow  w-[100px] h-[100px] shadow-cardShadow rounded-md flex items-center justify-center cursor-pointer animate-changeOpacity' : 'bg-cardColor w-[100px] h-[100px] transform transition-all duration-300 hover:-translate-y-[2px] hover:shadow-cardHoverShadow shadow-cardShadow rounded-md flex items-center justify-center cursor-pointer'}>
                            {cells[index] == 'x' ? <FontAwesomeIcon id='x' icon={faXmark} className={winningCells[index] == true ? 'text-cardColor animate-ping' : 'text-blueX'} size="2xl" /> : cells[index] == 'o' ? <FontAwesomeIcon id='x' icon={faO} className={winningCells[index] == true ? 'text-cardColor animate-spin' : 'text-orangeO'} size="2xl" /> : null }
                        </span>
                    ))}
                    </div>
                <div className='flex justify-around mt-8'>
                    <span className='flex flex-col bg-blueX text-primary items-center justify-center w-1/4 py-2 rounded-md'>
                        <p><FontAwesomeIcon icon={faXmark}size="xl" /></p>
                        <span className=''>{xWins}</span>
                    </span>
                    <span className='flex flex-col bg-white text-primary items-center justify-center w-1/4 py-2 rounded-md'>
                        <p className='font-bold '>Ties</p>
                        <span className=''>{ties}</span>
                    </span>
                    <span className='flex flex-col bg-orangeO text-primary items-center justify-center w-1/4 py-2 rounded-md'>
                        <p><FontAwesomeIcon icon={faO}  size="lg" /></p>
                        <span className=''>{oWins}</span>
                    </span>
                </div>
                {restart && <Restart handleRestartBehave={handleRestartBehave}/>}
                
                {declareWinner != '' && <DeclareWinner winner={declareWinner} exit={Exit} PlayAgain={PlayAgain}/>}
                {exitState && <ExitBtn Exit={Exit} Cancel={CancelExit}/>}
            </div>
    </>
  );
}

export default VsHuman;
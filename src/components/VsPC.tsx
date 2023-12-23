
import {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faO } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Restart from './Restart';
import DeclareWinner from './DeclareWinner';
import ExitBtn from './ExitBtn';

/*

What to do ? 
    - determine last wing and play anywhere else 
*/

const VsPc = ({Mark, Quit}:any) => {
    const [chosenMark, setChosenmark] = useState(Mark);
    const playerMark = Mark ;   // the mark that the player has chosen
    let pcMark = '' ;
    if (playerMark == 'x')
        pcMark = 'o';
    if (playerMark == 'o')
        pcMark = 'x';

    const [pcCnt, setPcCnt] = useState(0)
        
    const  [cells] = useState(['', '', '', '', '', '', '', '', '']);
    const [winningCells] = useState([false, false, false, false, false, false, false, false, false])
    const [restart, setRestart] = useState(false);
    const [declareWinner, setDeclareWinner] = useState('');
    const [clickedCellsCnt, setClickedCellsCnt] = useState(0);
    // number of x wins
    const [playerWins, setPlayerWins] = useState(0);
    // number of o wins
    const [pcWins, setPcWins] = useState(0);
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
        setPlayerWins(0);
        setPcWins(0);
        setTies(0);
        setPcCnt(0);
    }
      // Will be edited   [whenever the player plays i will call a fun that called pc which will be the logic of pc]
    const editArr = (id:number) =>  { 
        if (chosenMark == playerMark) { 
            cells.map((cell, index) => { 
                if (index == id) { 
                    if (cells[id] === '') { 
    
                        if (chosenMark == 'x') { 
                            cells[id] =  playerMark;
                            setChosenmark('o');
                        }
                        else { 
                            cells[id] =  playerMark;
                            setChosenmark('x');
                        }
                        setClickedCellsCnt(clickedCellsCnt + 2);
                        // we need to know if player won pc can't play
                        if (!checkWinning()) 
                            pcTurn();
                    
                    }
                }
                
            })
        }
    }

    const isPcAboutToWin = () => {
        let h = CheckHZ(pcMark) ;
        let v = CheckV(pcMark) ;
        let d = CheckDiagonal(pcMark) ;

        if (pcCnt >= 2) { 
            // check horizontally
            if (h != -1) {
                cells[h] = pcMark ;
                return true ;
            }
            // check vertically
            else if (v != -1) {
                cells[v] = pcMark ;
                return true ;
            }
            // check diagonally
            else if (d != -1) {
                cells[d] = pcMark ;
                return true ;
            }
            return false ;
        }
    }
    
    const isPlayerAboutTowin = () => {
        let h = CheckHZ(playerMark) ;
        let v = CheckV(playerMark) ;
        let d = CheckDiagonal(playerMark) ;

        
            // check horizontally
            if (h != -1) {
                cells[h] = pcMark ;
                return true ;
            }
            // check vertically
            else if (v != -1) {
                cells[v] = pcMark ;
                return true ;
            }
            // check diagonally
            else if (d != -1) { 
                cells[d] = pcMark ;
                return true ;
            }
            return false ;
        
    }

    const pcTurn = () => {
        
        setTimeout(() => { 
            if (isPcAboutToWin()) { 
                
                checkWinning();
            }
            else { 
                if (!isPlayerAboutTowin()) { 
                    pcStartGame(); // determines where pc will play when no chance to win or to loose 
                } 
            }
            
            // i will start checking only if pc marks are 2 or  more
            // check winning for pc 
            setChosenmark(playerMark);
            setPcCnt(pcCnt + 1);
    }, 850);
    }

    const pcStartGame = () => {

        if (cells[4] == '') { 
            cells[4] = pcMark ;
        }

        else if (cells[4] == playerMark) { 
            EmptyCell('wings');
        }
        
        else if (cells[0] == playerMark) {
            if (cells[8] == ''){
                cells[8] = pcMark ;
                
            } else { 
                EmptyCell('notWings');  // try to build for your self when u are looking for wings 
            }
        } 
        else if (cells[2] == playerMark) { 
            if (cells[6] == ''){
                cells[6] = pcMark ;
                
            } else { 
                EmptyCell('notWings');
            }
        } 
        else if (cells[6] == playerMark) { 
            if (cells[2] == ''){
                cells[2] = pcMark ;
                
            } else { 
                EmptyCell('notWings');
            }
        } 
        else if (cells[8] == playerMark) { 
            if (cells[0] == ''){
                cells[0] = pcMark ;
                
            } else { 
                EmptyCell('notWings');
            }
        } 
        else { 
            EmptyCell('wings');
        }
    }

    const EmptyCell = (where:string) => {
        if (where == 'notWings') { 
            if (cells[1] == '' || cells[3] == '' || cells[5] == '' || cells[7] == '') { 
                const wingCells = [1, 3, 5, 7];
                    while(true) { 
                        let rand = Math.floor(Math.random() * 4) ; // gets random num bet 0 and 3 to check on arr 
                        if (cells[wingCells[rand]] == '') { 
                            cells[wingCells[rand]] = pcMark ; 
                            break;
                        }
                    }
            }
            else { 
                let emptyIndecies = new Array();
                for(let i =0 ; i < 9; i++) { 
                    if (cells[i] == '') { 
                        emptyIndecies.push(i);   // emptyIndecies => [0, 2, 6]
                    }
                }
                let rand = Math.floor(Math.random() * emptyIndecies.length);
                cells[emptyIndecies[rand]] = pcMark ;
            }
        }
        else if (where == 'wings') { 
            // need to know the highest index of playerMark
            let biggestIndexOfPMark = -1 ;
            for (let i =0 ;i< 9; i++) { 
                if (cells[i] == playerMark && i > biggestIndexOfPMark) { 
                    biggestIndexOfPMark = i ;
                }
            }
            // determine the most far wing from player marks

            if (cells[0] == '' || cells[2] == '' || cells[6] == '' || cells[8] == '') { 
                const wingCells = [0, 2, 6, 8];
                let farestWing = -1 ;
                let biggestDiff = -1 ;
                let leastDiff = 99;
                let nearstWing = -1;
                for(let i=0 ; i < 4; i++) { 
                    let diff = biggestIndexOfPMark - wingCells[i];
                    if (diff < 0)
                        diff = diff * -1 ;
                    if (diff > biggestDiff){ 
                        biggestDiff = diff ;
                        farestWing = wingCells[i];
                    }
                }
                for(let i=0 ; i < 4; i++) { 
                    let diff = biggestIndexOfPMark - wingCells[i];
                    if (diff < 0) { 
                        diff = diff * -1 ;
                    }
                    if (diff < leastDiff){ 
                        leastDiff = diff ;
                        nearstWing = wingCells[i];
                    }
                }

                if(biggestIndexOfPMark == 5) { 
                    cells[2] = pcMark ;
                }

                else { 
                    
                    while(true) { 
                        let rand = Math.floor(Math.random() * 4) ;
                        if (cells[nearstWing] == '') { 
                            console.log(wingCells[nearstWing]);
                            cells[nearstWing] = pcMark ; 
                            break;
                        } // gets random num bet 0 and 3 to check on arr 
                        else if (cells[wingCells[rand]] == '' ) { 
                            cells[wingCells[rand]] = pcMark ; 
                            break;
                        }
                    }
                }
            }
            else { 
                let emptyIndecies = new Array();
                for(let i =0 ; i < 9; i++) { 
                    if (cells[i] == '') { 
                        emptyIndecies.push(i);   // emptyIndecies => [0, 2, 6]
                    }
                }
                let rand = Math.floor(Math.random() * emptyIndecies.length);
                cells[emptyIndecies[rand]] = pcMark ;
            }
        }
    }

    const CheckHZ = (mark:string) => { 
        // 0 1 2
        if (cells[0] == mark && cells[1] == mark){ 
            if (cells[2] == '')
                return 2 ;
        }
        else if (cells[0] == mark && cells[2] == mark){ 
            if (cells[1] == '')
                return 1 ;
        }
        else if (cells[2] == mark && cells[1] == mark){ 
            if (cells[0] == '')
                return 0 ;
        }
        // 3 4 5
        if (cells[3] == mark && cells[4] == mark){ 
            if (cells[5] == '')
                return 5 ;
        }
        else if (cells[3] == mark && cells[5] == mark){ 
            if (cells[4] == '')
                return 4 ;
        }
        else if (cells[4] == mark && cells[5] == mark){ 
            if (cells[3] == '')
                return 3 ;
        }
        // 6 7 8
        if (cells[6] == mark && cells[7] == mark){ 
            if (cells[8] == '')
                return 8 ;
        }
        else if (cells[6] == mark && cells[8] == mark){ 
            if (cells[7] == '')
                return 7 ;
        }
        else if (cells[7] == mark && cells[8] == mark){ 
            if (cells[6] == '')
                return 6 ;
        }
        return -1 ;
    }

    const CheckV = (mark:string) => { 
        // 0 3 6
        if (cells[0] == mark && cells[3] == mark){
            if (cells[6] == '')
                return 6 ;
        }
        else if (cells[0] == mark && cells[6] == mark){ 
            if (cells[3] == '')
                return 3 ;
        }
        else if (cells[3] == mark && cells[6] == mark){ 
            if (cells[0] == '')
                return 0 ;
        }
        // 1 4 7
        if (cells[1] == mark && cells[4] == mark){ 
            if (cells[7] == '')
                return 7 ;
        }
        else if (cells[1] == mark && cells[7] == mark){ 
            if (cells[4] == '')
                return 4 ;
        }
        else if (cells[4] == mark && cells[7] == mark){ 
            if (cells[1] == '')
                return 1 ;
        }
        // 2 5 8
        if (cells[2] == mark && cells[5] == mark){ 
            if (cells[8] == '')
                return 8 ;
        }
        else if (cells[2] == mark && cells[8] == mark){ 
            if (cells[5] == '')
                return 5 ;
        }
        else if (cells[5] == mark && cells[8] == mark){ 
            if (cells[2] == '')
                return 2 ;
        }
        return -1 ;
    }

    // check is pc going to win diagonally 
    const CheckDiagonal = (mark:string) => { 
        // 0 4 8
        if (cells[0] == mark && cells[4] == mark){ 
            if (cells[8] == '')
                return 8 ;
        }
        else if (cells[0] == mark && cells[8] == mark){ 
            if (cells[4] == '')
                return 4 ;
        }
        else if (cells[4] == mark && cells[8] == mark){ 
            if (cells[0] == '')
                return 0 ;
        }
        // 2 4 6
        if (cells[2] == mark && cells[4] == mark){ 
            if (cells[6] == '')
                return 6 ;
        }
        else if (cells[2] == mark && cells[6] == mark){ 
            if (cells[4] == '')
                return 4 ;
        }
        else if (cells[4] == mark && cells[6] == mark){ 
            if (cells[2] == '')
                return 2 ;
        }
        return -1 ;
    }

    useEffect( () => { // handle tie 
        if (clickedCellsCnt >= 9 && declareWinner == '') { 
            setTimeout(() => { 
                setDeclareWinner('tie');
            }, 500);
            IncrementWins();
        }
    }
    , [clickedCellsCnt]);

    const checkWinning = () => { 
        // 012|345|678|036|147|258|048|246
        if (checkWinVertical()) { 
            return true ;
        }
        if (checkWinHorizontal()) { 
            return true ;
        }
        if (checkWinDiagonal()) { 
            return true ;
        }
        return false ;
    }
    const checkWinVertical = () => { 
        // 036|147|258
        // check vertically 
        if (cells[0] == cells[3] && cells[3] == cells[6] && cells[0] != '') { 
            WhoTookTheRound(cells[0]);  
            colorizeWinningCells(0,3,6); 
            return true ;
        }
        else if (cells[1] == cells[4] && cells[4] == cells[7] && cells[1] != '') { 
            WhoTookTheRound(cells[1]);  
            colorizeWinningCells(1,4,7); 
            return true ;
        }
        
        else if (cells[2] == cells[5] && cells[5] == cells[8] && cells[2] != '') { 
            WhoTookTheRound(cells[2]);  
            colorizeWinningCells(2,5,8);  
            return true ;
        }
        return false ;
        
    }
    const checkWinHorizontal = () => { 
        // 012|345|678
        // check horizontally 
        if (cells[0] == cells[1] && cells[1] == cells[2] && cells[0] != '') { 
            WhoTookTheRound(cells[0]);  
            colorizeWinningCells(0,1,2);  
            return true ;
        }
        else if (cells[3] == cells[4] && cells[4] == cells[5] && cells[3] != '') { 
            WhoTookTheRound(cells[3]);  
            colorizeWinningCells(3,4,5);  
            return true ;
        }
        
        else if (cells[6] == cells[7] && cells[7] == cells[8] && cells[6] != '') { 
            WhoTookTheRound(cells[6]);  
            colorizeWinningCells(6,7,8);  
            return true ;
        }
        return false ;
    }
    
    const checkWinDiagonal = () => { 
        // 048|246
        // check diagonally 
        if (cells[0] == cells[4] && cells[4] == cells[8] && cells[0] != '') { 
            WhoTookTheRound(cells[0]);  
            colorizeWinningCells(0,4,8);  
            return true ;
        }
        else if (cells[2] == cells[4] && cells[4] == cells[6] && cells[2] != '') { 
            WhoTookTheRound(cells[2]); 
            colorizeWinningCells(2,4,6);  
            return true ;
        }
        
        return false ;
    }
    

    const WhoTookTheRound = (winner:string) => { 
        setTimeout(() => {
            setDeclareWinner(winner);
        }, 500);
        if (winner == playerMark) { 
            setPlayerWins(playerWins + 1);
        } else if (winner == pcMark) { 
            setPcWins(pcWins + 1);
        }
    }

    const IncrementWins = () => { 
        if (declareWinner == playerMark) { 
            setPlayerWins(playerWins + 1);
        } else if (declareWinner == pcMark) { 
            setPcWins(pcWins + 1);
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
        setPcCnt(0);
        setChosenmark(playerMark);
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
                    <span className={playerMark == 'x' ? 'flex flex-col bg-blueX text-primary items-center justify-center w-1/4 py-2 rounded-md' : 'flex flex-col bg-orangeO text-primary items-center justify-center w-1/4 py-2 rounded-md' }>
                        <p className='font-bold text-lg text-primary'>You</p>
                        <span className=''>{playerWins}</span>
                    </span>
                    <span className='flex flex-col bg-white text-primary items-center justify-center w-1/4 py-2 rounded-md'>
                        <p className='font-bold '>Ties</p>
                        <span className=''>{ties}</span>
                    </span>
                    <span className={pcMark == 'x' ? 'flex flex-col bg-blueX text-primary items-center justify-center w-1/4 py-2 rounded-md' : 'flex flex-col bg-orangeO text-primary items-center justify-center w-1/4 py-2 rounded-md'}>
                    <p className='font-bold text-lg text-primary'>PC</p>
                        <span className=''>{pcWins}</span>
                    </span>
                </div>
                {restart && <Restart handleRestartBehave={handleRestartBehave}/>}
                
                {declareWinner != '' && <DeclareWinner winner={declareWinner} exit={Exit} PlayAgain={PlayAgain}/>}
                {exitState && <ExitBtn Exit={Exit} Cancel={CancelExit}/>}
            </div>
    </>
  );
}

export default VsPc;
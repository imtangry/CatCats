import Button from "./components/Button.tsx";
import coins from './assets/coins.png'
import energy from './assets/energy.png'
import e1 from './assets/buy-e-1.png'
import e2 from './assets/but-e-2.png'
import e3 from './assets/buy-e-3.png'
import cat1 from './assets/cat-1.png'
import cat2 from './assets/cat-2.png'
import headerBG from './assets/card-header-bg.png'

import {useTonAddress, useTonConnectModal} from '@tonconnect/ui-react';
import {useCallback} from "react";

function App() {
    const count = 32
    const address = useTonAddress();
    const {open} = useTonConnectModal();

    const handleConnectWallet = useCallback(() => {
        open();
    }, [open]);

    const energyList = [
        {
            name: '200',
            value: 200,
            ton: 0.99,
            img: e1
        },
        {
            name: '1000',
            value: 1000,
            ton: 3.99,
            img: e2
        },
        {
            name: '5000',
            value: 5000,
            ton: 9.99,
            img: e3
        },

    ]

    const catList = [
        {
            name: 'Kitty',
            coin: 4500,
            energy: 300,
            img: cat1,
            ton: 19.9
        },
        {
            name: 'Miya',
            coin: 3000,
            energy: 500,
            img: cat2,
            ton: 19.9
        },
    ]

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-[#FFF2EA] border-4 border-[#FFCDAD] overflow-hidden">
            <div className='w-full flex px-3 py-3 space-x-4'>
                <Button bg1='#8E381E' bg2='#FFA577' className="w-20">
                    <div className="flex items-center text-white text-xl">
                        <img src={coins} alt="logo" className="w-5 h-5 mr-1"/>
                        <span>{count}</span>
                    </div>
                </Button>

                <Button bg1='#8E381E' bg2='#FFA577' className="w-20">
                    <div className="flex items-center text-white text-xl">
                        <img src={energy} alt="logo" className="w-5 h-5 mr-1"/>
                        <span>{count}</span>
                    </div>
                </Button>

                {address ? (
                    <div className="w-20"> {address} </div>
                ) : (
                    <button onClick={handleConnectWallet} className="px-4 py-2 bg-[#8E381E] text-white rounded-xl w-full ml-auto"> 连接钱包 </button>
                )}

            </div>
            <div className="flex-1 w-full flex flex-col items-center px-3 space-y-4 pt-4 pb-20 overflow-auto">
                {energyList.map((item, index) => (
                    <div className="flex flex-col items-center text-white text-xl w-full bg-white rounded-lg p-4"
                         key={index}>
                        <h1 className="w-full text-black font-bold text-right">{item.name}x</h1>
                        <img src={item.img} className="h-20" alt="buy energy"/>
                        <button style={{boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.33)', fontFamily: 'ABeeZee',}}
                                className="bg-[#EC4444] border border-[#851E1E] text-white rounded-xl w-full py-2 mt-4 font-bold text-xl">{item.ton}
                            <span className="text-xs text-gray-100 ml-2">TON</span>
                        </button>
                    </div>
                ))}

                {catList.map((item, index) => (
                    <div
                        className="relative flex flex-col items-center text-white text-xl w-full bg-white rounded-lg p-4"
                        key={index}>
                        <div className="absolute top-0 left-0 right-0 h-14 bg-cover bg-center -z-1">
                            <img src={headerBG} alt="header" className="w-full h-full object-cover"/>
                        </div>
                        <div className="w-full text-black font-bold text-center h-16 z-10">{item.name}x
                        </div>
                        <img src={item.img} className="h-24 mb-4" alt="buy energy"/>

                        <div
                            className="flex flex-col w-full bg-[#FAE5D7] my-4 p-4 rounded-lg space-y-4 text-xl">
                            <div className="flex items-center">
                                <img src={coins} alt="logo" className="w-5 h-5 mr-1"/>
                                <span className="text-[#AF6332]  font-bold">{item.coin}</span>
                            </div>
                            <div className="flex items-center">
                                <img src={energy} alt="logo" className="w-5 h-5 mr-1"/>
                                <span className="text-[#AF6332] font-bold">{item.energy}</span>
                            </div>
                        </div>
                        <button style={{boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.33)', fontFamily: 'ABeeZee',}}
                                className="bg-[#EC4444] border border-[#851E1E] text-white rounded-xl w-full py-2 mt-4 font-bold text-xl">{item.ton}
                            <span className="text-xs text-gray-100 ml-2">TON</span>
                        </button>
                    </div>
                ))}
            </div>
            <div
                className="flex absolute bottom-0 left-0 right-0 w-full items-center justify-around h-16 bg-gray-200"
                style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
            </div>
        </div>
    )
}

export default App

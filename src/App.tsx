import Button from "./components/Button.tsx";
import coins from './assets/coins.png'
import energy from './assets/energy.png'
import e1 from './assets/buy-e-1.png'
import e2 from './assets/but-e-2.png'
import e3 from './assets/buy-e-3.png'
import cat1 from './assets/cat-1.png'
import cat2 from './assets/cat-2.png'
import headerBG from './assets/card-header-bg.png'
import close from './assets/close.png'

import {useTonAddress, useTonConnectModal, useTonWallet, useTonConnectUI, CHAIN} from '@tonconnect/ui-react';
import {useCallback, useEffect, useState} from "react";

function App() {
    const count = 32
    const [showDetails, setShowDetails] = useState(false)
    const [balance, setBalance] = useState(0)
    const address = useTonAddress();
    const {open} = useTonConnectModal();
    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();

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

    // 怎么监听某个地址的事件
    const getBalance = async (address: string, chain: CHAIN | null) => {
        const response = await fetch(`https://${chain === CHAIN.MAINNET ? '' : 'testnet.'}toncenter.com/api/v3/addressInformation?address=${address}`);
        const data = await response.json();
        const balance = data.balance;
        console.log(balance)
        setBalance(parseFloat(String(balance / 1e9)));
    }

    useEffect(() => {
        if (wallet?.account?.address) {
            (async () => {
                console.log('getBalance')
                await getBalance(wallet.account.address, wallet.account.chain ?? null);
            })()
        }
    }, [wallet]);

    return (
        <div
            className="flex flex-col items-center justify-center h-screen bg-[#FFF2EA] border-4 border-[#FFCDAD] overflow-hidden">
            <div className='w-full flex items-center px-3 py-3 space-x-4 overflow-hidden'>
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
                    <button onClick={() => setShowDetails(!showDetails)}
                            className="flex-1 flex items-center px-4 py-2 bg-[#8E381E] text-white rounded-xl ml-auto overflow-hidden ">
                        <span className='flex-1 text-ellipsis whitespace-nowrap overflow-hidden'>{address}</span>
                    </button>
                ) : (
                    <button onClick={handleConnectWallet}
                            className="flex-1 px-4 py-2 bg-[#8E381E] text-white rounded-xl ml-auto"> 连接钱包 </button>
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
                className="flex absolute bottom-0 left-0 right-0 w-full items-center justify-around h-16 bg-gray-200 z-20"
                style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}>
            </div>

            <div
                className="flex flex-col space-y-4 absolute bottom-0 left-0 right-0 w-full bg-white z-30 transition-all duration-400 rounded-lg pt-16 px-4 pb-16 overflow-hidden"
                style={{
                    height: showDetails ? '80vh' : '0',
                    padding: showDetails ? '16px' : '0',
                    boxShadow: '3px 0px 10px rgba(0, 0, 0, 0.3)',
                }}
            >
                <div
                    className="absolute flex items-center justify-center right-2 top-2 h-12 w-12 pt-1 rounded-2xl bg-[#E09667]"
                    onClick={() => setShowDetails(false)}>
                    <img src={close} alt="cat" className="w-6 h-6" style={{transform: 'rotate(14.11deg)'}}/>
                </div>

                <div className="flex flex-col">
                    <span>Connected wallet: {wallet?.name}</span>
                    <span>Device: {wallet?.device?.appName}</span>
                    <span>Chain: {wallet?.account?.chain === CHAIN.MAINNET ? 'Mainnet' : 'Testnet'}</span>
                </div>

                <div>
                    <span className="font-bold">Address: </span>
                    <p className="text-gray-500">{address}</p>
                </div>

                <div>
                    <span className="font-bold">Balance: </span>
                    <p className="text-gray-500">{balance}</p>
                </div>

                <div
                    className="absolute bottom-2 left-0 right-0 h-16 flex flex-col items-center text-white text-xl w-full bg-white rounded-lg px-4">
                    <button onClick={async () => await tonConnectUI.disconnect()}
                            className="bg-[#EC4444] border border-[#851E1E] text-white rounded-xl w-full py-2 mt-4 font-bold text-xl">断开连接
                    </button>
                </div>

            </div>
        </div>
    )
}

export default App

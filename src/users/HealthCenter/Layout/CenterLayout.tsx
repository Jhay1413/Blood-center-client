import { ReactNode,  useRef, useState } from "react";
import CenterHeaderPage from "./CenterHeader";

import CenterPageNavigation from "./CenterNavigation";

type CenterLayoutProps = {
    children : ReactNode
}
const CenterPageLayout = ({children}:CenterLayoutProps) => {
    const [navBarState,setNavBarState] = useState<boolean>(true);
    const divRef = useRef<HTMLDivElement | null>(null);

    const changeNavbarState = () =>{
        setNavBarState(!navBarState)
    }
    return ( 
        <>
            <div className="flex h-screen bg-gray-100 relative">
                <div ref={divRef} className={`${navBarState ? 'absolute' : 'hidden'} w-64 lg:w-1/6 bg-white p-4 lg:flex lg:fixed h-full z-10`}>
                    <CenterPageNavigation onClick={changeNavbarState}/>
                </div>
                <div className={`${navBarState ? 'opacity-25 ' : 'opacity-100'} lg:opacity-100 flex flex-col w-full lg:w-10/12 min-h-max  lg:ml-1/6`}>
                    <div className="p-4 w-full items-center justify-center flex">
                        <div className="bg-white w-full p-4 rounded-md shadow-md">
                            <CenterHeaderPage onClick={changeNavbarState}/>
                        </div>
                    </div>
                    <div className="mt-3 p-4 min-w-full min-h-0 min-h-max bg-gray-100">
                       {children}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default CenterPageLayout;
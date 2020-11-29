import {useContext} from "react";
import OpenDotaServiceContext from "../context/openDotaContext";


const useOpenDotaService = () => {
    return useContext(OpenDotaServiceContext);
}


export default useOpenDotaService
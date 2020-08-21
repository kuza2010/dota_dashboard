import React, {useContext} from "react";

import OpenDotaServiceContext from "../../components/context/openDotaContext";

import "./player-page.css"

/**
 * This page render player by provided id
 * Props should contain 'props.match.accountId' field. It must be number.
 */
const PlayerPageWrapper = (props) => {
    const openDotaService = useContext(OpenDotaServiceContext);

    openDotaService.getPlayer(92423451).then(g => console.log("final:", g));

    return (
        <div>
            Player {props.match.params.accountId}
        </div>
    );
}


export default PlayerPageWrapper;
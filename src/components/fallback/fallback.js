import React from "react";


const PlayerPageFallback = ({accountId}) => {
    return (
        <div className="text-center">
            <h2 className="text-danger"> Sorry, but we <strong>can't find</strong> player with id {`${accountId}`} :(</h2>
        </div>
    )
}


export default PlayerPageFallback;
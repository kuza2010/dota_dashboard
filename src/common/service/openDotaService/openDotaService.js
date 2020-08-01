import {convertPlayer, filterProPlayers} from "./utils";

import {playersFieldsToFilter} from "../../enums";

class OpenDotaService {

    _apiBase = "https://api.opendota.com/api"

    _getResources = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Couldn't fetch: ${url}, status is: ${res.status}`)
        }
        return await res.json();
    }

    getHeroes = async () => {
        return this._getResources("/heroes");
    }

    getHeroStats = async () => {
        return this._getResources("/heroStats");
    }

    getProPlayers = async () => {
        const proPlayers = await this._getResources("/proPlayers");
        return filterProPlayers(proPlayers)(...playersFieldsToFilter)
            .map(player => convertPlayer(player))
    }

}


export default OpenDotaService;
import moment from "moment";
import {cacheAliveTimeInMinutes} from "./openDotaService/enums";


export default class Cache {

    constructor() {
        this.cache = new Map();
    };

    isEmpty = () => (this.cache.size === 0);

    put = (key, val, expireDate) => {
        if (!this.has(key)) {
            //console.log("Add", key, " to cache.")
            this.cache.set(key, new CacheItem(val, expireDate));
        }
        return this.get(key);
    };

    get = (key, defaultValue = null) => {
        if (this.has(key)) {
            //console.log("Return value for ", key, " from cache")
            return this.cache.get(key).val;
        }
        return defaultValue;
    };

    has = (key) => {
        if (this.isEmpty()) return false

        const value = this.cache.get(key);
        if (value === undefined) return false

        if (value.isExpired()) {
            console.log("Cache is expired for key:", key, " remove them");
            this._remove(key);
            return false;
        }

        return true;
    };

    _remove = (key) => (this.cache.delete(key));
}


class CacheItem {
    constructor(val, expireDate = cacheAliveTimeInMinutes) {
        this.val = val;
        this.expireDate = moment().add(expireDate, 'minutes');
    };

    isExpired() {
        return moment() > this.expireDate;
    }
}
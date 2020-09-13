export default class NotFoundException extends Error {

    constructor(message, extra) {
        super(message);
        this.name = "NotFoundException";
        this.extra = extra;
    }

}
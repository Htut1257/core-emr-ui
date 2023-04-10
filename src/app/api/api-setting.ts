export class ApiSetting {
    public static get UserApiEndPoint() {
        return 'http://192.168.100.48:8079';
    }

    public static get AccountApiEndPoint() {
        return 'http://192.168.100.213:8079';
    }
    public static get InventoryApiEndPoint() {
        return 'http://192.168.100.213:8079';
    }

    public static get PayRollApiEndPoint() {
        return 'http://localhost:8098';
    }

    public static get EmrEndPoint() {
        return 'http://192.168.100.48:8080';
    }

    public static get EmrMongoEndPoint() {
        return 'http://192.168.100.48:8082';
    }

}
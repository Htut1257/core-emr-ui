export class ApiSetting {

    
    //local DESKTOP-LV3P92S
    //ng build --configuration production --base-href /coreemr/  

    public static get UserApiEndPoint() {
        return 'http://192.168.100.4:8079';
    }

    public static get AccountApiEndPoint() {
        return 'http://192.168.100.4:8079';
    }
    public static get InventoryApiEndPoint() {
        return 'http://192.168.100.4:8079';
    }

    public static get PayRollApiEndPoint() {
        return 'http://192.168.100.4:8098';
    }

    public static get EmrEndPoint() {
        return 'http://192.168.100.48:8080';
    }

    public static get EmrMongoEndPoint(){
        return 'http://192.168.100.4:8082';
    }

}
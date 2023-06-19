export class ApiSetting {

    
    //local DESKTOP-LV3P92S
    //ng build --configuration production --base-href /coreemr/  

    public static get UserApiEndPoint() {
        return 'http://localhost:8079';
    }

    public static get AccountApiEndPoint() {
        return 'http://localhost:8079';
    }
    public static get InventoryApiEndPoint() {
        return 'http://localhost:8079';
    }

    public static get PayRollApiEndPoint() {
        return 'http://localhost:8098';
    }

    public static get EmrEndPoint() {
        return 'http://localhost:8080';
    }

    public static get EmrMongoEndPoint(){
        return 'http://localhost:8082';
    }

}
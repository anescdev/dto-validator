/**
 * Clase la cuál proporciona un método sencillo para comprobar las propiedades de un JSON. Útil para las API RESTs
 * @author AnesCatman
 */
export default class BaseDto {
    private keys: string[];
    /**
     * Construye un validador de JSON para que pueda comprobar que las propiedades coincide con las 
     * que usted defina.
     * @param keys Las propiedades que deberá de tener el JSON
     */
    constructor(...keys: string[]) {
        //Si no pasa ninguna propiedad, lanzamos error
        if (keys.length < 1) {
            throw new Error("No has pasado ningún elemento");
        }
        //Si llegamos aquí,añadimos las propiedades
        this.keys = keys;
    }
    /**
     * Método que comprueba si un objeto se parece a un DTO. Hay dos formas para comparar un objeto,
     * la forma estricta que obligará a que el JSON tenga el mismo número de propiedades que el validador,
     * el no estricto permite añadir más de las que están definidas en el validador pero estas últimas no las comprobará
     * @param objectToParse Objeto que comprobará
     * @param strict Booleano para indicar si la comprobación es estricta
     * @returns True si es válido, false si no
     */
    public isLikeDto(objectToParse: object, strict: boolean): boolean {
        //Si la cantidad de propiedades del DTO es diferente a las del objeto y el modo estricto está activado, retornamos false
        if ((this.keys.length !== Object.keys(objectToParse).length) && strict) {
            return false;
        }
        //Recorremos todas las propiedades del DTO
        for (let index = 0; index < this.keys.length; index++) {
            //Si la propiedad actual no está en el objeto retornamos false
            if (!(this.keys[index] in objectToParse)) {
                return false;
            }
        }
        //Si llegamos aquí es que cumple con las propiedades del DTO, por lo que retornamos true
        return true;
    }
}
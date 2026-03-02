
class Utils {

    public static floorFractionalNumber(num: number, amountDecimals: number) {
        
        if (!num.toString().includes(".")) {
            return num
        }

        var decimals = 10**amountDecimals
        return Math.floor(num * decimals) / decimals
    }

    public static GetDate (): string {

        var date = new Date()
        
        var d = date.getDate().toString()
        var m = date.getMonth().toString()
        var y = date.getFullYear().toString()
        
        return `${d}/${m}/${y}`;
    }
    
}


export default Utils;
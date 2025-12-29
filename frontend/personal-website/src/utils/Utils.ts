class Utils {


    public static floorFractionalNumber(num: number, amountDecimals: number) {
        
        if (!num.toString().includes(".")) {
            return num
        }

        var decimals = 10**amountDecimals
        return Math.floor(num * decimals) / decimals
    }
}


export default Utils;
class Utils {


    public static floorFractionalNumber(num: number, amountDecimals: number) {
        
        if (!num.toString().includes(".")) {
            return num
        }

        var decimals = amountDecimals * 10
        return Math.floor(num * decimals) / decimals
    }
}


export default Utils;
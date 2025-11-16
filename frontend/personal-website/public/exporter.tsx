const rearrangesImages = (images: Record<string, string>) => {

  Object.keys(images).forEach(key => {
    var cleanedValue = key.slice(1, key.length)
    var splittedKey = key.split("/")
    var newKey = splittedKey[splittedKey.length - 1]
    images[newKey] = cleanedValue
    delete images[key]
  })  
}

const images: Record<string, string> = import.meta.glob("./**/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
  })

rearrangesImages(images)

export default images
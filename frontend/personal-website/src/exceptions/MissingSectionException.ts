class MissingSectionException extends Error {
    constructor(section: string, componenName: string, allowedComponents: string[]) {
      var message = `
        The following section -> ${section} is not a part of the following component -> ${componenName}.
        Allowed sections are ${allowedComponents.join(",")}
      `
      super(message)
      this.name = "CustomError"
    }
}

export default MissingSectionException;
  
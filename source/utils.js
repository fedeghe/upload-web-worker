export const uniqueID = new function () {
    let count = 0;
    const self = this;
    this.prefix = 'UWW_';
    this.toString = () => {
        count += 1;
        return self.prefix + count;
    };
};

export const getFuncBody = func => {
    const fstring = func.toString()
    return fstring.substring(
      fstring.indexOf("{") + 1,
      fstring.lastIndexOf("}")
    )
  }

export const ucFirst = s => s.charAt(0).toUpperCase() + s.slice(1)
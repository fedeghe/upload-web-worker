export const uniqueID = new function () {
    let count = 0;
    const self = this;
    this.prefix = 'UWW_';
    this.toString = () => {
        count += 1;
        return self.prefix + count;
    };
};

export const ucFirst = s => s.charAt(0).toUpperCase() + s.slice(1)
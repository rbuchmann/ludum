function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }

module.exports = {
    defaultFor : defaultFor
};

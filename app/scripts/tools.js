function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }

function img (filename) {
    return "./images/" + filename + ".png";
}

module.exports = {
    defaultFor : defaultFor
};

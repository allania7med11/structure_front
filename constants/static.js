const sortDateDown= function(a, b) {
    a = new Date(a.modified_date);
    b = new Date(b.modified_date);
    return a<b ? -1 : a>b ? 1 : 0;
};

const sortDateUp= function(a, b) {
    a = new Date(a.modified_date);
    b = new Date(b.modified_date);
    return a>b ? -1 : a<b ? 1 : 0;
};

export const sortDate= function(e) {
    if (e==true){
        return sortDateDown
    } else {
        return sortDateUp
    }
};
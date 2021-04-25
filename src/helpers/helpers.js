export function find(obj, item) {
    console.log('called');
    console.log(obj);
    console.log(item);
    for(var key in obj) {
        if(obj[key] && typeof obj[key] === "object") {
            var result = find(obj[key], item);
            if(result) {
                result.unshift(key);
                return result;
            }
        } else if(obj[key] === item) {
            return [key];
        }
    }
}

export function findFormatted(objectName, obj, item) {
    //console.log('touched');
    var path = find(obj, item);
    if(path == null) {
        return "";
    }
    return objectName + '["' + path.join('"]["') + '"]';
}
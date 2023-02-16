/**Add your frontend common function here */

export function CheckDuplicates(array) {
    const removeDuplicates = [...new Set(array.map((e) => JSON.stringify(e)))].map((e) => JSON.parse(e))
    return removeDuplicates
};

export function viewFile(file) {
    let win = window.open();
    win.document.write(
        '<iframe src="' +
        file +
        '" frameborder="0" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;" allowfullscreen></iframe>'
    )
};
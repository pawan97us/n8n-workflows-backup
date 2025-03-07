function addRemoveNumbers() {
    let arr = [];
    for (let i = 1; i <= 25; i++) arr.push(i);
    console.log("Added:", arr);

    while (arr.length > 0) {
        arr.pop();
        console.log("Removed one, left:", arr);
    }
}

addRemoveNumbers();

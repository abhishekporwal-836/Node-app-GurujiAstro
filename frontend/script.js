document.getElementById("addButton").addEventListener("click", function() {
    fetch('increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const countElement = document.getElementById("count");
        if (countElement) {
            countElement.textContent = ``;
        } else {
            console.error('Count element not found');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

document.getElementById("getCountButton").addEventListener("click", function() {
    fetch('/getCount')
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById("counterMessage");
        if (messageElement) {
            messageElement.textContent = `This button has been clicked ${data.count} times.`;
        } else {
            console.error('Counter message element not found');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
console.log("hi my nameis abhishek porwal");

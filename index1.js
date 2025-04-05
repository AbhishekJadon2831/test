let responseFromServer = [];

async function getData() {

    try {
        let res = await fetch('http://localhost:3000/posts')
        res = await res.json()

       

        appendTheData(res)


    } catch (error) {
        console.log(error);
        
    }
}

getData()

let container = document.getElementById('container')


function appendTheData(res) {

    container.innerHTML = ""
    let box = document.createElement('div')


    res && res.forEach((elm, i, arr) => {


        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')
        let del = document.createElement('button')

        del.classList.add("del");

        del.addEventListener('click', () => {

            console.log(elm);
            deleteData(elm.id)

        })


        p1.innerHTML = elm.id;
        p2.innerHTML = elm.title;
        p3.innerHTML = elm.author;
        del.innerHTML = "DELETE"


        box.append(p1, p2, p3, del)

    })

    container.append(box);

    

}


document.getElementById






function getDetails(id) {
    return document.getElementById(id).value
}

document.getElementById('post').addEventListener('click', async () => {
    let title = getDetails('title')
    let author = getDetails('author')


    let newData = {
        title: title,
        author: author
    }


    let res = await fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify(newData)
    })

    res = await res.json()

    console.log(res, "this is res");

});









document.getElementById('put').addEventListener('click', async () => {
    try {
        let id = getDetails('updateId');
        let title = getDetails('updateTitle');
        let author = getDetails('updateAuthor');

        if (!id) {
            alert('Please enter an ID to update');
            return;
        }
        if (!title || !author) {
            alert('Please fill in both title and author for PUT request');
            return;
        }

        let updatedData = {
            title: title,
            author: author
        };

        let res = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        res = await res.json();
        console.log('Update successful:', res);
        alert('Post updated successfully!');
        getData(); 
    } catch (error) {
        console.error('PUT Error:', error);
        alert('Error updating post: ' + error.message);
    }
});


document.getElementById('patch').addEventListener('click', async () => {
    try {
        let id = getDetails('updateId');
        let title = getDetails('updateTitle');
        let author = getDetails('updateAuthor');

        if (!id) {
            alert('Please enter an ID to update');
            return;
        }
        if (!title && !author) {
            alert('Please provide at least one field to update');
            return;
        }

        let updatedFields = {};
        if (title) updatedFields.title = title;
        if (author) updatedFields.author = author;

        let res = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "PATCH",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(updatedFields)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        res = await res.json();
        console.log('Partial update successful:', res);
        alert('Post updated successfully!');
        getData(); 
    } catch (error) {
        console.error('PATCH Error:', error);
        alert('Error updating post: ' + error.message);
    }
});



async function deleteData(id) {
    try {
        let res = await fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });
        res = await res.json()

        

        appendTheData(res)

        getData();
    } catch (error) {
        console.log(error, "Error while deleting");
    }
}
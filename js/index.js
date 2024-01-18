const doc = document;
const btnInfo = doc.querySelector('.btn-database');
const boxInfo = doc.querySelector('.database-block');

btnInfo.onclick = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((info) => renderListDatabase(info));
}

function renderListDatabase(info) {
    for(let item of info) {
        const { id, title } = item;
        
        const listBlock = doc.createElement('ul');
        const listItem = doc.createElement('li');
        const listUrl = doc.createElement('a');
        listItem.className = 'database-list';
        listUrl.innerText = title;
        listUrl.href = `#`;
        listUrl.dataset.postId = id;

        listUrl.onclick = (event) => {
            event.preventDefault();

            const postId = event.target.dataset.postId;

            if (postId) {
                fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                    .then((response) => response.json())
                    .then((postInfo) => renderInfoBlock(postInfo));
            }
        };

        listItem.append(listUrl);
        listBlock.append(listItem);
        boxInfo.append(listBlock);
    };
}

function renderInfoBlock(postInfo) {
    infoWindow = new ModalWindow({ w: 500, h: 300 }, { top: 200, left: 500 }, postInfo.userId, postInfo.id, postInfo.title, postInfo.body);
    infoWindow.create();
    console.log('test2', postInfo.id);
}
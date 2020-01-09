const storeForm = document.getElementById('store-form');
const storeID = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');

//func to send POST to API to add store.
async function addStore(e) {
    e.preventDefault();

    if(storeID.value === '' || storeAddress.value === '') {
        alert('Please fill in the fields');
    }

    const sendBody = {
        storeID: storeID.value,
        address: storeAddress.value
    }

    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(sendBody)
        });

        if(res.status === 400) {
            throw Error('Store Already Exists!')
        }

        alert('Store added!');
        window.location.href = '/index.html';

    } catch (err) {
        alert(err)
        return;
    }
}

storeForm.addEventListener('submit', addStore);
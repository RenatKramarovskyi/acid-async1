async function fetchData(data) {
    // console.log('pressed')
    try {
        let result = data.results[0];

        return {
            fullname : `${result.name.title} ${result.name.first} ${result.name.last}`,
            gender : result.gender,
            location : `${result.location.country} | ${result.location.city}`,
            img: result.picture.medium,
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

async function doFetches(count) {
    let fetchArray = [];
    try{
        for (let i = 0; i < count; i++){
            const response = await fetch('https://randomuser.me/api/')
            const data = await response.json();

            fetchArray.push(await fetchData(data));
        }
        return fetchArray;
    }
    catch (error){
        console.error('Error:', error)
    }
}

function drawContactInfo(fetchesArray, contentArea){
    fetchesArray.forEach((fetch) => {
        console.log(fetch)
        let dataDiv = document.createElement("div");
        dataDiv.innerHTML = `
                <div class="user_block">
                      <div class="user_block__img">
                            <img src="${fetch.img}" alt="random photo">
                        </div>
                      <div class="user_block__info">
                            <p>Fullname : ${fetch.fullname}</p>
                            <p>Gender : ${fetch.gender}</p>
                            <p>Location : ${fetch.location}</p>
                      </div>
                </div>`;

        contentArea.appendChild(dataDiv)
    })

}

const fetchButton = document.querySelector('.prettyButtonGreen')
const contentArea =  document.querySelector('.user_area')

const fetchCount = document.querySelector(".fetch_count");
if (fetchButton){
    fetchButton.addEventListener('click', async () => {
        let fetchCountInt = +fetchCount.value;

        if (Number.isInteger(fetchCountInt) && fetchCountInt > 0) {
            let fetchesArray = await doFetches(fetchCountInt);
            drawContactInfo(fetchesArray, contentArea);
        }

    })
}


const excuseQuantity = document.getElementById('quantity-field');
const excuseCategory = document.querySelector('#category-field');
const excuseButton = document.querySelector('.search');
const mainContent = document.querySelector('#mainel');
const warningQuantity = document.getElementById('quantity-warning')
const warningCategory = document.getElementById('category-warning')
const warningElements = document.querySelectorAll('.warning');

for (const warning of warningElements) {
    const inputElement = warning.previousElementSibling;

    inputElement.addEventListener('blur', (event) => {
        event.preventDefault();
        if(inputElement.value === "") {
            warning.classList.contains('hide') ? warning.classList.replace('hide', 'show') : warning.classList.add('show');
        }
    });

    inputElement.addEventListener('focus', (event) => {
        event.preventDefault(); 
            warning.classList.contains('show') ? warning.classList.replace('show', 'hide') : warning.classList.add('hide');
    });
    
}

excuseButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log(excuseCategory.value);
    const excuses = await generateExcuse(excuseCategory.value, excuseQuantity.value);
    const excuseElements = excuses.map(excuse => {
        const newResponse = document.createElement('div');
        newResponse.innerHTML = excuse.excuse;
        newResponse.className = ('responses')
        newResponse.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        return newResponse;
    });
    mainContent.append(...excuseElements);
    });

async function generateExcuse(category, quantity) {
    try {
        const urlPart1 = "https://excuser-three.vercel.app/v1/excuse/";
        const urlPart2 = category + "/";
        const urlPart3 = quantity;
        const poorExcuseForConcatenatingStrings = category !== "" ? urlPart1 + urlPart2 + urlPart3: urlPart1 +  urlPart3;
        const response = await fetch(poorExcuseForConcatenatingStrings);
        const data = await response.json();
        return data;
    } catch(error) {
        alert('Algo deu errado, atualize a página e tente novamente!Lembre-se de utilizar uma das categorias disponíveis')
        console.log(error)
    }
}
function getResponse () {
    let downArrow = document.querySelectorAll('.opblock-control-arrow');
    downArrow.forEach(item => {
        item.onclick = (e) => {
            setTimeout(() => {
                let tryoutBtn = item.parentElement.nextSibling.querySelectorAll('.try-out__btn')[0];
                tryoutBtn.onclick = (e) => {
                    setTimeout(() => {
                        let executeBtn = item.parentElement.nextSibling.querySelectorAll('.execute')[0];
                        executeBtn.onclick = (e) => {
                            setTimeout(() => {
                                let responseBlock = item.parentElement.nextSibling.querySelectorAll('.language-json')[0];
                                let innerText = responseBlock.innerHTML;
                                const cleanedText = innerText
                                  .replace(/<\/?span[^>]*>/g, '')
                                  .replace(/<style[\s\S]*?<\/style>/gi, '');
                                let response = JSON.parse(cleanedText);

                                axios.post('http://localhost:3000/get-types', {
                                    body: JSON.stringify(response)
                                })
                                .then(res => responseBlock.innerText = res.data)

                            }, 500)
                        }
                    }, 100)
                }
            }, 100)
        }
    })
}

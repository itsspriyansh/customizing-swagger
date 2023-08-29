const baseUrlContainer = document.querySelectorAll('.base-url')[0];
const baseUrlString = baseUrlContainer.innerText;
let baseUrl = '';
for (let i=12; i<baseUrlString.length-3; i++) {
    baseUrl += baseUrlString[i];
}
let downArrow = document.querySelectorAll('.opblock-control-arrow');
downArrow.forEach(item => {
    item.onclick = (e) => {
        let request = {
            path: {}, header: {}, query: {}, body: {} 
        };
        setTimeout(() => {
            let parameterTypeBlock = item.parentElement.nextSibling.querySelectorAll('.parameter__in');
            parameterTypeBlock.forEach(param => {
                let tempObj = {};
                let parameterType = param.innerText;
                parameterType = parameterType.substring(1, parameterType.length-1);
                let parameterName = param.parentElement.querySelectorAll('.parameter__name')[0].innerText;
                let typeofParameter = param.parentElement.querySelectorAll('.parameter__type')[0].innerText;
                tempObj = {
                    ...request[parameterType],
                    [parameterName]: (typeofParameter == 'string' ? 'string' : 0),
                }
                request = {
                    ...request,
                    [parameterType]: tempObj,
                }
            })
            let requestBlock = item.parentElement.nextSibling.querySelectorAll('.body-param__example')[0];
            if (requestBlock) {
                let requestCodeBlock = requestBlock.children[0];
                let innerText = requestCodeBlock.innerHTML;
                const cleanedText = innerText
                .replace(/<\/?span[^>]*>/g, '')
                .replace(/<style[\s\S]*?<\/style>/gi, ''); 

                request.body = JSON.parse(cleanedText);
            }
            console.log(request);

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
                            
                            let displayText = 'RESPONSE: \n' + cleanedText + '\n';
                            let response = JSON.parse(cleanedText);
                            let jsonBody = { request, response };
                          
                            fetch(`http://${baseUrl}/get-types`, {
                                method: 'POST',
                                body: JSON.stringify(jsonBody),
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                            })
                            .then(async res => {
                              const data = await res.json();
                              const interfaceString = data.join('\n');
                              displayText = displayText + '\n\n' + 'INTERFACES: \n\n' + interfaceString;
                              responseBlock.innerText = displayText;
                            })

                        }, 5000)
                    }
                }, 100)
            }
        }, 100)
    }
})
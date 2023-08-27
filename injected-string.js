`const baseUrlContainer = document.querySelectorAll('.base-url')[0];
const baseUrlString = baseUrlContainer.innerText;
let baseUrl = '';
for (let i=12; i<baseUrlString.length-3; i++) {
    baseUrl += baseUrlString[i];
}
let downArrow = document.querySelectorAll('.opblock-control-arrow');
downArrow.forEach(item => {
    item.onclick = (e) => {
        let request = null;
        setTimeout(() => {
            let requestBlock = item.parentElement.nextSibling.querySelectorAll('.body-param__example')[0];
            if (requestBlock) {
                let requestCodeBlock = requestBlock.children[0];
                let innerText = requestCodeBlock.innerHTML;
                const cleanedText = innerText
                .replace(/<\\/?span[^>]*>/g, '')
                .replace(/<style[\\s\\S]*?<\\/style>/gi, ''); 

                request = JSON.parse(cleanedText);
            }

            let tryoutBtn = item.parentElement.nextSibling.querySelectorAll('.try-out__btn')[0];
            tryoutBtn.onclick = (e) => {
                setTimeout(() => {
                    let executeBtn = item.parentElement.nextSibling.querySelectorAll('.execute')[0];
                    executeBtn.onclick = (e) => {
                        setTimeout(() => {
                            let responseBlock = item.parentElement.nextSibling.querySelectorAll('.language-json')[0];
                            let innerText = responseBlock.innerHTML;
                            const cleanedText = innerText
                            .replace(/<\\/?span[^>]*>/g, '')
                            .replace(/<style[\\s\\S]*?<\\/style>/gi, ''); 
                            
                            let displayText = 'RESPONSE: \\n' + cleanedText + '\\n';
                            let response = JSON.parse(cleanedText);
                            let jsonBody = { request, response };
                          
                            fetch(\`http://\${baseUrl}/get-types\`, {
                                method: 'POST',
                                body: JSON.stringify(jsonBody),
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                            })
                            .then(async res => {
                              const data = await res.json();
                              const interfaceString = data.join('\\n');
                              displayText = displayText + '\\n\\n' + 'INTERFACES: \\n\\n' + interfaceString;
                              responseBlock.innerText = displayText;
                            })

                        }, 5000)
                    }
                }, 100)
            }
        }, 100)
    }
})`
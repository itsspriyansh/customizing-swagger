const { quicktype, InputData, jsonInputForTargetLanguage } = require("quicktype-core");

const types_post = async (req, res) => {

    function separateInterfaces(interfaceLines) {
        const interfaceBlocks = [];
        let temp = '';
        for (let i=0; i<interfaceLines.length; i++) {
            if (interfaceLines[i] == '') {
                interfaceBlocks.push(temp);
                temp = '';
            } else {
                temp = temp + interfaceLines[i] + '\n';
            }
        }
        return interfaceBlocks;
    }

    async function quicktypeJSON(targetLanguage, typeName, jsonString) {
        const jsonInput = jsonInputForTargetLanguage(targetLanguage);
        await jsonInput.addSource({
            name: typeName,
            samples: [jsonString]
        });
    
        const inputData = new InputData();
        inputData.addInput(jsonInput);

        return await quicktype({
            inputData,
            lang: targetLanguage,
            rendererOptions: {
                'just-types': true,
            }
        });
    }

    quicktypeJSON('typescript', 'ResponseTypes', JSON.stringify(req.body))
    .then(result => {
        const lines = result.lines;
        const interfaceList = separateInterfaces(lines);
        res.status(200).json(interfaceList);   
    })
    .catch(err => res.status(400).json({message: err})) 
}

module.exports = { types_post };
const axios = require("axios");

const body = {
  a: 1,
  b: 3,
};

// const body = {name: "priyansh"}

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

axios
  .post("http://localhost:3000/get-types", {
    body: JSON.stringify(body),
  })
  .then(async (res) => {
    const data = await res.data;
    // const displayText = await separateInterfaces(data);
    console.log(data)
  });


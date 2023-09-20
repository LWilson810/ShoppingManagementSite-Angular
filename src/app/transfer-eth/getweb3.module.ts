import Web3 from "web3";
//<script src="./node_modules/web3/dist/web3.min.js" ></script>


export const getweb3=()=>{
    new Promise((resolve,reject)=>{
        window.addEventListener("load", async()=>{
            if(window.ethereum){
                const web3=new Web3(window.ethereum);
                try{
                    await window.ethereum.enable();
                    resolve(web3);
                } catch(error){
                    reject(error);
                }
            }
            else if(window.web3){
                const web3=window.web3;
                console.log("Injected Web3...");
                resolve(web3);
            }
            else{
                const web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
                console.log("No web3 injected. Instead use Local Web3");
                resolve(web3);
            }
        })
    })
}
import BaClient from 'BaArbeitClient';
const client = new BaClient();

(async () => {
    client.init()
})()

client.Search({
    title:"Fachinformatiker"
})
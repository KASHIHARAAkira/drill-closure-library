function main() {

    const headerElement = common.components.makeHeader(document.getElementById("main-element"));
    const footerElement = common.components.makeFooter(document.getElementById("main-element"));
    let storeData = [
        { ranking: 1, storeName: "つくばラーメン", votes: 10, urlImage: "../img/ramen.png",
        zipCode: 123456, address: "茨城県つくば市猫町１−１−１", urlMap: "https://maps.google.com"},
        { ranking: 2, storeName: "和歌山ラーメン", votes: 8, urlImage: "../img/ramen.png",
        zipCode: 123456, address: "和歌山県和歌山市猫町１−１−１", urlMap: "https://maps.google.com"},
        { ranking: 3, storeName: "京都ラーメン", votes: 6, urlImage: "../img/ramen.png",
        zipCode: 123456, address: "京都府京都市猫町１−１−１", urlMap: "https://maps.google.com"}
    ];

    let rankingElement = document.getElementById("rankingArea");
    let rankings = ranking.ramen.makeItems(storeData, rankingElement);

}
main();
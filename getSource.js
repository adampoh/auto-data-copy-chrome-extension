function get_source(document_body) {

    //get title
    dataTitle = document_body.getElementsByTagName("H1")[0].innerText;

    //get city, country, dexcription
    city_country_descript = document_body.getElementsByClassName("meta-field photo-desc")[0].children[0].innerText;
    city_country = city_country_descript.slice(city_country_descript.indexOf("[") + 1, city_country_descript.indexOf("]"));
    cityNum = city_country.indexOf(",");
    stateNum = city_country.lastIndexOf(",");

    //get city
    dataCity = city_country.slice(0, cityNum);

    //get state
    if (cityNum == stateNum) {
        dataState = dataCity;
    } else {
        dataState = city_country.slice(cityNum + 2, stateNum);
    }

    //get country
    dataCountry = city_country.slice(city_country.lastIndexOf(",") + 2);

    //get discription
    dataDescription = city_country_descript.slice(city_country_descript.indexOf("]") + 1, city_country_descript.length);

    //get copyRight
    dataCRTemp = document_body.getElementsByClassName("meta-field photo-desc")[0].children[2].innerText;
    dataCR = dataCRTemp.slice(0, dataCRTemp.indexOf('-'));

    //get keywords
    dataKeyWd = [];
    keySet = document_body.getElementsByClassName("tags-list")[0];
    keyLen = keySet.children.length;
    for (i = 0; i < keyLen; i++) {
        if (keySet.children[i].innerText != "") {
            dataKeyWd[i] = keySet.children[i].innerText;
        }
    }
    var result = {
        dataTitle: dataTitle,
        dataCity: dataCity,
        dataState: dataState,
        dataCountry: dataCountry,
        dataCR: dataCR,
        dataKeyWd: dataKeyWd,
        dataDescription: dataDescription
    };
    chrome.storage.sync.set({ "data": result }, function() {
        if (chrome.runtime.error) {
            console.log("Runtime error.");
        }
    });

    return true;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: get_source(document.body)
});
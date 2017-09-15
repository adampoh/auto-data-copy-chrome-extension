function put_source(document_body) {
    // testForm = document_body.getElementById('i0281');
    // test = document_body.getElementById('i0116');
    // console.log(test);
    // // test.focus();
    // test.value = "mag_victorious_out@hotmail.com";
    // test.click();
    // test.focus();

    chrome.storage.sync.get("data", function(items) {
        if (!chrome.runtime.error) {
            resultCopy = items.data;
            console.log(items);
            inputNodes = document_body.getElementsByTagName('INPUT');
            for (i = 0; i < inputNodes.length; i++) {

                //put title
                if (inputNodes[i].name == 'headline') {
                    inputNodes[i].focus();
                    inputNodes[i].value = resultCopy.dataTitle;
                    inputNodes[i].blur();
                    continue;
                }

                //put city
                if (inputNodes[i].name == 'city') {
                    inputNodes[i].focus();
                    inputNodes[i].value = resultCopy.dataCity;
                    inputNodes[i].blur();
                    continue;
                }

                //put state
                if (inputNodes[i].name == 'province_state') {
                    inputNodes[i].focus();
                    inputNodes[i].value = resultCopy.dataState;
                    inputNodes[i].blur();
                    continue;
                }

                //put Keywords
                if (inputNodes[i].className == 'input ng-pristine ng-untouched ng-valid') {
                    inputNodes[i].focus();
                    inputNodes[i].value = resultCopy.dataKeyWd.toString();
                    inputNodes[i].blur();
                    continue;
                }

                //put Copyright
                if (inputNodes[i].name == 'copyright') {
                    inputNodes[i].focus();
                    inputNodes[i].value = resultCopy.dataCR;
                    inputNodes[i].blur();
                    continue;
                }
            }

            //put Description
            textNodes = document_body.getElementsByTagName('textarea');
            textNodes[0].focus();
            //alert(resultCopy.dataDescription);
            textNodes[0].value = resultCopy.dataDescription;
            textNodes[0].blur();

            //put Country
            selectNodes = document_body.getElementsByTagName('select');
            for (i = 0; i < selectNodes.length; i++) {
                if (selectNodes[i].name == 'country_of_shoot') {
                    selectNodes[i].focus();
                    selectNodes[i].value = resultCopy.dataCountry;
                    selectNodes[i].blur();
                    break;
                }
            }
            registryForm = document_body.getElementsById('metadata_form');
            registryForm.submit();
        }
    });
    return true;
}
chrome.extension.sendMessage({
    action: "putSource",
    source: put_source(document.getElementsByTagName('aside')[0])
});
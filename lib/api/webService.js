

function getResponse(webserviceName, requestData) {
    return fetch('https://smart-wallet-guide.herokuapp.com/' + webserviceName, requestData).then((response) => response.json().then(responseData => {
        if (response.ok) {
            return {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                data: responseData,
            }
        }
    })).catch(error => {
        console.log(error)
    })
}

const Webservice = {
        call: function (request) {
            let method = request.method.toLowerCase();

            let contentType;
            let data = request.data;
            if (method === 'post' || method === 'delete' || method === 'patch' || method === 'put') {
                contentType = 'application/json; charset=utf-8';
                data = JSON.stringify(data);
            }

            let requestData = {
                method: method,
                headers: {
                    'Content-Type': contentType,
                }
            };

            if (method === 'post' || method === 'delete' || method === 'patch' || method === 'put') {
                requestData.body = data;
            }


            return getResponse(request.name, requestData);
        },
    }
;

export default Webservice;

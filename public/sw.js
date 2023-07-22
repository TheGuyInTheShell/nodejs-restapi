//This is the fetch event listener
self.addEventListener("fetch", (event) => {
        var newRequest = new Request(event.request, {
            mode: "cors",
            credentials: "same-origin",
            referrerPolicy: 'no-referrer-when-downgrade'
        });
        console.log(newRequest);
        event.respondWith(fetch(newRequest));

});
// <![CDATA[
const cookieNames = [
    "IDX-userData", "IDX-potentialUserData", "IDX-sessionID", "IDX-searchPageViewCount", 
    "IDX-currentSearchPage", "IDX-lastSearchPage", "IDX-savedSearches", "IDX-verificationRequired", 
    "IDX-forcePasswordChange", "IDX-signupWidget", "IDX-currentResultsPage", "IDX-resultsPageViewCount", 
    "IDX-lastResultsPage", "IDX-savedProperties", "IDX-currentDetailsPage", "IDX-lastDetailsPage", 
    "IDX-currentPage", "IDX-lastViewedPage", "IDX-pageID_TimesViewed", "IDX-detailsPageViewCount", 
    "IDX-agentOwner"
];

const cookies = cookieNames.reduce((acc, name) => {
    acc[name] = getCookie(name);
    return acc;
}, {});

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Hubspot Identity. Any field from Hubspot is supported.
var _hsq = (window._hsq = window._hsq || []);
_hsq.push(["identify", {
    email: "example@leads.hubbardlabs.com",
    // id: jQuery.parseJSON(cookies["IDX-potentialUserData"])["leadID"]
}]);

const jsonCookieNames = [
    "IDX-potentialUserData", "IDX-currentSearchPage", "IDX-lastSearchPage", 
    "IDX-savedSearches", "IDX-savedProperties", "IDX-currentResultsPage", 
    "IDX-lastResultsPage", "IDX-currentDetailsPage", "IDX-lastDetailsPage", 
    "IDX-currentPage", "IDX-lastViewedPage"
];

const jsonValues = jsonCookieNames.reduce((acc, name) => {
    acc[name] = getJSONValue(name);
    return acc;
}, {});

function getJSONValue(cookieName) {
    const jsonValue = cookies[cookieName];
    if (!jsonValue) {
        console.warn(`Cookie ${cookieName} is empty or not found.`);
        return null;
    }
    try {
        return JSON.parse(jsonValue);
    } catch (error) {
        console.error(`Error parsing JSON for ${cookieName}:`, error);
        return null;
    }
}

// Send all data properties to webhook URL
const webhookUrl = "https://hkdk.events/e38pa6eacovfrw";
const dataToSend = {
    ...cookies,
    ...jsonValues,
    current_page_url: window.location.href // Include the full URL of the current page
};

fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
})
.then(response => response.json())
.then(data => console.log('Webhook response:', data))
.catch(error => console.error('Error sending webhook:', error));
// ]]>

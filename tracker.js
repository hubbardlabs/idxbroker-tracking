// <![CDATA[
var idx_userdata = getCookie("IDX-userData"),
    idx_potential_userdata = getCookie("IDX-potentialUserData"),
    idx_session_id = getCookie("IDX-sessionID"),
    idx_search_page_view_count = getCookie("IDX-searchPageViewCount"),
    idx_current_search_page = getCookie("IDX-currentSearchPage"),
    idx_last_search_page = getCookie("IDX-lastSearchPage"),
    idx_saved_searches = getCookie("IDX-savedSearches"),
    idx_verification_required = getCookie("IDX-verificationRequired"),
    idx_force_password_change = getCookie("IDX-forcePasswordChange"),
    idx_signup_widget = getCookie("IDX-signupWidget"),
    idx_current_results_page = getCookie("IDX-currentResultsPage"),
    idx_results_page_view_count = getCookie("IDX-resultsPageViewCount"),
    idx_last_results_page = getCookie("IDX-lastResultsPage"),
    idx_saved_properties = getCookie("IDX-savedProperties"),
    idx_current_details_page = getCookie("IDX-currentDetailsPage"),
    idx_last_details_page = getCookie("IDX-lastDetailsPage"),
    idx_current_page = getCookie("IDX-currentPage"),
    idx_last_viewed_page = getCookie("IDX-lastViewedPage"),
    idx_page_id_times_viewed = getCookie("IDX-pageID_TimesViewed"),
    idx_details_page_view_count = getCookie("IDX-detailsPageViewCount"),
    idx_agent_owner = getCookie("IDX-agentOwner");

/**
 *
 * @param t.
 * @returns
 */
function getCookie(t) {
    for (var e = t + "=", a = decodeURIComponent(document.cookie).split(";"), o = 0; o < a.length; o++) {
        for (var d = a[o];
            " " == d.charAt(0);) d = d.substring(1);
        if (0 == d.indexOf(e)) return d.substring(e.length, d.length)
    }
    return ""
}

// Hubspot Identity. Any field from Hubspot is supported.
var _hsq = (window._hsq = window._hsq || []);
_hsq.push(["identify", {
    email: "example@leads.hubbardlabs.com",
    // id: jQuery.parseJSON(idx_potential_userdata)["leadID"]
}]);

// Example JSON values for specified properties
var idx_potential_userdata_value = getJSONValue("IDX-potentialUserData");
var idx_current_search_page_value = getJSONValue("IDX-currentSearchPage");
var idx_last_search_page_value = getJSONValue("IDX-lastSearchPage");
var idx_saved_searches_value = getJSONValue("IDX-savedSearches");
var idx_saved_properties_value = getJSONValue("IDX-savedProperties");
var idx_current_results_page_value = getJSONValue("IDX-currentResultsPage");
var idx_last_results_page_value = getJSONValue("IDX-lastResultsPage");
var idx_current_details_page_value = getJSONValue("IDX-currentDetailsPage");
var idx_last_details_page_value = getJSONValue("IDX-lastDetailsPage");
var idx_current_page_value = getJSONValue("IDX-currentPage");
var idx_last_viewed_page_value = getJSONValue("IDX-lastViewedPage");

function getJSONValue(cookieName) {
    var jsonValue = getCookie(cookieName);
    try {
        return JSON.parse(jsonValue);
    } catch (error) {
        console.error('Error parsing JSON for ' + cookieName + ':', error);
        return null;
    }
}

// Send all data properties to webhook URL
var webhookUrl = "https://hkdk.events/e38pa6eacovfrw";
var dataToSend = {
    idx_userdata: idx_userdata,
    idx_potential_userdata: idx_potential_userdata_value,
    idx_session_id: idx_session_id,
    idx_search_page_view_count: idx_search_page_view_count,
    idx_current_search_page: idx_current_search_page_value,
    idx_last_search_page: idx_last_search_page_value,
    idx_saved_searches: idx_saved_searches_value,
    idx_verification_required: idx_verification_required,
    idx_force_password_change: idx_force_password_change,
    idx_signup_widget: idx_signup_widget,
    idx_current_results_page: idx_current_results_page_value,
    idx_results_page_view_count: idx_results_page_view_count,
    idx_last_results_page: idx_last_results_page_value,
    idx_saved_properties: idx_saved_properties_value,
    idx_current_details_page: idx_current_details_page_value,
    idx_last_details_page: idx_last_details_page_value,
    idx_current_page: idx_current_page_value,
    idx_last_viewed_page: idx_last_viewed_page_value,
    idx_page_id_times_viewed: idx_page_id_times_viewed,
    idx_details_page_view_count: idx_details_page_view_count,
    idx_agent_owner: idx_agent_owner,
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

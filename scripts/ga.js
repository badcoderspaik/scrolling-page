var _AnalyticsCode = 'UA-120378270-1';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

function trackButtonClick(e) {
    _gaq.push(['_trackEvent', this.id, 'clicked']);
}

var buttons = document.querySelectorAll('td');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mousedown', trackButtonClick);
}
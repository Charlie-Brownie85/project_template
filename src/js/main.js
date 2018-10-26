import '../css/style.css';

var callback = () => {
    const now = new Date();
    console.log(`Page successfully loaded on ${now.getHours}:${now.getMinutes}:${now.getSeconds}`);

    const elem = document.createElement('h1');
    elem.classList.add('greetings');
    elem.innerText = 'Hi there!! I\'ve been injected!';
    document.body.appendChild(elem);
};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
    callback();
} else {
    document.addEventListener('DOMContentLoaded', callback);
}
var callback = () => {
    const now = new Date();
    console.log(`Page successfully loaded on ${now.getHours}:${now.getMinutes}:${now.getSeconds}`);
};

if (
    document.readyState === 'complete' ||
    (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
    callback();
} else {
    document.addEventListener('DOMContentLoaded', callback);
}
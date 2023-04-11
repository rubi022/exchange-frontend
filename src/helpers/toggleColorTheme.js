export const toggleColorTheme = (value) => {
    const rootElement = document.getElementsByTagName('body')[0];
    if (value === 'light') {
        rootElement && rootElement.classList.add('light-color-scheme');
        rootElement && rootElement.classList.remove('dark-color-scheme');
    } else {
        rootElement && rootElement.classList.remove('light-color-scheme');
        rootElement && rootElement.classList.add('dark-color-scheme');
    }
};

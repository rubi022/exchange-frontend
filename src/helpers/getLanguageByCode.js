export const getLanguageName = (code) => {
    switch (code) {
        case 'en':
            return 'English';
        case 'ru':
            return 'Русский';
        case 'zh':
            return '中文';
        default:
            return 'English';
    }
};


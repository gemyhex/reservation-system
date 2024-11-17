import i18n from '@/plugins/i18n'
export function useNumConverter(num) {
    if (num === null) return "";
    const arabicNumbers = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
    if(i18n.locale === 'en') return num
    return String(num).replace(/[0123456789]/g, (d) => {
        return arabicNumbers[d];
    });
}

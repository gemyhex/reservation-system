import i18n from "@/plugins/i18n";

export function useNameOptions(label) {
    if(!label.name || !label.name_ar) return '---'
    return i18n.locale === "ar" ? label.name_ar : label.name;
}

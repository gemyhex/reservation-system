import i18n from "@/plugins/i18n";

export function useNameOptions(label) {
    return i18n.locale === "ar" ? label.name_ar ?? '---' : label.name ?? '---';
}

/**
 * Client-side에서 정의한 네가지 돈길 상태입니다.
 * Server-side에서 Enumeration으로 정의한 네가지 돈길 상태와 구분됩니다.
 */
export type TDongilVariant = 'walking' | 'pending' | 'proposed' | 'thisWeekS';

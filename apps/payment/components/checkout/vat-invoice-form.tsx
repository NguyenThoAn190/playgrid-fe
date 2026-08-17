"use client";

import React from "react";
import { FileText, Check, ChevronDown } from "lucide-react";
import { Input } from "@workspace/ui/components/input";

export type VatInvoiceType = "company" | "personal";

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: "VN", name: "Việt Nam", flag: "🇻🇳" },
  { code: "AF", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AU", name: "Australia (Úc)", flag: "🇦🇺" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CN", name: "China (Trung Quốc)", flag: "🇨🇳" },
  { code: "FR", name: "France (Pháp)", flag: "🇫🇷" },
  { code: "DE", name: "Germany (Đức)", flag: "🇩🇪" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "IN", name: "India (Ấn Độ)", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "JP", name: "Japan (Nhật Bản)", flag: "🇯🇵" },
  { code: "KR", name: "South Korea (Hàn Quốc)", flag: "🇰🇷" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "TW", name: "Taiwan (Đài Loan)", flag: "🇹🇼" },
  { code: "TH", name: "Thailand (Thái Lan)", flag: "🇹🇭" },
  { code: "GB", name: "United Kingdom (Anh)", flag: "🇬🇧" },
  { code: "US", name: "United States (Hoa Kỳ)", flag: "🇺🇸" },
];

export interface VatInvoiceData {
  required: boolean;
  invoiceType: VatInvoiceType;
  
  // 1. Company invoice fields
  companyName: string;
  taxCode: string;
  companyAddress: string;
  companyEmail: string;
  saveVatInfo?: boolean;

  // 2. Personal invoice fields (Vietnam & Foreigner)
  personalName: string;
  personalEmail: string;
  personalAddress: string;
  nationality: string; // "VN" or country code
  idNumber: string; // 12-digit CCCD for VN, Passport for foreign

  // Legacy fallback compatibility
  address?: string;
  invoiceEmail?: string;
}

interface VatInvoiceFormProps {
  data: VatInvoiceData;
  onChange: (data: VatInvoiceData) => void;
  requiredAlways?: boolean; // For B2B system plans where VAT is mandatory
}

import { useLocale } from "next-intl";

export function VatInvoiceForm({
  data,
  onChange,
  requiredAlways = false,
}: VatInvoiceFormProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  const isChecked = requiredAlways || data.required;
  const isCompany = (data.invoiceType || "company") === "company";
  const isPersonal = data.invoiceType === "personal";
  const isVietnamese = (data.nationality || "VN") === "VN";

  // Handle master checkbox toggle
  const handleToggle = (checked: boolean) => {
    onChange({
      ...data,
      required: requiredAlways ? true : checked,
      invoiceType: data.invoiceType || "company",
      nationality: data.nationality || "VN",
    });
  };

  // Handle invoice type change (company vs personal)
  const handleTypeChange = (type: VatInvoiceType) => {
    onChange({
      ...data,
      invoiceType: type,
      nationality: data.nationality || "VN",
    });
  };

  // Auto-fill saved VAT corporate information
  const handleUseSavedVat = () => {
    onChange({
      ...data,
      required: true,
      invoiceType: "company",
      companyName: "Công ty Cổ phần Công nghệ & Thể thao PlayGrid",
      taxCode: "0317892345",
      companyEmail: "accounting@playgrid.vn",
      companyAddress: "Tầng 12, Tòa nhà Bitexco, 02 Hải Triều, P. Bến Nghé, Quận 1, TP.HCM",
      saveVatInfo: true,
      address: "Tầng 12, Tòa nhà Bitexco, 02 Hải Triều, P. Bến Nghé, Quận 1, TP.HCM",
      invoiceEmail: "accounting@playgrid.vn",
    });
  };

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-sm">
      {/* 1. Header with Toggle Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-brand-blue/10 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0">
            <FileText className="size-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
              {isEn ? "Value Added Tax Invoice (VAT / Red Invoice)" : "Hóa đơn Giá trị Gia tăng (Hóa đơn đỏ VAT)"}
            </h4>
            <p className="text-[11px] text-muted-foreground font-normal">
              {requiredAlways
                ? isEn
                  ? "Required for enterprise clients & B2B system subscriptions"
                  : "Bắt buộc đối với khách hàng doanh nghiệp & thuê bao hệ thống B2B"
                : isEn
                ? "Issue valid electronic invoice for corporate or personal tax deduction"
                : "Xuất hóa đơn điện tử hợp lệ khấu trừ thuế cho doanh nghiệp hoặc cá nhân"}
            </p>
          </div>
        </div>

        {!requiredAlways && (
          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue dark:peer-checked:bg-brand-green" />
          </label>
        )}
      </div>

      {isChecked && (
        <form
          onSubmit={(e) => e.preventDefault()}
          toolname="declare_vat_invoice"
          tooldescription="Declare corporate tax code or personal tax identification for electronic VAT invoice issuance."
          className="space-y-4 pt-1 animate-in fade-in duration-200"
        >
          {/* 2. Radio Options: Hóa đơn Doanh nghiệp / Tổ chức vs Hóa đơn Cá nhân */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-foreground pt-1 border-t border-border/50">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="vat_invoice_type"
                value="company"
                checked={isCompany}
                onChange={() => handleTypeChange("company")}
                className="size-4 text-brand-blue focus:ring-brand-blue cursor-pointer"
              />
              <span>{isEn ? "Corporate / Organization Invoice" : "Hóa đơn Doanh nghiệp / Tổ chức"}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="vat_invoice_type"
                value="personal"
                checked={isPersonal}
                onChange={() => handleTypeChange("personal")}
                className="size-4 text-brand-blue focus:ring-brand-blue cursor-pointer"
              />
              <span>{isEn ? "Personal Invoice" : "Hóa đơn Cá nhân"}</span>
            </label>
          </div>

          {/* 3. Section Header & Quick Fill Action */}
          <div className="flex items-center justify-between pt-1">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground">
              {isCompany
                ? isEn
                  ? "Company Invoice Details"
                  : "Thông tin hóa đơn"
                : isEn
                ? "Personal Invoice Details"
                : "Thông tin Hóa đơn Cá nhân"}
            </h4>

            {isCompany && (
              <button
                type="button"
                onClick={handleUseSavedVat}
                className="text-xs font-semibold text-brand-blue dark:text-brand-green hover:underline cursor-pointer transition-colors"
              >
                {isEn ? "Use saved VAT info" : "Sử dụng thông tin VAT đã lưu"}
              </button>
            )}
          </div>

          {/* 4. FORM FIELDS: TRƯỜNG HỢP 1 - HÓA ĐƠN DOANH NGHIỆP */}
          {isCompany && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Tax Code */}
              <div className="space-y-2">
                <label htmlFor="vat-taxCode" className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "Tax Identification Number (Tax Code / MST)" : "Mã số thuế doanh nghiệp (Tax code)"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  id="vat-taxCode"
                  name="taxCode"
                  type="text"
                  placeholder="0317892345"
                  value={data.taxCode || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      taxCode: e.target.value,
                    })
                  }
                  toolparamdescription="Company 10 or 13 digit Tax Identification Number (MST)"
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label htmlFor="vat-companyName" className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "Company / Organization Name" : "Tên công ty / Tổ chức"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  id="vat-companyName"
                  name="companyName"
                  type="text"
                  placeholder={isEn ? "e.g. PlayGrid Vietnam Co., Ltd" : "Công ty Cổ phần PlayGrid..."}
                  value={data.companyName || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      companyName: e.target.value,
                    })
                  }
                  toolparamdescription="Official registered business entity name"
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="vat-companyEmail" className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "E-Invoice Receiving Email" : "Email nhận hóa đơn điện tử"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  id="vat-companyEmail"
                  name="companyEmail"
                  type="email"
                  placeholder="accounting@company.com"
                  value={data.companyEmail || data.invoiceEmail || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      companyEmail: e.target.value,
                      invoiceEmail: e.target.value,
                    })
                  }
                  toolparamdescription="Accounting department email to receive PDF and XML e-invoice"
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* Company Address */}
              <div className="space-y-2">
                <label htmlFor="vat-companyAddress" className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "Registered Company Address" : "Địa chỉ trụ sở công ty"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  id="vat-companyAddress"
                  name="companyAddress"
                  type="text"
                  placeholder={isEn ? "123 Le Loi Street, Ben Nghe Ward, District 1, HCMC" : "Tầng 12, Tòa nhà Bitexco, 02 Hải Triều, Q.1, TP.HCM"}
                  value={data.companyAddress || data.address || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      companyAddress: e.target.value,
                      address: e.target.value,
                    })
                  }
                  toolparamdescription="Headquarters registered business address"
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* Save for next time checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 text-xs font-normal text-muted-foreground cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={data.saveVatInfo || false}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        saveVatInfo: e.target.checked,
                      })
                    }
                    className="size-3.5 rounded border-border text-brand-blue focus:ring-brand-blue cursor-pointer"
                  />
                  <span>{isEn ? "Save VAT information for future payments" : "Lưu thông tin VAT cho lần sau"}</span>
                </label>
              </div>
            </div>
          )}

          {/* 5. FORM FIELDS: TRƯỜNG HỢP 2 & 3 - HÓA ĐƠN CÁ NHÂN (VIỆT NAM & NƯỚC NGOÀI) */}
          {isPersonal && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Personal Full Name */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "Personal Full Name" : "Họ và tên cá nhân"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={isEn ? "Enter full name for invoice" : "Nhập họ và tên nhận hóa đơn"}
                  value={data.personalName || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      personalName: e.target.value,
                    })
                  }
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* Personal Email */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "Invoice Receiving Email" : "Email nhận hóa đơn"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="name@gmail.com"
                  value={data.personalEmail || data.invoiceEmail || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      personalEmail: e.target.value,
                      invoiceEmail: e.target.value,
                    })
                  }
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* Personal Address */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                  <span>{isEn ? "Personal Address" : "Địa chỉ cá nhân"}</span>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={isEn ? "Enter personal address" : "Nhập địa chỉ cá nhân"}
                  value={data.personalAddress || data.address || ""}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      personalAddress: e.target.value,
                      address: e.target.value,
                    })
                  }
                  className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                />
              </div>

              {/* 2-Column Grid: Quốc Tịch + (CCCD hoặc Hộ Chiếu) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4">
                {/* Nationality Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                    <span>{isEn ? "Nationality" : "Quốc tịch"}</span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={data.nationality || "VN"}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          nationality: e.target.value,
                        })
                      }
                      className="w-full h-11 px-3.5 pr-8 rounded-xl border border-border/80 bg-background text-xs sm:text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-1 focus:ring-brand-blue cursor-pointer shadow-2xs"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* ID Number */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground/90 flex items-center">
                    <span>
                      {isEn
                        ? isVietnamese
                          ? "National ID Number (CCCD)"
                          : "Passport Number"
                        : isVietnamese
                        ? "Số CCCD / Định danh"
                        : "Số Hộ chiếu / XNC"}
                    </span>
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={
                      isEn
                        ? isVietnamese
                          ? "12-digit Citizen ID"
                          : "Passport number"
                        : isVietnamese
                        ? "Nhập số CCCD 12 số"
                        : "Passport number"
                    }
                    value={data.idNumber || ""}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        idNumber: e.target.value,
                      })
                    }
                    className="h-11 text-xs sm:text-sm rounded-xl px-3.5 bg-background shadow-2xs focus-visible:ring-1"
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

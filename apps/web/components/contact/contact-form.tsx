"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Send,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Building,
  Activity,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Trophy,
  Wrench,
  RotateCcw,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";

type ContactTopic = "player" | "venue" | "sponsor" | "tech";

export function ContactForm() {
  const t = useTranslations("contact_page");

  const [topic, setTopic] = useState<ContactTopic>("player");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [venueName, setVenueName] = useState("");
  const [sport, setSport] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const topics: { id: ContactTopic; label: string; icon: React.ElementType }[] = [
    { id: "player", label: t("form.topic_player"), icon: User },
    { id: "venue", label: t("form.topic_venue"), icon: Building },
    { id: "sponsor", label: t("form.topic_sponsor"), icon: Trophy },
    { id: "tech", label: t("form.topic_tech"), icon: Wrench },
  ];

  const sports = [
    { id: "badminton", label: t("form.sport_badminton") },
    { id: "pickleball", label: t("form.sport_pickleball") },
    { id: "tennis", label: t("form.sport_tennis") },
    { id: "football", label: t("form.sport_football") },
  ];

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = "Vui lòng nhập họ và tên";
    }
    if (!phone.trim()) {
      errs.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9+() -]{8,15}$/.test(phone.trim())) {
      errs.phone = "Số điện thoại không hợp lệ";
    }
    if (!email.trim()) {
      errs.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      errs.email = "Email không hợp lệ";
    }
    if (!subject.trim()) {
      errs.subject = "Vui lòng nhập tiêu đề liên hệ";
    }
    if (!message.trim()) {
      errs.message = "Vui lòng nhập nội dung chi tiết";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setVenueName("");
    setSport("");
    setSubject("");
    setMessage("");
    setErrors({});
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-md relative overflow-hidden">
      {/* Decorative top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-primary" />

      {isSuccess ? (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="size-16 sm:size-20 rounded-full bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 flex items-center justify-center animate-bounce">
            <CheckCircle2 className="size-10 sm:size-12" />
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              {t("form.success_title")}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t("form.success_desc")}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="mt-4 rounded-xl text-xs font-bold gap-2 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            <span>{t("form.send_another")}</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {t("form.title")}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              {t("form.subtitle")}
            </p>
          </div>

          {/* Topic Selector Tabs */}
          <div className="space-y-2">
            <label className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("form.topic_label")}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {topics.map((tItem) => {
                const Icon = tItem.icon;
                const isSelected = topic === tItem.id;
                return (
                  <button
                    key={tItem.id}
                    type="button"
                    onClick={() => setTopic(tItem.id)}
                    className={`flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                      isSelected
                        ? "border-brand-blue bg-brand-blue/10 text-brand-blue dark:border-brand-green dark:bg-brand-green/15 dark:text-brand-green font-semibold shadow-xs"
                        : "border-border/70 bg-muted/30 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{tItem.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <User className="size-3.5 text-muted-foreground" />
                  <span>{t("form.name_label")} *</span>
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t("form.name_placeholder")}
                  className={`h-10 rounded-xl text-xs sm:text-sm ${errors.fullName ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-destructive font-normal">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Phone className="size-3.5 text-muted-foreground" />
                  <span>{t("form.phone_label")} *</span>
                </label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("form.phone_placeholder")}
                  className={`h-10 rounded-xl text-xs sm:text-sm ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-destructive font-normal">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Email & Venue/Sport row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Mail className="size-3.5 text-muted-foreground" />
                  <span>{t("form.email_label")} *</span>
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("form.email_placeholder")}
                  className={`h-10 rounded-xl text-xs sm:text-sm ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                />
                {errors.email && (
                  <p className="text-[11px] text-destructive font-normal">{errors.email}</p>
                )}
              </div>

              {topic === "venue" ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Building className="size-3.5 text-muted-foreground" />
                    <span>{t("form.venue_name_label")}</span>
                  </label>
                  <Input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder={t("form.venue_name_placeholder")}
                    className="h-10 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Activity className="size-3.5 text-muted-foreground" />
                    <span>{t("form.sport_label")}</span>
                  </label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-card text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-ring font-normal"
                  >
                    <option value="">{t("form.sport_all")}</option>
                    {sports.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <MessageSquare className="size-3.5 text-muted-foreground" />
                <span>{t("form.subject_label")} *</span>
              </label>
              <Input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t("form.subject_placeholder")}
                className={`h-10 rounded-xl text-xs sm:text-sm ${errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}`}
              />
              {errors.subject && (
                <p className="text-[11px] text-destructive font-normal">{errors.subject}</p>
              )}
            </div>

            {/* Detailed Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                {t("form.message_label")} *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("form.message_placeholder")}
                className={`w-full p-3 rounded-xl border bg-card text-foreground text-xs sm:text-sm font-normal resize-none focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors.message ? "border-destructive focus:ring-destructive" : "border-input"
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-destructive font-normal">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl font-semibold bg-gradient-primary text-white shadow-sm hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t("form.submitting")}</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>{t("form.submit_btn")}</span>
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
